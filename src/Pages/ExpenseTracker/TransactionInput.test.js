import TransactionInput from "./TransactionInput";
import { render, screen, fireEvent } from "@testing-library/react";

//Testing for Transaction page, checked whether input boxes for values worked.

test("allows users to input Amount", () => {
  render(<TransactionInput />);
  const amountInput = screen.getByPlaceholderText("Amount");
  fireEvent.change(amountInput, { target: { value: "100" } });
  expect(amountInput.value).toBe("100");
});

test("allows users to input Description", () => {
  render(<TransactionInput />);
  const amountInput = screen.getByPlaceholderText("Description");
  fireEvent.change(amountInput, { target: { value: "Bus to Tuas" } });
  expect(amountInput.value).toBe("Bus to Tuas");
});

test("allows users to select an option in the dropdown", () => {
  render(<TransactionInput />);
  const selectInput = screen.getByRole("option", { name: "Select option" });

  fireEvent.change(selectInput, { target: { value: "Transport" } });

  expect(selectInput.value).toBe("Transport");
});
