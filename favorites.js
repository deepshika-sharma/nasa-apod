const favoritesContainer = document.querySelector(".favorites-container");
const cardsContainer = document.querySelector(".cards-container");

let cards;

// Displaying Favorites Page
const displayFavorites = () => {
  let favoritesList = JSON.parse(localStorage.getItem("favorites"));

  if (favoritesList) {
    for (let i = 0; i < favoritesList.length; i++) {
      // Card div
      let card = document.createElement("div");
      card.classList.add("card");
      // image div
      let imageDiv = document.createElement("div");
      imageDiv.classList.add("image");
      let imageLink = document.createElement("a");
      imageLink.classList.add("image-link");
      imageLink.setAttribute("target", "_blank");
      imageLink.setAttribute("href", favoritesList[i].link);
      let image = document.createElement("img");
      image.setAttribute("src", favoritesList[i].link);
      image.setAttribute("title", "View Full Image");
      image.setAttribute("alt", "NASA Image");
      imageLink.appendChild(image);
      imageDiv.appendChild(imageLink);

      // Info Div
      let infoDiv = document.createElement("div");
      infoDiv.classList.add("info");
      // -- title
      let title = document.createElement("h3");
      title.classList.add("title");
      title.textContent = favoritesList[i].title;
      // -- remove favorite
      let removeFavoriteLink = document.createElement("a");
      removeFavoriteLink.classList.add("remove-favorite");
      removeFavoriteLink.textContent = "Remove Favorite";
      removeFavoriteLink.addEventListener("click", (e) => {
        // e.preventDefault();
        removeFavorite(e.target);
      });
      // -- description
      let description = document.createElement("p");
      description.classList.add("description");
      description.textContent = favoritesList[i].description;
      infoDiv.appendChild(title);
      infoDiv.appendChild(removeFavoriteLink);
      infoDiv.appendChild(description);

      // Copyright Details
      let copyrightDiv = document.createElement("div");
      copyrightDiv.classList.add("copyright-details");
      let date = document.createElement("span");
      date.classList.add("date");
      date.textContent = favoritesList[i].date;
      let copyright = document.createElement("span");
      copyright.classList.add("copyright");
      copyright.textContent = favoritesList[i].copyright;
      copyrightDiv.appendChild(date);
      copyrightDiv.appendChild(copyright);

      card.appendChild(imageDiv);
      card.appendChild(infoDiv);
      card.appendChild(copyrightDiv);
      cardsContainer.appendChild(card);
      favoritesContainer.appendChild(cardsContainer);
    }
  }
};

// Remove Favorite
const removeFavorite = (elem) => {
  let elemTitle =
    elem.parentNode.parentNode.childNodes[1].childNodes[0].textContent;

  cards = document.querySelectorAll(".card");
  let storedFavorites = JSON.parse(localStorage.getItem("favorites"));
  console.log(storedFavorites);

  for (let i = 0; i < storedFavorites.length; i++) {
    if ((storedFavorites[i].title = elemTitle)) {
      storedFavorites.splice(i, 1);
      break;
    }
  }
  console.log("out");
  // storedFavorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(storedFavorites));
  elem.parentNode.parentNode.remove();
  if (storedFavorites.length < 1) {
    localStorage.clear();
  }
};

displayFavorites();
