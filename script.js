let allEpisodes = getAllEpisodes();

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
searchBar.setAttribute("placeholder", "Search for series");
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

    //////create episode and season number//////
    let episodeNumber = document.createElement("p");
    if (shows[i].season >= 10) {
      if (shows[i].number >= 10) {
        episodeNumber.innerHTML = `S${shows[i].season}E${shows[i].number}`;
      }
    } else {
      episodeNumber.innerHTML = `S0${shows[i].season}E0${shows[i].number}`;
      container.appendChild(episodeNumber);
    }
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

displayEpisodes(allEpisodes);

////search bar event/////

function filterSearch(event) {
  let searchWord = event.target.value.toUpperCase();
  let filteredShows = allEpisodes.filter((item) => {
    return (
      item.name.toUpperCase().includes(searchWord) ||
      item.summary.toUpperCase().includes(searchWord)
    );
  });
  displayEpisodes(filteredShows);
}
searchBar.addEventListener("input", filterSearch);

/////link to TvMaze//////
let linkToTv = document.createElement("a");
linkToTv.href = "https://www.tvmaze.com/";
let textToTv = document.createTextNode("Source");
linkToTv.appendChild(textToTv);
body.appendChild(linkToTv);
linkToTv.style.color = "white";
