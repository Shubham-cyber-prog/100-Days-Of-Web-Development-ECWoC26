// inputs
const billInput = document.querySelector(".input-group input");
const tipButtons = document.querySelectorAll(".tip-buttons button");
const customTipInput = document.querySelector(".custom-tip");
const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");
const peopleCountEl = document.querySelector(".count");


// outputs
const tipPerPersonEL = document.querySelector(".result .row:first-child strong");
const totalPerPersonEl = document.querySelector(".result .row:last-child strong");


// reset
const resetBtn = document.querySelector(".reset-btn");


let billAmount = 0;
let tipPercent = 0;
let peopleCount = 1;


function calculate() {
    if ( billAmount <= 0 || peopleCount <= 0 ) {
        tipPerPersonEL.textContent = "₹0.00";
        totalPerPersonEl.textContent = "₹0.00";
        return;
    }

    const tipAmount = billAmount * (tipPercent / 100);
    const tipPerPerson = tipAmount / peopleCount;
    const totalPerPerson = (billAmount + tipAmount) / peopleCount;

    tipPerPersonEL.textContent = `₹${tipPerPerson.toFixed(2)}`;
    totalPerPersonEl.textContent = `₹${totalPerPerson.toFixed(2)}`;
}


function clearActiveTips() {
    tipButtons.forEach(btn => btn.classList.remove("active"));
}


// bill input
billInput.addEventListener("input", () => {
    billAmount = parseFloat(billInput.value) || 0;
    calculate();
});


// tip buttons
tipButtons.forEach(button => {
    button.addEventListener("click", () => {
        clearActiveTips();
        button.classList.add("active");

        tipPercent = parseInt(button.textContent);
        customTipInput.value = "";

        calculate();
    });
});


// custom tip
customTipInput.addEventListener("input", () => {
    clearActiveTips();
    tipPercent = parseFloat(customTipInput.value) || 0;
    calculate();
});


// people count
plusBtn.addEventListener("click", () => {
    peopleCount++;
    peopleCountEl.textContent = peopleCount;
    calculate();
});

minusBtn.addEventListener("click", () => {
    if (peopleCount > 1) {
        peopleCount--;
        peopleCountEl.textContent = peopleCount;
        calculate();
    }
});


// reset
resetBtn.addEventListener("click", () => {
    billAmount = 0;
    tipPercent = 0;
    peopleCount = 1;

    billInput.value = "";
    customTipInput.value = "";
    peopleCountEl.textContent = "1";

    clearActiveTips();

    tipPerPersonEL.textContent = "₹0.00";
    totalPerPersonEl.textContent = "₹0.00";
});