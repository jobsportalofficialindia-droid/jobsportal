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
