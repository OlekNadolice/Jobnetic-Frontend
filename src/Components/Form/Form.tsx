import React, { FC } from "react";
import classes from "./Form.module.css";
import { Link } from "react-router-dom";
// import icon from "utils/icon.svg";
import image from "utils/human.jpg";
import { SpinnerCircular } from "spinners-react";

interface FormProps {
  children: React.ReactNode;
  buttonText: string;
  promptText: string;
  url: string;
  urlText: string;
  isLoading?: boolean;
  errorMessage?: string;
  submit?: () => void;
}

const Form: FC<FormProps> = props => {
  return (
    <form name="form" className={classes.form}>
      <img src={image} alt="" />
      <section className={classes.formSection}>
        <h1>Jobnetic</h1>
        <h5>If you are looking for a job you've found the best place.</h5>
        {props.errorMessage && (
          <p className={classes.errorMessage}>{props.errorMessage}</p>
        )}
        {props.children}
        <button disabled={props.isLoading} onClick={props.submit}>
          {props.isLoading ? (
            <SpinnerCircular color="#0d47a1" size="40" />
          ) : (
            props.buttonText
          )}
        </button>
        <span className={classes.formFooter}>
          <span>{props.promptText}</span>
          <Link to={props.url}>{props.urlText}</Link>
        </span>
      </section>
    </form>
  );
};

export default Form;
