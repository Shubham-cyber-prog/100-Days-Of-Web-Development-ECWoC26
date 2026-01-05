const addExpenseBtn = document.querySelector(".add-expense-btn");
const expenseList = document.querySelector(".expense-list");
const totalExpenses = document.querySelector(".total-expenses h3");

let expenses = [];
let total = 0;


function renderExpenses(){

    let html = "";
        expenses.forEach(expense => {

            html += `
                <div class="expense-item">
                <div class="expense-item-description">${expense.description}</div>
                <div class="expense-item-amount">$${expense.amount}</div>
                <button class="delete-expense-btn">&times;</button>
                </div>
            `;
        });

        expenseList.innerHTML = html;
        totalExpenses.innerText =  `Total Expenses: $${total}`;


}




function addExpense(){

    const description = prompt("Enter Expense Description:");
    const amount = parseFloat(prompt("Enter Expense Amount"));

    if (description && amount)
    {
        const expense = {
            description:description,
            amount:amount
        };

        expenses.push(expense);
        total += amount;
        renderExpenses();
    }
}

addExpenseBtn.addEventListener("click", addExpense);


function deleteExpense(index){

    total -= expenses[index].amount;
    expenses.splice(index,1)
    renderExpenses();

}

expenseList.addEventListener("click",function(event){

    if(event.target.classList.contains("delete-expense-btn")){

        const index = Array.from(event.target.parentNode.parentNode.children)
        .indexOf(event.target.parentNode);
        
        deleteExpense(index);
    }


});