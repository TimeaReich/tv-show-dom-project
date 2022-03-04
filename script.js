let allEpisodesArray = [];

function getAllEpisodesApi() {
  return fetch("https://api.tvmaze.com/shows/82/episodes")
    .then((response) => response.json())
    .then((data) => {
      allEpisodesArray = data;
      displayEpisodes(allEpisodesArray);
      selectEpisode(allEpisodesArray);
    })
    .catch((e) => console.log(e));
}

function setup() {
  getAllEpisodesApi();
  searchBar.addEventListener("input", filterEpisodes);
}

let body = document.querySelector("body");
body.className = "body";
let searchDiv = document.createElement("div");
body.appendChild(searchDiv);
let feature = document.createElement("div");
body.append(feature);
feature.className = "feature";

/////////search bar///////////

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
////search bar event/////

let displayMatchingText = document.createElement("p");
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
}
///////select option//////////
function selectEpisode() {
  let selectElement = document.createElement("select");
  selectElement.setAttribute("id", "mySelect");
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

/////link to TvMaze//////
let linkToTv = document.createElement("a");
linkToTv.href = "https://www.tvmaze.com/";
let textToTv = document.createTextNode("Source");
linkToTv.appendChild(textToTv);
body.appendChild(linkToTv);
linkToTv.style.color = "white";

window.onload = setup;
