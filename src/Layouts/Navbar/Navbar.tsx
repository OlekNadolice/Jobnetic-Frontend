import { useState, useContext } from "react";
import { appContext } from "Context/App.context";
import classes from "./navbar.module.css";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";

const Navbar = () => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const { dispatch, isLoggedIn } = useContext(appContext);

  function closeHambugerMenu() {
    setIsHamburgerMenuOpen(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    dispatch({ type: "HANDLE_LOGIN", payload: false });
  };

  if (isLoggedIn) {
    return (
      <nav className={classes.navbar}>
        <div className={classes.navbarInner}>
          <h1>Jobnetic</h1>

          {!isHamburgerMenuOpen ? (
            <GiHamburgerMenu onClick={() => setIsHamburgerMenuOpen(true)} />
          ) : (
            <MdOutlineClose onClick={() => setIsHamburgerMenuOpen(false)} />
          )}

          <ul
            className={`${classes.navbarInnerRight} ${
              isHamburgerMenuOpen && classes.active
            } `}
          >
            <li>
              <NavLink
                onClick={closeHambugerMenu}
                to="/"
                className={props => (props.isActive ? classes.navActive : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/offerts"
                onClick={closeHambugerMenu}
                className={props => (props.isActive ? classes.navActive : "")}
              >
                Offerts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={closeHambugerMenu}
                className={props => (props.isActive ? classes.navActive : "")}
              >
                About
              </NavLink>
            </li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      </nav>
    );
  } else {
    return null;
  }
};

export default Navbar;
