let newMeat;
let allMeats;
let newMerch;
let meatBanner;
let cartArray = [];
let currentMerch;
let allCheese;
document.addEventListener("DOMContentLoaded", () => {
  fetch("https://sausage-depot-muh9.onrender.com/Meats")
    .then((res) => res.json())
    .then((meats) => {
      renderPage();
      allMeats = meats;
      meats.forEach((meat) => {
        renderCard(meat);
      });
      //favorite();
    });
  fetch("https://sausage-depot-muh9.onrender.com/cheese")
    .then((res) => res.json())
    .then((cheeseItems) => {
      allCheese = cheeseItems;
    });
  cartListMaker();
});
function renderPage() {
  addBanner("sources/1_098f32f2-739b-4e04-9396-73a5b456cbb9_1600x.jpeg");
  let logoImg = document.createElement("img");
  logoImg.setAttribute(
    "src",
    "sources/sausage-depot-high-resolution-color-logo (2).png"
  );

  logoImg.setAttribute("class", "logo");
  let meats = document.createElement("h2");
  meats.textContent = "Meats";
  meats.addEventListener("click", () => {
    showMeats();
  });
  addHoverEffect(meats);
  let favs = document.createElement("h2");
  favs.textContent = "Favorites";
  favs.setAttribute("id", "favs");
  favs.addEventListener("click", () => {
    showFavorites();
  });
  addHoverEffect(favs);
  let board = document.createElement("h2");
  board.innerHTML = `Charcuterie board <br> Generator`;
  addHoverEffect(board);
  board.addEventListener("click", () => {
    showBoard();
  });
  let merch = document.createElement("h2");
  merch.textContent = "Merch";
  merch.addEventListener("click", () => {
    showMerch();
  });
  addHoverEffect(merch);
  let cheese = document.createElement("h2");
  cheese.textContent = "Cheese";
  cheese.addEventListener("click", () => {
    showCheese();
  });
  addHoverEffect(cheese);
  let sideBar = document.querySelector("#sideBar");
  sideBar.append(logoImg, meats, cheese, favs, board, merch);
}
function showFavorites() {
  console.log(allMeats);
  console.log("i got clicked");
  clearPage();
  //addBanner("sources/Merch+banner-1.png");
  allMeats.forEach((meat) => {
    if (meat.favorite) {
      renderCard(meat);
    }
  });
  allCheese.forEach((cheese) => {
    if (cheese.favorite) {
      renderCard(cheese);
    }
  });
}
function showBoard() {
  clearPage();
  //addBanner("sources/Test-Banner-2-cropped.jpg");
  for (let i = 0; i < 3; i++) {
    let randomIndexCheese = Math.round(Math.random() * (allCheese.length - 1));
    let randomIndexMeat = Math.round(Math.random() * (allMeats.length - 1));
    console.log(randomIndexCheese);
    console.log(randomIndexMeat);
    console.log(allCheese[randomIndexCheese]);
    console.log(allMeats[randomIndexMeat]);
    renderCard(allCheese[randomIndexCheese]);
    renderCard(allMeats[randomIndexMeat]);
  }
}
function showMerch() {
  clearPage();

  // addBanner("sources/Merch+banner-1.png");
  fetch("https://sausage-depot-muh9.onrender.com/merch")
    .then((res) => res.json())
    .then((merchItems) => {
      merchItems.forEach((item) => {
        renderCard(item);
      });
      //favorite();
    });
}
function showCheese() {
  clearPage();
  // addBanner("sources/Test-Banner-2-cropped.jpg");
  fetch("https://sausage-depot-muh9.onrender.com/cheese")
    .then((res) => res.json())
    .then((cheeseItems) => {
      allCheese = cheeseItems;
      cheeseItems.forEach((cheese) => {
        renderCard(cheese);
      });
    });
}
function showMeats() {
  clearPage();

  // addBanner("sources/1_098f32f2-739b-4e04-9396-73a5b456cbb9_1600x.jpeg");
  allMeats.forEach((meat) => {
    renderCard(meat);
  });
}

function addToCartForm(currentItem) {
  let addToCartForm = document.createElement("form");
  let quantityInput = document.createElement("input");
  let submit = document.createElement("input");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("id", "quantity-input");
  quantityInput.setAttribute("placeholder", "Add Quantity");
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "Add to Cart");
  addToCartForm.append(quantityInput, submit);
  addToCartForm.addEventListener("click", (e) => {
    e.stopPropagation();
  });
  addToCartForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let quantity = parseInt(e.target["quantity-input"].value);
    console.log(quantity);
    if (quantity < 1 || Number.isNaN(quantity)) {
      alert("Quantity must be a positive number.");
      return;
    }
    let cartItem = {
      img: currentItem.image,
      price: currentItem.price,
      name: currentItem.name,
      amount: quantity,
    };
    if (cartArray.some((item) => item.name === cartItem.name)) {
      let index = cartArray.indexof(item.name);
      cartArrray[index] += quantity;
      return;
    }
    cartArray.push(cartItem);
    cartListMaker();
  });
  return addToCartForm;
}

