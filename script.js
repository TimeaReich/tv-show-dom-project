let allEpisodesArray = [];

function getAllEpisodesApi(showId) {
  // const proxy = "https://cors-anywhere.herokuapp.com/";
  // let showUrl = `${proxy}https://api.tvmaze.com/shows/${showId}/episodes`;
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
// function getAllShowsApi() {
//   fetch("https://api.tvmaze.com/shows")
//     .then((res) => res.json())
//     .then((data) => {
//       allSeries = data;
//     })
//     .catch((e) => console.log(e));
// }
function setup() {
  const allShows = getAllShows();
  selectSeries(allShows);
  //getAllShowsApi();
  showListing(allShows);
  getAllEpisodesApi(82);
  searchBar.addEventListener("input", filterEpisodes);
}
function showListing(shows) {
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
    ///genre///
    let showGenre = document.createElement("p");
    if (shows[i].genres.length > 1) {
      let showGenreStr = shows[i].genres.toString();
      showGenre.innerHTML = `${showGenreStr}`;
    } else {
      showGenre.innerHTML = `Genre: ${shows[i].genres[0]}`;
    }
    container.appendChild(showGenre);
    ///rating
    let showRating = document.createElement("p");
    console.log(shows[0].rating.average);
    showRating.innerHTML = `Show Rating: ${shows[i].rating.average}`;
    container.appendChild(showRating);
    ///runtime
    let showRuntime = document.createElement("p");
    showRuntime.innerHTML = `Runtime: ${shows[i].runtime}`;
    container.appendChild(showRuntime);
  }
}
let body = document.querySelector("body");
body.className = "body";
let searchDiv = document.createElement("div");
body.appendChild(searchDiv);
searchDiv.className = "search-div-box";
let feature = document.createElement("div");
body.append(feature);
feature.className = "feature";
let searchBarDiv = document.createElement("div");
searchDiv.appendChild(searchBarDiv);
let selectEpisodeDiv = document.createElement("div");
searchDiv.appendChild(selectEpisodeDiv);
let selectSeriesDiv = document.createElement("div");
searchDiv.appendChild(selectSeriesDiv);

/////////create search bar///////////
let searchBar = document.createElement("input");
searchBar.setAttribute("type", "text");
searchBar.setAttribute("name", "search");
searchBar.setAttribute("placeholder", "Search for episodes...");
searchBarDiv.appendChild(searchBar);
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
  console.log(searchWord);
  console.log(allEpisodesArray);

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
}
///////select option for episodes//////////
function selectEpisode() {
  selectEpisodeDiv.innerHTML = "";
  let selectEpisodeEl = document.createElement("select");

  //selectElement.setAttribute("id", "selectEpisodes");
  selectEpisodeDiv.appendChild(selectEpisodeEl);
  selectEpisodeEl.className = "form-field";
  for (let j = 0; j < allEpisodesArray.length; j++) {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("value", `${allEpisodesArray[j].name}`);
    let optionText = document.createTextNode(`${allEpisodesArray[j].name}`);
    optionElement.appendChild(optionText);
    selectEpisodeEl.appendChild(optionElement);
  }
  selectEpisodeEl.addEventListener("change", function (event) {
    selectedEpId = document.getElementById(`${event.target.value}`);
    window.location.href = `#${event.target.value}`;
  });
}
//////////////select option for series//////////////////
function selectSeries(series) {
  let selectSeriesEl = document.createElement("select");
  selectSeriesEl.setAttribute("id", "selectSeries");
  selectSeriesDiv.appendChild(selectSeriesEl);
  selectSeriesEl.className = "form-field";
  series.sort((a, b) => {
    let aTitle = a.name;
    let bTitle = b.name;
    if (aTitle.toUpperCase() < bTitle.toUpperCase()) {
      return -1;
    } else if (aTitle.toUpperCase() > bTitle.toUpperCase()) {
      return 1;
    } else {
      return 0;
    }
  });
  for (let j = 0; j < series.length; j++) {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("value", `${series[j].name}`);
    let optionText = document.createTextNode(`${series[j].name}`);
    optionElement.appendChild(optionText);
    selectSeriesEl.appendChild(optionElement);
  }
  selectSeriesEl.addEventListener("click", function (event) {
    feature.innerHTML = "";

    // selectEpisode;
    let selectedShowName = event.target.value;
    let selectedShowId;
    for (let z = 0; z < series.length; z++) {
      if (selectedShowName === series[z].name) {
        selectedShowId = series[z].id;
      }
    }
    getAllEpisodesApi(selectedShowId);
  });
}

/////link to TvMaze//////
let linkToTv = document.createElement("a");
linkToTv.href = "https://www.tvmaze.com/";
let textToTv = document.createTextNode("Source");
linkToTv.appendChild(textToTv);
body.appendChild(linkToTv);
linkToTv.style.color = "white";

window.onload = setup;
