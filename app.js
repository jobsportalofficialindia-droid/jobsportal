// SEARCH BAR
const searchBar = document.querySelector("#search-bar");
const searchResults = document.querySelector(".search-results");
const cards = document.querySelectorAll(".card-container");
const cardsP = document.querySelectorAll(".card-container p");
const newsPage = document.querySelector(".news-page");

const jobs = Array.from(cards).map((job) => {
  return job.innerHTML;
});

if (!searchBar.value) {
  searchResults.style.display = "none";
}

searchBar.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  searchResults.innerHTML = "";
  if (query) {
    const filteredJobs = jobs.filter((job) => {
      return job.toLowerCase().includes(query);
    });

    if (filteredJobs.length > 0) {
      filteredJobs.forEach((job) => {
        if (newsPage) {
          searchResults.innerHTML += `<div class="card-container news-card search-card">${job}</div>`;
        } else {
          searchResults.innerHTML += `<div class="card-container search-card">${job}</div>`;
        }
        console.log(job);
      });
      if (newsPage) {
        searchResults.style.display = "flex";
      } else {
        searchResults.style.display = "block";
      }
    } else {
      searchResults.style.display = "none";
    }
  } else {
    searchResults.style.display = "none";
  }
});

document.addEventListener("click", function (e) {
  if (!searchBar.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.style.display = "none";
  }
});

// Prevent mobile scroll "jumps" and keyboard focus issues
document.addEventListener('DOMContentLoaded', () => {
  // Disable automatic scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Save scroll position on focus of inputs to prevent jumps
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      const scrollY = window.scrollY;
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 50); // adjust delay if needed
    });
  });

  // Optional: prevent zooming on input focus (Safari)
  document.addEventListener('touchstart', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      e.preventDefault();
    }
  }, { passive: false });
});



