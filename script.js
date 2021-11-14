const images = document.querySelectorAll("img");
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

// NASA API
const nasa = async () => {
  let response = await fetch(
    "https://api.nasa.gov/planetary/apod?api_key=Bc8hTpRgWJK8kFV7gFlJTVQsAa8huNjE2tZbGOwd&count=10"
  );
  let res = await response.json();
  // Populating each card with information from API
  for (let i = 0; i < 10; i++) {
    images[i].src = res[i].url;
    imageLinks[i].href = res[i].hdurl;
    titles[i].textContent = res[i].title;
    descriptions[i].textContent = res[i].explanation;
    dates[i].textContent = res[i].date;
    if (!res[i].copyright) {
      copyrights[i].textContent = "Unknown";
    } else {
      copyrights[i].textContent = res[i].copyright;
    }
  }
};

// Storing favorites in LocalStorage
const favoritesStorage = (elem) => {
  let parentElem = elem.parentNode.parentNode;
  let storeImgLink =
    parentElem.childNodes[1].childNodes[1].childNodes[1].getAttribute("src");
  let storeTitle = parentElem.childNodes[3].childNodes[1].textContent;
  let storeDescription = parentElem.childNodes[3].childNodes[5].textContent;
  let storeDate = parentElem.childNodes[5].childNodes[1].textContent;
  let storeCopyright = parentElem.childNodes[5].childNodes[3].textContent;

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
    title: storeTitle,
    description: storeDescription,
    date: storeDate,
    copyright: storeCopyright,
  });

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// Event Listeners
//---> Add To Favorites
for (let i = 0; i < 10; i++) {
  addToFavorites[i].addEventListener("click", (e) => {
    e.preventDefault();

    favoritesStorage(e.target);
  });
}

//---> Load More
loadMore.addEventListener("click", nasa);

nasa();
