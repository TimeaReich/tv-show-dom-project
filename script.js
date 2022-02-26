function setup() {
  let allEpisodes = getAllEpisodes();
  displayEpisodes(allEpisodes);
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
    console.log(episodeTitle);
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
  let allEpisodes = getAllEpisodes();
  feature.innerHTML = "";
  let searchWord = e.target.value.toUpperCase();
  let filteredEpisodes = allEpisodes.filter((item) => {
    return (
      item.name.toUpperCase().includes(searchWord) ||
      item.summary.toUpperCase().includes(searchWord)
    );
  });
  displayEpisodes(filteredEpisodes);
  let matchingNumber = filteredEpisodes.length;
  let allEpisodesNumber = allEpisodes.length;
  displayMatchingText.innerText = `Displaying ${matchingNumber}/${allEpisodesNumber} episodes`;
  searchDiv.appendChild(displayMatchingText);
}
///////select option//////////
function selectEpisode(episodes) {
  episodes = getAllEpisodes();
  let selectElement = document.createElement("select");
  selectElement.setAttribute("id", "mySelect");
  searchDiv.appendChild(selectElement);
  for (let j = 0; j < episodes.length; j++) {
    let optionElement = document.createElement("option");
    optionElement.setAttribute("value", `${episodes[j].name}`);
    let optionText = document.createTextNode(`${episodes[j].name}`);
    optionElement.appendChild(optionText);
    selectElement.appendChild(optionElement);
  }
}
selectEpisode();
/////link to TvMaze//////
let linkToTv = document.createElement("a");
linkToTv.href = "https://www.tvmaze.com/";
let textToTv = document.createTextNode("Source");
linkToTv.appendChild(textToTv);
body.appendChild(linkToTv);
linkToTv.style.color = "white";

window.onload = setup;
