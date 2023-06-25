import TransactionInput from "./TransactionInput";
import { render, screen, fireEvent } from "@testing-library/react";

//Testing for Transaction page, checked whether input boxes for amount and description works, followed by drop down box for category.

test("allows users to input Amount", () => {
  render(<TransactionInput />);
  const amountInput = screen.getByPlaceholderText("Amount");
  fireEvent.change(amountInput, { target: { value: "100" } });
  expect(amountInput.value).toBe("100");
});

test("allows users to input Description", () => {
  render(<TransactionInput />);
  const descriptionInput = screen.getByPlaceholderText("Description");
  fireEvent.change(descriptionInput, { target: { value: "Bus to Tuas" } });
  expect(descriptionInput.value).toBe("Bus to Tuas");
});

test("allows users to select category in the dropdown box", () => {
  render(<TransactionInput />);
  const categoryInput = screen.getByRole("option", { name: "Select option" });

  fireEvent.change(categoryInput, { target: { value: "Transport" } });

  expect(categoryInput.value).toBe("Transport");
});
