import { Link } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import classes from "./thankyou.module.css";

const ThankYou = () => {
  return (
    <div className={classes.container}>
      <AiOutlineCheck className={classes.succesIcon} />
      <h2>Thank you for registration in Jobnetic.</h2>
      <h6>We'are sure that you'll find your dream job soon.</h6>
      <Link className={classes.succesBtn} to="/login">
        Continue
      </Link>
    </div>
  );
};

export default ThankYou;
