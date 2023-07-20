import BudgetPage from "./BudgetPage";
import ProgressBar from "./ProgressBar";
import { useState } from "react";
import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockTransactionHistory = [
  { id: 1, description: "sample", amount: "700", category: "Food" },
];

beforeEach(() => {
  const Wrapper = () => {
    const [mockBudget, setMockBudget] = useState(0);
    return (
      <BudgetPage
        transactionHistory={mockTransactionHistory}
        budget={mockBudget}
        setBudget={setMockBudget}
      />
    );
  };
  render(<Wrapper />);
});

let mockBudget = 0;
test("Budget Page should render", () => {
  expect(screen.getByText("Budget")).toBeInTheDocument();
});

test("Budget should change", () => {
  // Find the budget input field
  const budgetInput = screen.getByPlaceholderText("Enter monthly budget");
  const editBudgetButton = screen.getByRole("button", { name: "Save Budget" });

  // Type a new budget value
  fireEvent.change(budgetInput, { target: { value: "700" } });
  expect(budgetInput.value).toBe("700");

  //submit form
  fireEvent.click(editBudgetButton);

  //if data passes, it means progress bar is rendered
  expect(screen.getByTestId("budget")).toHaveTextContent("700");
});
