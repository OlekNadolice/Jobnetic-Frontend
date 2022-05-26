import { FC } from "react";
import { Link } from "react-router-dom";
import classes from "./advertisment.module.css";

import { MdOutlinePlace } from "react-icons/md";
import { RiBarChartGroupedLine } from "react-icons/ri";
import { CgFileDocument } from "react-icons/cg";
import { MdIncompleteCircle } from "react-icons/md";
import { GrMoney } from "react-icons/gr";

interface AdvertismentProps {
  id: string;
  key: string;
  title: string;
  company: string;
  place: string;
  price: string;

  partTime: string;
  level: string;
  date: string;
  form: string;
}

const Advertisment: FC<AdvertismentProps> = props => {
  const date = props.date;
  return (
    <div className={classes.advertisment}>
      <Link to={`/advertisment:${props.id}`}>{props.title}</Link>
      <h5>{props.company}</h5>
      <section className={classes.advertismentInfo}>
        <p>
          <MdOutlinePlace /> {props.place}
        </p>
        {props.price && (
          <p>
            <GrMoney /> {props.price}
          </p>
        )}
      </section>
      <section className={classes.advertismentInfo}>
        <span>
          <CgFileDocument />
          <h6>{props.form}</h6>
        </span>
        <span>
          <MdIncompleteCircle />
          <h6>{props.partTime}</h6>
        </span>
        <span>
          <RiBarChartGroupedLine />
          <h6>{props.level}</h6>
        </span>
      </section>
      <h4>Published {new Date(date).toLocaleDateString()}</h4>
    </div>
  );
};

export default Advertisment;
