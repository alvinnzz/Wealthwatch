import "./FinanceTracker.css";
import Records from "./Records";
import TransactionsComponent from "./TransactionsComponent";
import { useState } from "react";

function FinanceTracker(props) {
  const [transactions, updateTransaction] = useState([]);

  const addTransaction = (data) => {
    const dataBase = [...transactions];
    dataBase.push(data);
    updateTransaction(dataBase);
  };

  return (
    <>
      <div className="title">
        Expense Tracker
        <TransactionsComponent addTransaction={addTransaction} />
        <Records transactions={transactions} />
      </div>
    </>
  );
}

export default FinanceTracker;
