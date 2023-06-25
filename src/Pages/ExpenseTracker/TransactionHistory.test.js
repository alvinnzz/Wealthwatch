import TransactionInput from "./TransactionInput";
import TransactionHistory from "./TransactionHistory";
import { render, screen, fireEvent } from "@testing-library/react";

test("renders transaction history and adds a new transaction", () => {
  // Mock transaction history
  const transactionHistory = [
    { category: "Food", description: "Transaction 1", amount: 10 },
    { category: "Transport", description: "Transaction 2", amount: 25 },
  ];

  // Render the transaction history component
  render(
    <TransactionHistory
      transactionHistory={transactionHistory}
      setTransactionHistory={jest.fn()}
    />
  );

  // Assert that transaction boxes are rendered
  const transactionBoxes = screen.getAllByTestId("transaction-box");
  expect(transactionBoxes).toHaveLength(transactionHistory.length);

  // Render the transaction input component
  render(
    <TransactionInput
      transactionHistory={transactionHistory}
      setTransactionHistory={jest.fn()}
    />
  );

  // Get the input fields and submit button
  const categoryInput = screen.getByRole("option", { name: "Select option" });
  const descriptionInput = screen.getByPlaceholderText("Description");
  const amountInput = screen.getByPlaceholderText("Amount");
  const addButton = screen.getByRole("button", { name: "Add transaction" });

  // Interact with the input fields and submit the form
  fireEvent.change(categoryInput, { target: { value: "Food" } });
  fireEvent.change(descriptionInput, { target: { value: "New transaction" } });
  fireEvent.change(amountInput, { target: { value: "20" } });
  fireEvent.click(addButton);

  // Assert that the new transaction is added to the history
  const updatedTransactionBoxes = screen.getAllByTestId("transaction-box");
  expect(updatedTransactionBoxes).toHaveLength(transactionHistory.length + 1);
  expect(updatedTransactionBoxes[0]).toHaveTextContent("New transaction");
  expect(updatedTransactionBoxes[0]).toHaveTextContent("20");
});
