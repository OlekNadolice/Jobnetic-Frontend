import React from "react";

import AddNewAdvertisment from "features/Advertisment/AddNewAdvertisment";
import { BrowserRouter } from "react-router-dom";

import { screen, render, fireEvent } from "@testing-library/react";
import { debug } from "console";

describe("Testing add new Advertisment component", () => {
  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    document.body.appendChild(modalRoot);
    render(
      <BrowserRouter>
        <AddNewAdvertisment />
      </BrowserRouter>
    );
  });

  test("It should render form properly", async () => {
    const element = await screen.getByPlaceholderText("Company Name");
    expect(element).toBeInTheDocument();
  });

  test("It should error validation when form is invalid", async () => {
    const button = await screen.findByRole("button");
    fireEvent.click(button);
    const errorMessage = await screen.findAllByText("This field is required");
    expect(errorMessage[0]).toBeInTheDocument();
  });

  test("It should go to the second step when first step is correct", async () => {
    const inputs = await screen.findAllByRole("textbox");
    const button = await screen.findByRole("button");

    inputs.forEach(element => {
      fireEvent.change(element, {
        target: { value: "TestowePole" },
      });
    });

    const selectFirst = await screen.getByTestId("select");
    const selectSecond = await screen.getByTestId("select2");
    const selectThird = await screen.getByTestId("select3");

    fireEvent.select(selectFirst, { Junior: "Junior" });
    fireEvent.select(selectSecond, { Remote: "Remote" });
    fireEvent.select(selectThird, { FullTime: "Full Time" });

    fireEvent.click(button);

    const error = await screen.findAllByText("This field is required");

    expect(error[0]).toBeInTheDocument();
  });
});
