import { FC, useState } from "react";
interface ThirdStepProps {
  requirements: string[];
  setRequirements: React.Dispatch<any>;
  setStep: React.Dispatch<number>;
}

const ThirdStep: FC<ThirdStepProps> = props => {
  const [inputValue, setInputValue] = useState("");

  const addNewRequirement = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    props.setRequirements((prevState: string[]) => {
      return [...prevState, inputValue];
    });

    setInputValue("");
  };

  return (
    <div className="stepBox">
      <input
        type="text"
        placeholder="Add Requirements"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <ol className="stepContent">
        {props.requirements.length > 0 &&
          props.requirements.map(element => {
            return <li key={element}>{element}</li>;
          })}
      </ol>
      <button onClick={addNewRequirement} disabled={inputValue.length < 6}>
        Add
      </button>
      <button disabled={props.requirements.length === 0} onClick={() => props.setStep(4)}>
        Next
      </button>
      <button onClick={() => props.setStep(2)}>Back</button>
    </div>
  );
};

export default ThirdStep;
