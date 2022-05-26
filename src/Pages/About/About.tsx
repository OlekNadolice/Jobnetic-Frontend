import React from "react";
import classes from "./about.module.css";
import Question from "Components/Question/Question";

const questions = [
  {
    question: "What exactly is Jobnetic ?",
    answer:
      "Jobnetic is an online application, which can help you to find a job a lot quicker without losing your mind and going insane.",
  },
  {
    question: "How can I apply for the job ?",
    answer:
      "You have to fill out the form with your personal data such as First and Last Name, Phone Number and Email. ",
  },
  {
    question: "How hard is to get a job ?",
    answer:
      "Well, getting a job nowadays is not easy task, but with a help of Jobnetic its going to be a little eaasier for you, ",
  },
  {
    question: "Can I add job Advertisement for free ?",
    answer:
      "Yes, actually the whole application is free to use. We dont have any plans to change this in the future. So we have hope that you will like it :) ",
  },
  {
    question: " How can I  stand out when applying for a job ? ",
    answer:
      "Write unique CV which can make you easier to remember this is the same when it comes to building your portfolio. Give your self a little time dont be in hurry and the most important thing is to have a good mindset for success.",
  },

  {
    question: "How can you contact with us ?",
    answer:
      "You can send us email message for this adress Jobnetic@gmail.com or you can contact us on Facebook Jobnetic fan page and dont forget to leave a like.",
  },
];

const About = () => {
  return (
    <div className={classes.container}>
      {questions.map(element => {
        return <Question question={element.question} answer={element.answer} />;
      })}
    </div>
  );
};

export default About;
