import { render, screen, fireEvent } from "@testing-library/react";
import RegisterPage from "./RegisterPage";
import "@testing-library/jest-dom";

// unit testing for register
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

// system testing
test("does not allow users to create an account with a taken email", () => {
  render(<RegisterPage />);
  const usernameInput = screen.getByPlaceholderText("Username");
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");

  //creating account
  fireEvent.change(usernameInput, { target: { value: "john" } });
  fireEvent.change(emailInput, { target: { value: "john@live.com" } });
  fireEvent.change(passwordInput, { target: { value: "john12345" } });

  const registerbutton = screen.getByRole("button", {
    name: "Create your account",
  });
  fireEvent.click(registerbutton);

  //creating account with same email
  fireEvent.change(usernameInput, { target: { value: "john" } });
  fireEvent.change(emailInput, { target: { value: "john@live.com" } });
  fireEvent.change(passwordInput, { target: { value: "john12345" } });

  fireEvent.click(registerbutton);

  //error should show up, whereby email is taken
  expect(screen.getByTestId("emailtaken")).toBeInTheDocument();
});
