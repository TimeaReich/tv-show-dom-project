let body = document.querySelector("body");
body.className = "body";
let searchDiv = document.createElement("div");
body.appendChild(searchDiv);
searchDiv.className = "search-div-box";
let feature = document.createElement("div");
body.append(feature);
feature.className = "feature";
let searchBarForEpisodesDiv = document.createElement("div");
searchDiv.appendChild(searchBarForEpisodesDiv);
let selectEpisodeDiv = document.createElement("div");
selectEpisodeDiv.className = "selectEpisodeDiv";
searchDiv.appendChild(selectEpisodeDiv);
let navBackButtonDiv = document.createElement("div");
navBackButtonDiv.className = "back-button-div";
let selectSeriesDiv = document.createElement("div");
selectSeriesDiv.className = "selectSeriesDiv";
searchDiv.appendChild(selectSeriesDiv);
let matchingTextDiv = document.createElement("div");
searchDiv.appendChild(matchingTextDiv);

/////////create search bar for episodes ///////////
let searchBarForEpisodes = document.createElement("input");
searchBarForEpisodes.setAttribute("type", "text");
searchBarForEpisodes.setAttribute("name", "search");
searchBarForEpisodes.setAttribute("placeholder", "Search episodes...");
searchBarForEpisodesDiv.appendChild(searchBarForEpisodes);
searchBarForEpisodes.className = "form-field";
//////create searchbar for shows////////
let searchBarForShows = document.createElement("input");
searchBarForShows.setAttribute("type", "text");
searchBarForShows.setAttribute("name", "search");
searchBarForShows.setAttribute("placeholder", "Search for show...");
searchBarForEpisodesDiv.appendChild(searchBarForShows);
searchBarForShows.className = "form-field";

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
  // getAllEpisodesApi();
  searchBarForEpisodes.addEventListener("input", filterEpisodes);
  searchBarForShows.addEventListener("input", filterShows);
}
function showListing(shows) {
  selectEpisodeDiv.style.display = "none";
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
    filterShows;
    showSummary.innerHTML = `${shows[i].summary}`;
    container.appendChild(showSummary);
    ///genre///
    let showGenre = document.createElement("p");
    if (shows[i].genres.length > 1) {
      let showGenreStr = shows[i].genres.toString();
      showGenre.innerHTML = `Genre: ${showGenreStr}`;
    } else {
      showGenre.innerHTML = `Genre: ${shows[i].genres[0]}`;
    }
    container.appendChild(showGenre);
    ////status
    let showStatus = document.createElement("div");
    showStatus.innerHTML = `Status: ${shows[i].status}`;
    container.appendChild(showStatus);
    ///rating
    let showRating = document.createElement("p");
    showRating.innerHTML = `Show Rating: ${shows[i].rating.average}`;
    container.appendChild(showRating);
    ///runtime
    let showRuntime = document.createElement("p");
    showRuntime.innerHTML = `Runtime: ${shows[i].runtime}`;
    container.appendChild(showRuntime);

    container.addEventListener("click", function () {
      feature.innerHTML = "";
      selectSeriesDiv.innerHTML = "";
      let selectedShowId = shows[i].id;
      let navigateBackButton = document.createElement("button");
      navigateBackButton.innerHTML = "Back to showlist";
      navigateBackButton.className = "back-button";
      navBackButtonDiv.appendChild(navigateBackButton);
      searchDiv.appendChild(navBackButtonDiv);
      navigateBackButton.addEventListener("click", function () {
        feature.innerHTML = "";
        setup();
        navBackButtonDiv.innerHTML = "";
        matchingTextDiv.style.display = "none";
      });
      getAllEpisodesApi(selectedShowId);
    });
  }
}

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
displayMatchingText.className = "matching-text-p";

/////search bar for shows event/////
function filterShows(e) {
  feature.innerHTML = "";
  if (e.target.value !== "") {
    let allShows = getAllShows();
    let searchWord = e.target.value.toUpperCase();
    console.log(typeof e.target.value);
    let filteredEpisodes = allShows.filter((item) => {
      return (
        item.name.toUpperCase().includes(searchWord) ||
        item.summary.toUpperCase().includes(searchWord)
      );
    });
    displayEpisodes(filteredEpisodes);
  } else {
    setup();
  }
}

////search bar for episodes event/////
function filterEpisodes(e) {
  feature.innerHTML = "";
  console.log(allEpisodesArray);
  let searchWord = e.target.value.toUpperCase();
  let filteredEpisodes = allEpisodesArray.filter((item) => {
    if (item.summary !== null) {
      return (
        item.name.toUpperCase().includes(searchWord) ||
        item.summary.toUpperCase().includes(searchWord)
      );
    } else if (item.summary === null) {
      return item.name.toUpperCase().includes(searchWord);
    }
  });
  displayEpisodes(filteredEpisodes);
  matchingTextDiv.style.display = "block";
  let matchingNumber = filteredEpisodes.length;
  let allEpisodesNumber = allEpisodesArray.length;
  displayMatchingText.innerText = `Displaying ${matchingNumber}/${allEpisodesNumber} episodes`;
  matchingTextDiv.appendChild(displayMatchingText);
}
///////select option for episodes//////////
function selectEpisode() {
  selectEpisodeDiv.innerHTML = "";
  let selectEpisodeEl = document.createElement("select");
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
    window.location.href = `#${event.target.value}`;
  });
}
//////////////select option for series//////////////////
function selectSeries(series) {
  selectSeriesDiv.innerHTML = "";
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
    selectSeriesDiv.innerHTML = "";
    selectEpisodeDiv.style.display = "block";
    let navigateBackButton = document.createElement("button");
    navigateBackButton.innerHTML = "Back to showlist";
    navigateBackButton.className = "back-button";
    navBackButtonDiv.appendChild(navigateBackButton);
    searchDiv.appendChild(navBackButtonDiv);
    navigateBackButton.addEventListener("click", function () {
      feature.innerHTML = "";
      setup();
      navBackButtonDiv.innerHTML = "";
    });

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
//solution https://cyf-tv-level-500-dom-solution.netlify.app/
