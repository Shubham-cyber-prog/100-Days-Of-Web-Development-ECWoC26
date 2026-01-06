const modal = document.getElementById("modal");
const openBtn = document.querySelector(".add-expense-btn");
const cancelBtn = document.getElementById("cancelBtn");
const addBtn = document.getElementById("addBtn");

const descInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");

const expenseList = document.querySelector(".expense-list");
const totalEl = document.getElementById("total-expense");
const ring = document.querySelector(".ring");
const expenseAmount = document.getElementById("expense-amount");
const warning = document.getElementById("limit-warning");
const limitAmountEl = document.getElementById("limit-amount");

const foodTotalEl = document.getElementById("total-food");
const shoppingTotalEl = document.getElementById("total-shopping");
const travelTotalEl = document.getElementById("total-travel");
const healthTotalEl = document.getElementById("total-health");

const CATEGORY_COLORS = {
  food: "#22c55e",
  shopping: "#f59e0b",
  travel: "#3b82f6",
  health: "#ef4444"
};

let expenses = [];

/* Monthly limit (default ₹5000, saved once) */
let MONTHLY_LIMIT = localStorage.getItem("monthlyLimit");
if (!MONTHLY_LIMIT) {
  MONTHLY_LIMIT = 5000;
  localStorage.setItem("monthlyLimit", MONTHLY_LIMIT);
} else {
  MONTHLY_LIMIT = Number(MONTHLY_LIMIT);
}
limitAmountEl.textContent = MONTHLY_LIMIT;

/* Edit limit */
limitAmountEl.onclick = () => {
  const value = Number(prompt("Edit monthly limit:", MONTHLY_LIMIT));
  if (!value || value <= 0) return;
  MONTHLY_LIMIT = value;
  localStorage.setItem("monthlyLimit", MONTHLY_LIMIT);
  limitAmountEl.textContent = MONTHLY_LIMIT;
  render();
};

/* Modal controls */
openBtn.onclick = () => modal.classList.add("show");
cancelBtn.onclick = () => modal.classList.remove("show");

/* Add expense */
addBtn.onclick = () => {
  const desc = descInput.value.trim();
  const amt = Number(amountInput.value);
  const cat = categoryInput.value;

  if (!desc || amt <= 0 || isNaN(amt)) return;

  expenses.push({ desc, amount: amt, category: cat });
  descInput.value = "";
  amountInput.value = "";
  modal.classList.remove("show");

  render();
};

/* Render everything */
function render() {
  expenseList.innerHTML = "";

  let total = 0;
  let catTotals = { food: 0, shopping: 0, travel: 0, health: 0 };

  expenses.forEach(e => {
    total += e.amount;
    catTotals[e.category] += e.amount;

    const div = document.createElement("div");
    div.className = "expense-item";
    div.innerHTML = `<span>${e.desc}</span><strong>₹${e.amount.toFixed(2)}</strong>`;
    expenseList.appendChild(div);
  });

  totalEl.textContent = `Total Expense: ₹${total.toFixed(2)}`;
  expenseAmount.textContent = `₹${total.toFixed(0)}`;

  foodTotalEl.textContent = `₹${catTotals.food}`;
  shoppingTotalEl.textContent = `₹${catTotals.shopping}`;
  travelTotalEl.textContent = `₹${catTotals.travel}`;
  healthTotalEl.textContent = `₹${catTotals.health}`;

  updateRing(catTotals, total);
  warning.style.display = total > MONTHLY_LIMIT ? "block" : "none";
}

/* Multi-color ring */
function updateRing(catTotals, total) {
  if (total === 0) {
    ring.style.background = "#e5e7eb";
    return;
  }

  let start = 0;
  let parts = [];

  for (const cat in catTotals) {
    const value = catTotals[cat];
    if (value === 0) continue;

    const deg = (value / total) * 360;
    parts.push(`${CATEGORY_COLORS[cat]} ${start}deg ${start + deg}deg`);
    start += deg;
  }

  ring.style.background = `conic-gradient(${parts.join(", ")}, #e5e7eb ${start}deg 360deg)`;
}
