import { useState } from "react";

export default function AddExpenseModal({ onClose, onAdd }) {
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!desc.trim() || Number(amount) <= 0) return;

    onAdd({
      desc,
      amount: Number(amount),
      category,
      date,
    });

    onClose();
  };

  return (
    <div className="modal show">
      <form className="modal-content" onSubmit={handleSubmit}>
        <h3>Add Expense</h3>

        <input
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="travel">Travel</option>
          <option value="health">Health</option>
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
