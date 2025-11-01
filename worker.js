/**
 * Cloudflare Worker SEO Router for Pages + R2 Scaling
 * Serves R2 assets first, then falls back to Pages with specific caching rules
 */

// --- Configuration ---
const PAGES_DOMAIN = "jobsportal.pages.dev"; // Your Cloudflare Pages origin
const BUCKET_NAME = "bulk-static-content"; // R2 binding name from settings

const ONE_WEEK = 7 * 24 * 60 * 60; // 604800 seconds

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname.slice(1); // remove leading "/"

    // 1. Try to serve from R2 exactly
    const r2Response = await tryR2(path, env);
    if (r2Response) return r2Response;

    // 2. Try directory index (e.g. /blog/ => blog/index.html)
    if (path === "" || path.endsWith("/")) {
      const indexPath = path === "" ? "index.html" : `${path}index.html`;
      const indexR2 = await tryR2(indexPath, env);
      if (indexR2) return indexR2;
    }

    // 3. Try clean HTML (e.g. /about => about.html)
    if (!path.includes(".")) {
      const htmlR2 = await tryR2(`${path}.html`, env);
      if (htmlR2) return htmlR2;
    }

    // 4. Fallback to Cloudflare Pages with proper caching
    const pagesResponse = await fetch(
      `https://${PAGES_DOMAIN}${url.pathname}`,
      request
    );

    // Determine file type
    let cacheControl = "public, max-age=0, must-revalidate"; // default: no cache (HTML, OG images)
    if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|webp|svg)$/i)) {
      cacheControl = `public, max-age=${ONE_WEEK}`; // 1 week for static assets
    }
    if (url.pathname.match(/og-image/i)) {
      cacheControl = "public, max-age=0, must-revalidate"; // no cache for OG images
    }

    return new Response(pagesResponse.body, {
      status: pagesResponse.status,
      headers: {
        ...Object.fromEntries(pagesResponse.headers),
        "Cache-Control": cacheControl,
      },
    });
  },
};

async function tryR2(path, env) {
  try {
    const obj = await env[BUCKET_NAME].get(path);
    if (!obj) return null;

    // Determine content type
    const contentType =
      obj.httpMetadata?.contentType || "application/octet-stream";

    // Decide cache for R2 assets
    let cacheControl = "public, max-age=0, must-revalidate"; // default: no cache (HTML, OG images)
    if (path.match(/\.(css|js|png|jpg|jpeg|gif|webp|svg)$/i)) {
      cacheControl = `public, max-age=${ONE_WEEK}`; // 1 week cache for static assets
    }
    if (path.match(/og-image/i)) {
      cacheControl = "public, max-age=0, must-revalidate"; // no cache for OG images
    }
    if (path.endsWith(".html")) {
      cacheControl = "public, max-age=0, must-revalidate"; // HTML pages: always fresh
    }

    return new Response(obj.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl,
      },
    });
  } catch (err) {
    console.error("R2 Fetch Error:", err);
    return null;
  }
}
