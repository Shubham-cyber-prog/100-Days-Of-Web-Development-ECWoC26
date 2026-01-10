const cartItemsEl = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  const cart = getCart();
  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
    subtotalEl.textContent = taxEl.textContent = totalEl.textContent = 0;
    return;
  }

  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" />
      <div>
        <h3>${item.title}</h3>
        <p>₹${item.price}</p>
        <div class="cart-qty">
          <button onclick="updateQty(${index}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQty(${index}, 1)">+</button>
        </div>
        <strong>₹${itemTotal}</strong>
        <button class="remove" onclick="removeItem(${index})">Remove</button>
      </div>
    `;

    cartItemsEl.appendChild(div);
  });

  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;

  subtotalEl.textContent = subtotal;
  taxEl.textContent = tax;
  totalEl.textContent = total;
}

function updateQty(index, change) {
  const cart = getCart();
  cart[index].quantity += change;

  if (cart[index].quantity < 1) return;

  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

renderCart();
