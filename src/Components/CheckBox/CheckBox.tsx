import { FC } from "react";
import classes from "./checkbox.module.css";

interface CheckBoxProps {
  label: string;
  id: string;
  error?: string | boolean;
  checked: boolean;
  onChange: any;
}

const CheckBox: FC<CheckBoxProps> = props => {
  return (
    <>
      <div className={classes.checkbox}>
        <input
          onChange={props.onChange}
          name="checkbox"
          checked={props.checked}
          type="checkbox"
        />
        <label>{props.label}</label>
      </div>
      {props.error && <span className={classes.error}>{props.error}</span>}
    </>
  );
};

export default CheckBox;
