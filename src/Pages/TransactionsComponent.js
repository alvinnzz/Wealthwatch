import "./FinanceTracker.css";
import { useState } from "react";

function AddTransactionViewer(props) {
  const [category, setCat] = useState();
  const [amount, setAmount] = useState();
  const [type, setType] = useState("expense");

  function addTransaction() {
    props.addTransaction({
      category,
      amount: Number(amount),
      type,
      id: Date.now(),
    });
    props.toggleClick();
  }

  return (
    <>
      <form className="transactionContainer">
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCat(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          required
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="radio">
          <input
            type="radio"
            id="expense"
            name="transaction"
            value="expense"
            checked={type === "expense"}
            onChange={() => setType("expense")}
          />
          <label for="expense">Expense</label>

          <input
            type="radio"
            id="income"
            name="transaction"
            value="income"
            checked={type === "income"}
            onChange={() => setType("income")}
          />
          <label for="income">Income</label>
        </div>
        <button onClick={addTransaction} className="addTransaction">
          Add Transaction
        </button>
      </form>
    </>
  );
}

function TransactionsComponent(props) {
  const [isClicked, toggleClick] = useState(false);

  return (
    <div className="contents">
      <div className="balance">
        Balance: $100000
        <button
          className="addTransaction"
          onClick={() => toggleClick(!isClicked)}
        >
          {isClicked ? "Cancel" : "Add"}
        </button>
      </div>
      {isClicked && (
        <AddTransactionViewer
          toggleClick={toggleClick}
          addTransaction={props.addTransaction}
        />
      )}
      <div className="ExpenseIncomeContainer">
        <div className="ExpenseContainer">
          Expense<span>$1000</span>
        </div>
        <div className="IncomeContainer">
          Income<span>$1000</span>
        </div>
      </div>
    </div>
  );
}
export default TransactionsComponent;
