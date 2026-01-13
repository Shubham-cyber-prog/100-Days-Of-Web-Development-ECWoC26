const products = [
  {
    title: "Wireless Headphones",
    price: 2999,
    originalPrice: 3999,
    rating: 4.4,
    image: "images/headphones.png",
    description:
      "High-quality wireless headphones with noise cancellation and long battery life."
  },
  {
    title: "Wired Earphones",
    price: 999,
    originalPrice: 1499,
    rating: 4.2,
    image: "images/earphones.png",
    description:
      "Lightweight wired earphones with deep bass and clear sound."
  },
  {
    title: "Bluetooth AirPods",
    price: 1999,
    originalPrice: 2499,
    rating: 4.5,
    image: "images/airpods.png",
    description:
      "Compact Bluetooth airpods with fast pairing and long battery backup."
  }
];

/* -------------------- DOM ELEMENTS -------------------- */
const mainImage = document.getElementById("mainImage");
const titleEl = document.getElementById("title");
const priceEl = document.getElementById("price");
const originalPriceEl = document.getElementById("originalPrice");
const ratingEl = document.getElementById("rating");
const descriptionEl = document.getElementById("description");
const thumbnails = document.querySelectorAll(".thumbnails img");

const qtyEl = document.getElementById("qty");
let qty = 1;
let currentProductIndex = 0;

/* -------------------- LOAD PRODUCT -------------------- */
function loadProduct(index) {
  const product = products[index];

  mainImage.src = product.image;
  titleEl.textContent = product.title;
  priceEl.textContent = product.price;
  originalPriceEl.textContent = `₹${product.originalPrice}`;
  ratingEl.textContent = product.rating;
  descriptionEl.textContent = product.description;

  qty = 1;
  qtyEl.textContent = qty;
  currentProductIndex = index;

  thumbnails.forEach(t => t.classList.remove("active"));
  thumbnails[index].classList.add("active");
}

/* -------------------- IMAGE SWITCH -------------------- */
thumbnails.forEach((img, index) => {
  img.addEventListener("click", () => loadProduct(index));
});

/* -------------------- QUANTITY -------------------- */
document.getElementById("increase").onclick = () => {
  qty++;
  qtyEl.textContent = qty;
};

document.getElementById("decrease").onclick = () => {
  if (qty > 1) {
    qty--;
    qtyEl.textContent = qty;
  }
};

/* -------------------- CART (localStorage) -------------------- */
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart() {
  const cart = getCart();
  const product = products[currentProductIndex];

  const existingItem = cart.find(
    item => item.title === product.title
  );

  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({
      title: product.title,
      price: product.price,
      quantity: qty,
      image: product.image
    });
  }

  saveCart(cart);
  alert(`${qty} item(s) added to cart`);
}

/* -------------------- BUTTON -------------------- */
document.getElementById("addToCart").onclick = addToCart;

/* -------------------- INITIAL LOAD -------------------- */
loadProduct(0);
