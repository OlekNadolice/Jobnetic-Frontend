import Question from "Components/Question/Question";
import { screen, render, act, fireEvent } from "@testing-library/react";

describe("Testing question component", () => {
  beforeEach(() => {
    render(<Question question="How to get a job" answer="Getting job is really easy" />);
  });

  it("Should render component properly", async () => {
    const question = await screen.findByText("How to get a job");
    expect(question).toBeInTheDocument();
  });

  it("Initially answer should be hidden", async () => {
    const answer = await screen.queryByText("Getting job is really easy");
    expect(answer).not.toBeInTheDocument();
  });

  it("Should open answer paragraph when button is clicked", async () => {
    const button: any = await screen.findByRole("button");
    fireEvent.click(button);
    const answer = await screen.findByText("Getting job is really easy");
    expect(answer).toBeInTheDocument();
  });
});
