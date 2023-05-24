import "./FinanceTracker.css";
import { useEffect, useState } from "react";

function Records(props) {
  const [searchText, updateSearchText] = useState("");
  const [filteredTxn, updateFilteredTxn] = useState(props.transactions);

  //to update cells when search bar is used
  function filterData(searchText) {
    if (!searchText || !searchText.trim().length) {
      updateFilteredTxn(props.transactions);
      return;
    }
    let txn = [...props.transactions];
    txn = txn.filter((pay) =>
      pay.category.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    updateFilteredTxn(txn);
  }
  useEffect(() => filterData(searchText), [props.transactions]);

  //to insert transactions into cells
  function TransactionCell(props) {
    if (props.pay.type === "expense") {
      return (
        <div className="expenseCell">
          <span>{props.pay.category}</span>
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

  return (
    <div className="records">
      <div className="title">Transaction Records</div>

      <input
        className="searchBar"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          updateSearchText(e.target.value);
          filterData(e.target.value);
        }}
      />

      {filteredTxn?.length
        ? filteredTxn.map((pay) => <TransactionCell pay={pay} />)
        : ""}
    </div>
  );
}

export default Records;
