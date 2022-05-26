import React, { FC } from "react";
import { Link } from "react-router-dom";
import classes from "./post.module.css";

interface PostProps {
  title: String;
  description: String;
  img?: string;
  id: number;
}

const Post: FC<PostProps> = props => {
  return (
    <div className={classes.container}>
      <img src={props.img} />
      <div className={classes.containerContent}>
        <h2>{props.title}</h2>
        <p>{props.description.slice(0, 30)} ...</p>
        <Link to={`post:${props.id}`}>Read more.</Link>
      </div>
    </div>
  );
};

export default Post;
