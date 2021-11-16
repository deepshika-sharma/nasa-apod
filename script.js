const container = document.querySelector(".container");
const loader = document.querySelector(".loader");
const cardsContainer = document.querySelector(".cards-container");
const images = document.querySelectorAll(".card img");
const imageLinks = document.querySelectorAll(".image-link");
const titles = document.querySelectorAll(".title");
const descriptions = document.querySelectorAll(".description");
const dates = document.querySelectorAll(".date");
const copyrights = document.querySelectorAll(".copyright");
const addToFavorites = document.querySelectorAll(".add-favorites");
const loadMore = document.getElementById("load-more");
const addedFavorite = document.querySelector(".added");

// Global Variables
let favorites = JSON.parse(localStorage.getItem("favorites"));
if (!favorites) {
  favorites = [];
}

let resultsArray = [];

// Create DOM Elements
const updateDOM = () => {
  // Populating each card with information from API
  for (let i = 0; i < resultsArray.length; i++) {
    if (resultsArray[i].media_type === "image") {
      let cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
      // --> image div
      let imgDiv = document.createElement("div");
      imgDiv.classList.add("image");
      // for images
      let imgLink = document.createElement("a");
      imgLink.classList.add("image-link");
      imgLink.setAttribute("target", "_blank");
      imgLink.setAttribute("href", resultsArray[i].hdurl);
      let image = document.createElement("img");
      image.setAttribute("title", "View Full Image");
      image.setAttribute("alt", "NASA APOD");
      image.setAttribute("src", resultsArray[i].url);
      image.loading = "lazy";
      imgDiv.append(imgLink, image);
      cardDiv.appendChild(imgDiv);

      // --> info div
      let infoDiv = document.createElement("div");
      infoDiv.classList.add("info");
      let h3 = document.createElement("h3");
      h3.classList.add("title");
      h3.textContent = resultsArray[i].title;
      let addFavorite = document.createElement("a");
      addFavorite.classList.add("add-favorite");
      addFavorite.textContent = "Add to Favorites";
      addFavorite.addEventListener("click", (e) => {
        e.preventDefault();
        favoritesStorage(e.target);
      });
      let description = document.createElement("p");
      description.classList.add("description");
      description.textContent = resultsArray[i].explanation;
      infoDiv.append(h3, addFavorite, description);
      cardDiv.appendChild(infoDiv);

      // --> copyright div
      let copyrightDiv = document.createElement("div");
      copyrightDiv.classList.add("copyright-details");
      let date = document.createElement("span");
      date.classList.add("date");
      date.textContent = resultsArray[i].date;
      let copyright = document.createElement("span");
      copyright.classList.add("copyright");
      if (resultsArray[i].copyright) {
        copyright.textContent = resultsArray[i].copyright;
      } else {
        copyright.textContent = "";
      }
      copyrightDiv.append(date, copyright);
      cardDiv.appendChild(copyrightDiv);
      cardsContainer.appendChild(cardDiv);
    }
  }
  // Hiding loader
  loader.style.display = "none";
  container.style.display = "inline-block";
};

// NASA API
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=10`;
const apiCount = 10;

const nasa = async () => {
  // Show Loader
  loader.style.display = "flex";
  container.style.display = "none";
  // getting ten pictures
  try {
    const response = await fetch(apiUrl);
    console.log(response);
    resultsArray = await response.json();

    updateDOM();
  } catch (error) {
    // Catch error here
  }
};

// Storing favorites in LocalStorage
const favoritesStorage = (elem) => {
  let parentElem = elem.parentNode.parentNode;
  let storeImgLink = parentElem.childNodes[0].childNodes[1].getAttribute("src");
  let storeFullImgLink =
    parentElem.childNodes[0].childNodes[0].getAttribute("href");
  let storeTitle = parentElem.childNodes[1].childNodes[0].textContent;
  let storeDescription = parentElem.childNodes[1].childNodes[2].textContent;
  let storeDate = parentElem.childNodes[2].childNodes[0].textContent;
  let storeCopyright = parentElem.childNodes[2].childNodes[1].textContent;
  console.log(parentElem);

  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].link === storeImgLink) {
      return;
    }
  }

  addedFavorite.style.visibility = "visible";
  setTimeout(() => {
    addedFavorite.style.visibility = "hidden";
  }, 1000);

  favorites.push({
    link: storeImgLink,
    fullImageLink: storeFullImgLink,
    title: storeTitle,
    description: storeDescription,
    date: storeDate,
    copyright: storeCopyright,
  });

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// Event Listeners
//---> Load More
loadMore.addEventListener("click", nasa);

nasa();
