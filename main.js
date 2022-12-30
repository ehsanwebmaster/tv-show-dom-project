// Get Elements
const url = "https://api.tvmaze.com/shows/5/episodes";
const row = document.querySelector(".cards");
const searchBar = document.getElementById("searchInput");
const counter = document.querySelector(".resoultCounter");
const dropDownHtml = document.querySelector(".dropdown-menu");
let filmBox = [];
// Event
searchBar.addEventListener("input", (e) => {
  const searchString = e.target.value.toLowerCase();
  const resoult = filmBox.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.summary.toLowerCase().includes(searchString)
    );
  });
  displayData(resoult);
  resoult.length > 0
    ? (counter.innerText = `${resoult.length} Cards Found`)
    : (counter.innerText = `No card found!`);
});
// Fetch Data
const fetchData = async () => {
  try {
    const res = await fetch(url);
    filmBox = await res.json();
    displayData(filmBox);
    dropDown(filmBox);
  } catch (err) {
    console.error(err);
  }
};
// Dropdown
const dropDown = (element) => {
  let dropDownElement = "";
  element.map((e) => {
    dropDownElement += `<li><a class="dropdown-item" href="#${e.name}">S0${e.season}E0${e.number} - ${e.name}</a></li>`;
  });
  dropDownHtml.innerHTML = dropDownElement;
};
// Display Data
const displayData = (characters) => {
  const htmlString = characters
    .map((element) => {
      return `<div class="col-12 col-sm-6 col-xl-3" id="${
        element.name
      }"><div class="card w-100 mb-4"><img class="card-img-top" src="${
        element.image.medium
      }"><div class="card-body"><h5 class="card-title">${
        element.name
      }</h5><p class="card-text">${
        element.summary.slice(3, 90) + " ..."
      }</p><a href="${element._links.self.href.replace(
        "api.",
        ""
      )}" class="btn btn-primary">ReadMore</a></div><ul class="list-group list-group-flush"><li class="list-group-item">S0${
        element.season
      }E0${element.number}</li></ul></div></div>`;
    })
    .join("");
  row.innerHTML = htmlString;
};
fetchData();
