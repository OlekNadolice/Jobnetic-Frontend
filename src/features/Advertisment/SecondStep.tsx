import React, { FC, useState } from "react";

interface SecondStepProps {
  addResponsibility: React.Dispatch<any>;
  setStep: React.Dispatch<number>;
  responsibilities: string[];
}

const SecondStep: FC<SecondStepProps> = props => {
  const [inputValue, setInputValue] = useState("");

  const addNewResponsibilities = (event: React.MouseEvent<HTMLButtonElement>): void => {
    props.addResponsibility((prevState: string[]) => {
      return [...prevState, inputValue];
    });

    setInputValue("");
  };

  return (
    <div className="stepBox">
      <input
        type="text"
        placeholder="Add Responsibilities"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />

      <ol className="stepContent">
        {props.responsibilities.length > 0 &&
          props.responsibilities.map(element => {
            return <li key={element}>{element}</li>;
          })}
      </ol>
      <button disabled={inputValue.length < 6} onClick={addNewResponsibilities}>
        Add
      </button>
      <button
        disabled={props.responsibilities.length === 0}
        onClick={() => props.setStep(3)}
      >
        Next
      </button>
      <button onClick={() => props.setStep(1)}>Back</button>
    </div>
  );
};

export default SecondStep;
