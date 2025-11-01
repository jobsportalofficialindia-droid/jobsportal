// DARKMODE

let darkmode = localStorage.getItem("darkmode");
const themeSwitcher = document.querySelector(".theme-switcher");
const light = document.querySelector(".light");
const dark = document.querySelector(".dark");
if (darkmode === "active") enableDarkMode();
if (darkmode !== "active") disableDarkMode();

themeSwitcher.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkMode() : disableDarkMode();
});

function enableDarkMode() {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
  dark.style.display = "block";
  light.style.display = "none";
}

function disableDarkMode() {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", "");
  dark.style.display = "none";
  light.style.display = "block";
}

// HAMBURGER
const navigation = document.querySelector(".navigation");
const menu = document.querySelector(".menu");
const xMark = document.querySelector(".x-mark");
const jobsMain = document.querySelector(".jobs-main");
const jobsDropdown = document.querySelector(".jobs-dropdown");
let clicked = true;

menu.addEventListener("click", function () {
  this.style.display = "none";
  navigation.style.display = "grid";
  xMark.style.display = "block";
});
xMark.addEventListener("click", function () {
  this.style.display = "none";
  navigation.style.display = "none";
  menu.style.display = "block";
});

jobsMain.addEventListener("click", openDropDown);

function openDropDown(e) {
  const attrib = this.getAttribute("class");
  console.log(attrib);
  if (attrib == "jobs-main link") {
    if (clicked && !jobsDropdown.contains(e.target)) {
      jobsDropdown.style.display = "block";
      clicked = false;
    } else {
      jobsDropdown.style.display = "none";
      clicked = true;
    }
  }
  console.log("Clicked 1 " + clicked);
}

document.addEventListener("click", function (e) {
  if (!navigation.contains(e.target) && !menu.contains(e.target)) {
    if (window.innerWidth <= 800) {
      navigation.style.display = "none";
      xMark.style.display = "none";
      menu.style.display = "block";
    } else {
      jobsDropdown.style.display = "none";
      clicked = true;
    }
  }
});

// Year
const year = document.querySelector(".year");
year.innerHTML = new Date().getFullYear();

// Footer Social Links
const socialLinks = document.querySelector(".social-links");
socialLinks.innerHTML = `<!-- WHATSAPP -->
        <a
          href="https://whatsapp.com/channel/0029Vb6QtqtLdQecugHCpX32"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <svg width="20" height="20">
            <use xlink:href="/icons.svg#icon-whatsapp"></use>
          </svg>
        </a>
        <!-- TWITTER -->
        <a
          href="https://x.com/jobsportal2025?t=Jq3Prg6CKJ2zkTUH_pSyIV9JCPsQIiNyT-fvOiQb-BI&s=08"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <svg width="20" height="20">
            <use xlink:href="/icons.svg#icon-twitter"></use>
          </svg>
        </a>
        <!-- REDDIT -->
        <a
          href="https://www.reddit.com/u/jobsportal_2025/s/7OFsBCNQUT"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Reddit"
        >
          <svg width="20" height="20">
            <use xlink:href="/icons.svg#icon-reddit"></use>
          </svg>
        </a>
        <!-- LINKED IN -->
        <a
          href="https://www.linkedin.com/groups/15889001"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg width="20" height="20">
            <use xlink:href="/icons.svg#icon-linkedin"></use>
          </svg>
        </a>
        <!-- FACEBOOK -->
        <a
          href="https://www.facebook.com/share/1Agaompyfi/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <svg width="20" height="20">
            <use xlink:href="/icons.svg#icon-facebook"></use>
          </svg>
        </a>
        <!-- INSTAGRAM -->
        <a
          href="https://www.instagram.com/jobsportal.site?igsh=NGE5cGk4dHhkejg1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <svg width="20" height="20">
            <use xlink:href="/icons.svg#icon-instagram"></use>
          </svg>
        </a>
        <!-- THREADS -->
        <a
          href="https://www.threads.com/@jobsportal.site"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Threads"
        >
          <svg width="20" height="20">
            <use xlink:href="/icons.svg#icon-threads"></use>
          </svg>
        </a>
        <!-- YOUTUBE -->
        <a
          href="https://youtube.com/@jobsportalsite?si=9N56aM4R7Yc3Ct5p"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <svg width="20" height="20">
            <use xlink:href="/icons.svg#icon-youtube"></use>
          </svg>
        </a>
        <!-- TELEGRAM -->
        <a
          href="https://t.me/jobsportalofficial"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
        >
          <svg width="20" height="20">
            <use xlink:href="/icons.svg#icon-telegram"></use>
          </svg>
        </a>
        <!-- PINTEREST -->
        <a
          href="https://pin.it/7kaUsuFHX"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pinterest"
        >
          <svg width="20" height="20">
            <use xlink:href="/icons.svg#icon-pinterest"></use>
          </svg>
        </a>
        <!-- MAIL -->
        <a
          href="mailto:jobsportalofficial.india@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
        >
          <svg width="20" height="20">
            <use xlink:href="/icons.svg#icon-email"></use>
          </svg>
        </a>`;

// Ads
const ads = document.querySelectorAll(".ads");
const stickyAd = document.querySelector(".sticky-ad-container");
const stickyAdClose = document.querySelector(".sticky-ad-close");
if (ads) {
  for (let i = 0; i < ads.length; i++) {
    ads[i].innerHTML = "";
  }

  if (stickyAd) {
    // Sticky Ads
    stickyAdClose.addEventListener("click", function () {
      stickyAd.style.visibility = "hidden";
    });
  }
}

