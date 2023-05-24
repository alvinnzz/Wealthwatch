import "./FinanceTracker.css";
import Records from "./Records";
import TransactionsComponent from "./TransactionsComponent";
import { useEffect, useState } from "react";

function FinanceTracker(props) {
  const [transactions, updateTransaction] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);

  // only add transaction if category and amount is written
  const addTransaction = (data) => {
    if (data.category !== null && data.amount !== 0) {
      const dataBase = [...transactions];
      dataBase.unshift(data);
      updateTransaction(dataBase);
    }
  };

  function calculateBalance() {
    let exp = 0;
    let inc = 0;
    transactions.map((pay) => {
      pay.type === "expense"
        ? (exp = exp + pay.amount)
        : (inc = inc + pay.amount);
    });
    updateExpense(exp);
    updateIncome(inc);
  }

  //balance is calculated when =[transaction] changes
  useEffect(() => calculateBalance(), [transactions]);

  return (
    <>
      <div className="title">
        Expense Tracker
        <TransactionsComponent
          addTransaction={addTransaction}
          expense={expense}
          income={income}
        />
        <Records transactions={transactions} />
      </div>
    </>
  );
}

export default FinanceTracker;