function cartListMaker() {
  let total = 0;

  if (cartArray.length > 0) {
    document.querySelector("#cart-container").innerHTML = "";
    let cartList = document.createElement("ul");
    cartList.setAttribute("class", "cart-list");
    cartArray.forEach((item, index) => {
      let line = document.createElement("li");
      line.setAttribute("class", "cart-line");
      let img = document.createElement("img");
      img.setAttribute("class", "listImg");
      img.src = item.img;
      let itemPrice = document.createElement("p");
      itemPrice.textContent = `$${item.price}/Lbs`;
      itemPrice.setAttribute("class", "cart-line-item");

      let name = document.createElement("p");
      name.textContent = item.name;
      name.setAttribute("class", "cart-line-item");

      let quantity = document.createElement("input");
      quantity.setAttribute("type", "number");
      quantity.setAttribute("value", item.amount);
      quantity.setAttribute("class", "cart-line-item");
      quantity.addEventListener("change", (event) => {
        let newQuantity = parseInt(event.target.value);
        if (newQuantity >= 0) {
          cartArray[index].amount = newQuantity;
          cartListMaker();
        }
      });
      let totalAmount = item.price * item.amount;
      total += totalAmount;
      let totalAmmountP = document.createElement("p");
      totalAmmountP.setAttribute("class", "cart-line-item");
      totalAmmountP.textContent = "$" + totalAmount.toFixed(2);
      line.append(img, name, itemPrice, quantity, totalAmmountP);
      cartList.appendChild(line);
    });
    document.querySelector("#cart-container").appendChild(cartList);
    let totalholder = document.createElement("div");
    totalholder.setAttribute("class", "total-holder");
    let totalP = document.createElement("p");
    totalP.textContent = "Total: $" + total.toFixed(2);
    totalP.setAttribute("class", "cart-total");
    totalholder.appendChild(totalP);
    document.querySelector("#cart-container").appendChild(totalholder);
  } else {
    let line = document.createElement("li");
    line.setAttribute("class", "cart-line");
    line.textContent = "Cart is Empty";
    document.querySelector("#cart-container").appendChild(line);
    let totalholder = document.createElement("div");
    totalholder.setAttribute("class", "total-holder");
    let totalP = document.createElement("p");
    totalP.textContent = "Total: $" + total.toFixed(2);
    totalP.setAttribute("class", "cart-total");
    totalholder.appendChild(totalP);
    document.querySelector("#cart-container").appendChild(totalholder);
  }
}

//boiler plate stuff
function clearPage() {
  let content = document.querySelector("#Meat-Menu");
  content.innerHTML = "";
}
let cartContainer = document.querySelector("#cart-container");
let cartBtn = document.querySelector("#cartBtn");
cartBtn.addEventListener("click", () => {
  if (cartContainer.style.display === "none") {
    cartContainer.style.display = "block";
  } else {
    cartContainer.style.display = "none";
  }
});

function addBanner(imgUrl) {
  topBanner = document.createElement("div");
  let bannerImg = document.createElement("img");
  bannerImg.src = imgUrl;
  bannerImg.setAttribute("class", "banner");
  
  bannerImg.setAttribute("alt", "logo");
  topBanner.append(bannerImg);
  document.querySelector("#Meat-Menu").appendChild(topBanner);
}

function renderCard(item) {
  let itemCard = document.createElement("div");
  itemCard.setAttribute("class", "card");

  let cardFront = document.createElement("div");
  cardFront.setAttribute("class", "card-front");
  cardFront.style.backgroundImage = `url(${item.image})`;

  let itemName = document.createElement("h3");
  itemName.setAttribute("class", "card-name");
  itemName.textContent = item.name;
  
  cardFront.appendChild(itemName);
  if (!item.inCart) {
    let favoriteBtnFront = document.createElement("button");
    if (item.favorite) {
      favoriteBtnFront.textContent = "★";
    } else {
      favoriteBtnFront.textContent = "☆";
    }
    favoriteBtnFront.setAttribute("class", "card-btn");
    favoriteBtnFront.addEventListener("click", (event) => {
      if (item.favorite) {
        item.favorite = false;
        favoriteBtnFront.textContent = "☆";
      } else {
        item.favorite = true;
        favoriteBtnFront.textContent = "★";
      }
      event.stopPropagation(); // prevent event from propagating to card
    });
    cardFront.appendChild(favoriteBtnFront);
  }
  itemCard.appendChild(cardFront);
  // Create back face of the card with item details and add-to-cart button
  let CardBack = document.createElement("div");
  CardBack.setAttribute("class", "card-back");
  CardBack.style.backgroundColor = "#ccc";
  let itemDetails = document.createElement("div");
  itemDetails.setAttribute("class", "card-details");
  itemDetails.textContent = item.description;
  let itemPrice = document.createElement("p");
  itemPrice.textContent = `$${item.price} per pound`;
  //itemDetails.appendChild(itemPrice);
  itemDetails.append(itemPrice, addToCartForm(item));
  CardBack.appendChild(itemDetails);
  itemCard.appendChild(CardBack);
  // Add click event listener to flip the card on click
  itemCard.addEventListener("click", () => {
    itemCard.classList.toggle("card-flip");
  });
  document.querySelector("#Meat-Menu").appendChild(itemCard);
}

function addHoverEffect(item) {
  item.addEventListener("mouseover", () => {
    item.style.color = "#f00";
    console.log("hey im hovering here");
  });
  item.addEventListener("mouseout", () => {
    item.style.color = "black";
  });
}
