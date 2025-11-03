// SEARCH BAR
const searchBar = document.querySelector("#search-bar");
const searchResults = document.querySelector(".search-results");
const newsPage = document.querySelector(".news-page");
const lang = document.documentElement.lang;
console.log(lang);
let dates = "";

// Suppose you have many files like jobs1.json, jobs2.json, ..., jobs100.json
const totalFiles = 100;
let arrayFiles = [];
if (newsPage) {
  if (lang == "en") {
    arrayFiles = ["/json/news.json", "/json/news2.json"];
  }
  if (lang == "te") {
    arrayFiles = ["/json/news.json", "/json/news-te.json"];
  }
  if (lang == "hi") {
    arrayFiles = ["/json/news.json", "/json/news-hi.json"];
  }
  if (lang == "bn") {
    arrayFiles = ["/json/news.json", "/json/news-bn.json"];
  }
} else {
  arrayFiles = ["/json/jobs.json", "/json/jobs2.json"];
}

if (searchBar) {
  searchResults.style.display = "none";

  searchBar.addEventListener("input", async () => {
    const query = searchBar.value.trim().toLowerCase();

    if (!query) {
      searchResults.style.display = "none";
      searchResults.innerHTML = "";
      return;
    }

    searchResults.innerHTML = "Searching...";
    searchResults.style.display = "flex";

    let allResults = [];
    const MAX_RESULTS = 30;

    // Fetch one file at a time until enough results are found
    for (const file of arrayFiles) {
      try {
        const res = await fetch(file);
        const data = await res.json();

        const filtered = data.filter((item) =>
          item.title.toLowerCase().includes(query)
        );

        allResults.push(...filtered);

        // Stop once we have enough results
        if (allResults.length >= MAX_RESULTS) break;
      } catch (err) {
        console.warn(`Error loading ${file}:`, err);
      }
    }

    // Clear and show results
    searchResults.innerHTML = "";

    if (allResults.length > 0) {
      allResults.slice(0, MAX_RESULTS).forEach((item) => {
        const a = document.createElement("a");
        a.href = item.url;
        a.textContent = item.title;
        a.target = "_blank";
        if (item.start && item.end) {
          dates = `<div class="start">
                      <span class="green">Start:</span> ${item.start}
                    </div>
                    <div class="last">
                      <span class="red">End:</span> ${item.end}
                    </div>`;
        } else {
          dates = "";
        }
        if (newsPage) {
          searchResults.innerHTML += `<div class="card-container">
              <a href="${item.url}" class="card-link">
                <div class="card news-card search-card">
                  <div class="header">
                    <img src="${item.image}" loading="lazy" />
                    <p class="headline" style="${item.styles}">${item.title}</p>
                  </div>
                  <p class="content" style="${item.styles}">
                    ${item.content}
                  </p>
                </div>
              </a>
            </div>`;
        } else {
          searchResults.innerHTML += `<div class="card-container">
              <a href="${item.url}" class="card-link">
                <div class="card">
                  <div class="card-title">
                    <p>
                      ${item.title}
                    </p>
                  </div>
                  <div class="dates">
                    ${dates}
                  </div>
                </div>
              </a>
            </div>`;
        }
      });
    } else {
      const p = document.createElement("p");
      p.textContent = "No results found.";
      searchResults.appendChild(p);
    }
  });
}

// Hide when clicking outside
if (searchBar) {
  document.addEventListener("click", (e) => {
    if (!searchBar.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = "none";
    }
  });
}
