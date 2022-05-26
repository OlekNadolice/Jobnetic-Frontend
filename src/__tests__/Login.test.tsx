import Login from "Pages/Login";
import { screen, render, fireEvent, act } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

describe("Testing Login Page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  test("Input initially should  be empty ", () => {
    const emailInput: HTMLInputElement = screen.getByPlaceholderText("Enter a email");
    const passwordInput: HTMLInputElement =
      screen.getByPlaceholderText("Enter a password");

    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });

  test("Email input should show validation error when is empty ", async () => {
    const button = await screen.findByRole("button");
    fireEvent.click(button);
    const errorText = await screen.findByText("Email field is required");
    expect(errorText).toBeInTheDocument();
  });

  test("Email input should show validation error when it doesn't contain proper email  ", async () => {
    const emailInput = await screen.findByPlaceholderText("Enter a email");
    fireEvent.change(emailInput, { target: { value: "blablabla" } });

    const button = await screen.findByRole("button");
    fireEvent.click(button);

    const errorText = await screen.findByText("This field should contain a valid email");
    expect(errorText).toBeInTheDocument();
  });

  test("Password input should show validation error when is empty ", async () => {
    const button = await screen.findByRole("button");
    fireEvent.click(button);
    const errorText = await screen.findByText("Password field is required");
    expect(errorText).toBeInTheDocument();
  });

  test("Password input should show validation error when it has length less than 6 ", async () => {
    const inputPassword = await screen.findByPlaceholderText("Enter a password");
    fireEvent.change(inputPassword, { target: { value: "dwa" } });

    const button = await screen.findByRole("button");
    fireEvent.click(button);
    const errorText = await screen.findByText(
      "Password is too short! At least 6 characters is required"
    );
    expect(errorText).toBeInTheDocument();
  });

  test("Password input should show validation error when it has length more than 25 ", async () => {
    const inputPassword = await screen.findByPlaceholderText("Enter a password");
    fireEvent.change(inputPassword, {
      target: { value: "asdfghjkoplnisdfghjkopdsepskdjfjdndndnd" },
    });

    const button = await screen.findByRole("button");
    fireEvent.click(button);
    const errorText = await screen.findByText(
      "Password is too long! Maximum 25 characters"
    );
    expect(errorText).toBeInTheDocument();
  });

  test("Should run submit function when form data is correct ", async () => {
    const inputEmail = await screen.findByPlaceholderText("Enter a email");
    const inputPassword: HTMLInputElement = await screen.findByPlaceholderText(
      "Enter a password"
    );
    const button = await screen.findByRole("button");

    const form = await screen.findByRole("form");

    fireEvent.change(inputEmail, {
      target: { value: "olek@wp.pl" },
    });

    fireEvent.change(inputPassword, {
      target: { value: "1234567" },
    });

    act(() => {
      fireEvent.click(button);
    });
  });
});
