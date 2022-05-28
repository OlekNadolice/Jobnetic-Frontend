import React, { FC, useState } from "react";

interface FourthStepProps {
  setStep: React.Dispatch<number>;
  expectedTechnologies: string[];
  setExpectedTechnologies: React.Dispatch<any>;
}

const FourthStep: FC<FourthStepProps> = props => {
  const [inputValue, setInputValue] = useState("");

  const addNewTechnology = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    props.setExpectedTechnologies((prevState: string[]) => {
      return [...prevState, inputValue];
    });

    setInputValue("");
  };

  return (
    <div className="stepBox">
      <input
        type="text"
        placeholder="Add Expected Technologies"
        value={inputValue}
        onChange={e => {
          e.stopPropagation();
          setInputValue(e.target.value);
        }}
      />
      <ol className="stepContent flex">
        {props.expectedTechnologies.length > 0 &&
          props.expectedTechnologies.map(element => {
            return (
              <li key={element}>
                <span>{element}</span>
              </li>
            );
          })}
      </ol>
      <button onClick={addNewTechnology} disabled={inputValue.length < 2}>
        Add
      </button>
      <button onClick={() => props.setStep(5)}>Next</button>
      <button onClick={() => props.setStep(3)}>Back</button>
    </div>
  );
};

export default FourthStep;
