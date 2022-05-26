import React, { FC } from "react";
import classes from "./FormControl.module.css";

interface FormControlProps {
  placeholder: string;
  id: string;
  type?: string;
  value: string;
  onChange?: any;
  className?: any;
  onBlur?: any;
  error?: string | boolean;

  children?: React.ReactNode;
}

const FormControl: FC<FormControlProps> = props => {
  return (
    <>
      <div className={`${classes.formControl} ${props.error && classes.error}  `}>
        {props.children}
        <input
          className={props.className}
          autoComplete="new-password"
          id={props.id}
          type={props.type || "text"}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
      {props.error && <span className={classes.errorMessage}>{props.error}</span>}
    </>
  );
};

export default FormControl;
