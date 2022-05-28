import React, { useState, FC } from "react";

interface FifthStepProps {
  niceToHaveTechnologies: string[];
  submit: (e: React.MouseEvent) => void;
  setNiceToHaveTechnologies: React.Dispatch<any>;
  setStep: React.Dispatch<number>;
  isLoading: boolean;
  isError: boolean;
}

const FifthStep: FC<FifthStepProps> = props => {
  const [inputValue, setInputValue] = useState("");

  const addNewTechnology = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    props.setNiceToHaveTechnologies((prevState: string[]) => {
      return [...prevState, inputValue];
    });

    setInputValue("");
  };

  return (
    <div className="stepBox">
      {props.isError && <p className="error">Ups Something Went Wrong</p>}
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Add Nice To Have Technologies"
      />
      <ol className="stepContent flex">
        {props.niceToHaveTechnologies.length > 0 &&
          props.niceToHaveTechnologies.map(element => {
            return (
              <li key={element}>
                <span>{element}</span>
              </li>
            );
          })}
      </ol>
      <button onClick={addNewTechnology}>Add</button>
      <button disabled={props.isLoading} className=" btn-action" onClick={props.submit}>
        Send Data
      </button>
      <button onClick={() => props.setStep(4)}>Back</button>
    </div>
  );
};

export default FifthStep;
