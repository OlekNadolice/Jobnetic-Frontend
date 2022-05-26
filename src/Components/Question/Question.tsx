import React, { useState, FC } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import classes from "./question.module.css";

interface QuestionProps {
  question: string;
  answer: string;
}

const Question: FC<QuestionProps> = props => {
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);

  return (
    <div className={classes.container}>
      <div className={classes.questionHeader}>
        <h3>{props.question}</h3>
        {!isAnswerOpen ? (
          <AiOutlinePlus role="button" onClick={() => setIsAnswerOpen(true)} />
        ) : (
          <AiOutlineClose role="button" onClick={() => setIsAnswerOpen(false)} />
        )}
      </div>
      {isAnswerOpen && <p className={classes.answer}>{props.answer}</p>}
    </div>
  );
};

export default Question;
