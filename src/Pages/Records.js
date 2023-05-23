import "./FinanceTracker.css";

function TransactionCell(props) {
  if (props.type === "expense") {
    return (
      <div className="expenseCell">
        <span>{props.pay.Category}</span>
        <span>${props.pay.amount}</span>
      </div>
    );
  } else {
    return (
      <div className="incomeCell">
        <span>{props.pay.category}</span>
        <span>${props.pay.amount}</span>
      </div>
    );
  }
}

function Records(props) {
  return (
    <div className="records">
      <div className="title">Transaction Records</div>

      <input className="searchBar" placeholder="Search" />
      {props.transactions?.length
        ? props.transactions.map((pay) => <TransactionCell pay={pay} />)
        : ""}
    </div>
  );
}

export default Records;
