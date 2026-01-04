let qty = 1;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const qtyDisplay = document.getElementById("qty");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

// Quantity control
function changeQty(val) {
  qty = Math.max(1, qty + val);
  qtyDisplay.textContent = qty;
}

// Add to cart
function addToCart() {
  const product = {
    name: "Stylish Headphones",
    price: 2499,
    variant: document.getElementById("variant").value,
    qty
  };

  cart.push(product);
  saveCart();
  updateCart();
}

// Update cart UI + total
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <p><strong>${item.name}</strong> (${item.variant})</p>
        <p>Qty: ${item.qty}</p>
        <p>₹${item.price * item.qty}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  cartCount.textContent = cart.length;
  totalPriceEl.textContent = total;
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

// Save to localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Toggle cart sidebar
function toggleCart() {
  document.getElementById("cartModal").classList.toggle("active");
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  document.getElementById("cartModal").classList.remove("active");
  document.getElementById("orderConfirm").style.display = "flex";

  cart = [];
  saveCart();
  updateCart();
}

// Close confirmation modal
function closeOrder() {
  document.getElementById("orderConfirm").style.display = "none";
}

// Init
updateCart();
