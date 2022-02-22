//You can edit ALL of the code here
// function setup() {
//   const allShows = getAllShows();
//   makePageForShows(allShows);
// }

// const { link } = require("fs");

// function makePageForShows(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

// window.onload = setup;

let allShows = getAllShows();

let body = document.querySelector("body");
body.style.backgroundColor = "black";
body.style.color = "white";

let feature = document.createElement("div");
body.append(feature);
feature.className = "feature";

//////////////episode structure///////////

function displayEpisodes(shows) {
  for (let i = 0; i < shows.length; i++) {
    let container = document.createElement("div");
    feature.appendChild(container);
    container.className = "container";

    /////create title//////
    let episodeTitle = document.createElement("p");
    container.appendChild(episodeTitle);
    episodeTitle.innerHTML = `${allShows[i].name}`;
    episodeTitle.className = "title";

    //////create episode and season number//////
    let episodeNumber = document.createElement("p");
    if (getOneEpisode().season >= 10) {
      if (getOneEpisode().number >= 10) {
        episodeNumber.innerHTML = `S${getOneEpisode().season}E${
          getOneEpisode().number
        }`;
      }
    } else {
      episodeNumber.innerHTML = `S0${getOneEpisode().season}E0${
        getOneEpisode().number
      }`;
      container.appendChild(episodeNumber);
    }
    /////create episode image/////////
    let episodeImage = document.createElement("img");
    if (allShows[i].image !== null) {
      episodeImage.src = `${allShows[i].image.medium}`;
    }
    episodeImage.className = "image";
    container.appendChild(episodeImage);
    /////create summary///////
    let Showsummary = document.createElement("p");
    Showsummary.innerHTML = `${allShows[i].summary}`;
    container.appendChild(Showsummary);
  }
}

displayEpisodes(allShows);

let linkToTv = document.createElement("a");
linkToTv.href = "https://www.tvmaze.com/";
let textToTv = document.createTextNode("Source");
linkToTv.appendChild(textToTv);
body.appendChild(linkToTv);
linkToTv.style.color = "white";
