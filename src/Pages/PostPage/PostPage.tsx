import React from "react";
import classes from "./postPage.module.css";
import { useParams } from "react-router-dom";
import { data } from "data/PostData";

const PostPage = () => {
  const { id } = useParams();
  let body;
  const currentPost = data.find(element => {
    return element.id == Number(id?.slice(1));
  });

  if (currentPost) {
    body = (
      <div>
        <img src={currentPost.img} />
        <h2>{currentPost.title}</h2>
        <p>{currentPost.Description}</p>
      </div>
    );
  } else {
    body = <p>Post not found</p>;
  }

  return <div className={classes.container}>{body}</div>;
};

export default PostPage;
