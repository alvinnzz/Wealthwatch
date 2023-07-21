import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./LoginPage";
import "@testing-library/jest-dom";

test("allows users to input a Email", () => {
  render(<LoginPage setToken={jest.fn()} />);
  const emailInput = screen.getByPlaceholderText("Email");
  fireEvent.change(emailInput, { target: { value: "john@live.com" } });
  expect(emailInput.value).toBe("john@live.com");
});

test("allows users to input a Password", () => {
  render(<LoginPage />);
  const passwordInput = screen.getByPlaceholderText("Password");
  fireEvent.change(passwordInput, { target: { value: "john12345" } });
  expect(passwordInput.value).toBe("john12345");
});
