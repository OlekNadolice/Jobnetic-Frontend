import { useContext } from "react";
import { appContext } from "Context/App.context";

import { useNavigate } from "react-router-dom";

import Post from "Components/Post/Post";
import classes from "./home.module.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";
import { data } from "data/PostData";

const Home = () => {
  const date = new Date();
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const { dispatch } = useContext(appContext);

  const openModal = () => {
    dispatch({ type: "HANDLE_ADVERTISEMENT_MODAL", payload: true });
  };

  return (
    <div className={classes.container}>
      <section>
        <div className={classes.box}>
          <h3>Hello {name} !</h3>
        </div>
        <div className={classes.box}>
          <p>{date.toDateString()}</p>
        </div>
        <div className={classes.box} onClick={() => openModal()}>
          <IoIosAddCircleOutline />
          <p>Add Advertisement</p>
        </div>
        <div onClick={() => navigate("offerts")} className={classes.box}>
          <AiOutlineCheck />
          <p>See Job Offerts</p>
        </div>
      </section>
      <div>
        {data.map(element => {
          return (
            <Post
              title={element.title}
              description={element.Description}
              img={element.img}
              id={element.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
