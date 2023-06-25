import { render, screen, fireEvent } from "@testing-library/react";
import RegisterPage from "./RegisterPage";

test("allows users to input a username", () => {
  render(<RegisterPage />);
  const usernameInput = screen.getByPlaceholderText("Username");
  fireEvent.change(usernameInput, { target: { value: "john" } });
  expect(usernameInput.value).toBe("john");
});

test("allows users to input a Email", () => {
  render(<RegisterPage />);
  const emailInput = screen.getByPlaceholderText("Email");
  fireEvent.change(emailInput, { target: { value: "john@live.com" } });
  expect(emailInput.value).toBe("john@live.com");
});

test("allows users to input a Password", () => {
  render(<RegisterPage />);
  const passwordInput = screen.getByPlaceholderText("Password");
  fireEvent.change(passwordInput, { target: { value: "john12345" } });
  expect(passwordInput.value).toBe("john12345");
});
