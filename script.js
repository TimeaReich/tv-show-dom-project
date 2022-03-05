let allEpisodesArray = [];

function getAllEpisodesApi(showId) {
  let showUrl = `https://api.tvmaze.com/shows/${showId}/episodes`;
  return fetch(showUrl)
    .then((response) => response.json())
    .then((data) => {
      allEpisodesArray = data;
      displayEpisodes(allEpisodesArray);
      selectEpisode(allEpisodesArray);
    })
    .catch((e) => console.log(e));
}
function getAllShowsApi() {
  fetch("https://api.tvmaze.com/shows")
    .then((res) => res.json())
    .then((data) => {
      allSeries = data;
      selectSeries(data);
    })
    .catch((e) => console.log(e));
}
function setup() {
  getAllShowsApi();
  getAllEpisodesApi(82);
  searchBar.addEventListener("input", filterEpisodes);
}

let body = document.querySelector("body");
body.className = "body";
let searchDiv = document.createElement("div");
body.appendChild(searchDiv);
let feature = document.createElement("div");
body.append(feature);
feature.className = "feature";

/////////create search bar///////////
let searchBar = document.createElement("input");
searchBar.setAttribute("type", "text");
searchBar.setAttribute("name", "search");
searchBar.setAttribute("placeholder", "Search for series...");
searchDiv.appendChild(searchBar);
searchBar.className = "form-field";

//////////////episode structure///////////

function displayEpisodes(shows) {
  for (let i = 0; i < shows.length; i++) {
    let container = document.createElement("div");
    feature.appendChild(container);
    container.className = "container";
    /////create title//////
    let episodeTitle = document.createElement("p");
    container.appendChild(episodeTitle);
    episodeTitle.innerHTML = `${shows[i].name}`;
    episodeTitle.className = "title";
    episodeTitle.id = `${shows[i].name}`;
    //////create episode and season number//////
    let episodeNumber = document.createElement("p");
    if (shows[i].season >= 10 && shows[i].number >= 10) {
      episodeNumber.innerHTML = `S${shows[i].season}E${shows[i].number}`;
    } else if (shows[i].season >= 10 && shows[i].number < 10) {
      episodeNumber.innerHTML = `S${shows[i].season}E0${shows[i].number}`;
    } else if (shows[i].season < 10 && shows[i].number >= 10) {
      episodeNumber.innerHTML = `S0${shows[i].season}E${shows[i].number}`;
    } else if (shows[i].season < 10 && shows[i].number < 10) {
      episodeNumber.innerHTML = `S0${shows[i].season}E0${shows[i].number}`;
    }
    container.appendChild(episodeNumber);
    /////create episode image/////////
    let episodeImage = document.createElement("img");
    if (shows[i].image !== null) {
      episodeImage.src = `${shows[i].image.medium}`;
    }
    episodeImage.className = "image";
    container.appendChild(episodeImage);
    /////create summary///////
    let showSummary = document.createElement("p");
    showSummary.innerHTML = `${shows[i].summary}`;
    container.appendChild(showSummary);
  }
}
let displayMatchingText = document.createElement("p");
////search bar event/////
function filterEpisodes(e) {
  feature.innerHTML = "";
  let searchWord = e.target.value.toUpperCase();
  let filteredEpisodes = allEpisodesArray.filter((item) => {
    return (
      item.name.toUpperCase().includes(searchWord) ||
      item.summary.toUpperCase().includes(searchWord)
    );
  });
  displayEpisodes(filteredEpisodes);
  let matchingNumber = filteredEpisodes.length;
  let allEpisodesNumber = allEpisodesArray.length;
  displayMatchingText.innerText = `Displaying ${matchingNumber}/${allEpisodesNumber} episodes`;
  searchDiv.appendChild(displayMatchingText);
  displayMatchingText.className = "matching-episodes-p";
}
///////select option for episodes//////////
function selectEpisode() {
  let selectElement = document.createElement("select");
  selectElement.innerHTML = "";
  selectElement.setAttribute("id", "selectEpisodes");
  searchDiv.appendChild(selectElement);
  selectElement.className = "form-field";
  for (let j = 0; j < allEpisodesArray.length; j++) {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("value", `${allEpisodesArray[j].name}`);
    let optionText = document.createTextNode(`${allEpisodesArray[j].name}`);
    optionElement.appendChild(optionText);
    selectElement.appendChild(optionElement);
  }
  selectElement.addEventListener("change", function (event) {
    selectedEpId = document.getElementById(`${event.target.value}`);
    window.location.href = `#${event.target.value}`;
  });
}
//////////////select option for series//////////////////
function selectSeries(series) {
  let selectSeriesEl = document.createElement("select");
  selectSeriesEl.setAttribute("id", "selectSeries");
  searchDiv.appendChild(selectSeriesEl);
  selectSeriesEl.className = "form-field";
  for (let j = 0; j < series.length; j++) {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("value", `${series[j].name}`);
    let optionText = document.createTextNode(`${series[j].name}`);
    optionElement.appendChild(optionText);
    selectSeriesEl.appendChild(optionElement);
  }
  selectSeriesEl.addEventListener("click", function (event) {
    feature.innerHTML = "";
    let selectedShowName = event.target.value;
    let selectedShowId;
    for (let z = 0; z < series.length; z++) {
      if (selectedShowName === series[z].name) {
        selectedShowId = series[z].id;
        console.log(selectedShowId);
      }
    }
    getAllEpisodesApi(selectedShowId);
  });
  //console.log(series[0].id);
}
/////link to TvMaze//////
let linkToTv = document.createElement("a");
linkToTv.href = "https://www.tvmaze.com/";
let textToTv = document.createTextNode("Source");
linkToTv.appendChild(textToTv);
body.appendChild(linkToTv);
linkToTv.style.color = "white";

window.onload = setup;
