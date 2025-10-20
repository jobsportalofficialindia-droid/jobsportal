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

window.addEventListener("resize", () => {
  // navigation.style.display = "grid";
  location.reload();
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
