import classes from "./landing.module.css";
import { Link } from "react-router-dom";
import LandingImage from "utils/landingImage.svg";

const Landing = () => {
  return (
    <div className={classes.container}>
      <nav className={classes.nav}>
        <h1>Jobnetic</h1>

        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
      <main>
        <section>
          <h2>Stop waiting</h2>
          <p>Jobnetic is the place where you can find your dream job effortles.</p>
          <Link className={classes.btn} to="/register">
            Get Started
          </Link>
        </section>
        <img src={LandingImage} alt="" />
      </main>
    </div>
  );
};

export default Landing;
