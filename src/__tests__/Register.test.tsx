import Register from "Pages/Register";
import { BrowserRouter } from "react-router-dom";
import { screen, render, fireEvent } from "@testing-library/react";

jest.mock("Pages/registerService");

describe("Testing Register Page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  test("All inputs should be empty initially", () => {
    const inputName: HTMLInputElement = screen.getByPlaceholderText("Enter a name");
    const inputEmail: HTMLInputElement = screen.getByPlaceholderText("Enter a email");
    const inputPassword: HTMLInputElement =
      screen.getByPlaceholderText("Enter a password");

    expect(inputName.value).toBe("");
    expect(inputEmail.value).toBe("");
    expect(inputPassword.value).toBe("");
  });

  test("Should show validation errors when inputs are empty", async () => {
    const button = await screen.findByRole("button");
    fireEvent.click(button);
    const nameError = await screen.findByText("Name field is required");
    expect(nameError).toBeInTheDocument();
  });
});
