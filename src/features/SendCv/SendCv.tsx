import { FC, useContext, useState } from "react";
import { appContext } from "Context/App.context";

import ClipLoader from "react-spinners/ClipLoader";

import classes from "./sendCv.module.css";
import Modal from "Components/Modal/Modal";

import FormControl from "Components/FormControl/FormControl";
import { useFormik } from "formik";
import * as yup from "yup";

const SendCv: FC = () => {
  const { dispatch } = useContext(appContext);
  const [isLoading, setIsLoading] = useState(false);
  const [sendedMessage, setSendedMessage] = useState(false);
  let body;
  const closeModalHandler = () => {
    dispatch({ type: "HANDLE_CV_MODAL", payload: false });
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      githubProfile: "",
    },

    validationSchema: yup.object({
      firstName: yup
        .string()
        .required("This field is required")
        .min(2, "First Name must have at least two characters")
        .max(70, "Maxiumum  length is 70 characters")
        .matches(/^[aA-zZ\s]+$/, "Only letters are allowed"),
      lastName: yup
        .string()
        .required("This field is required")
        .min(2, "Last name must have at least two characters")
        .max(70, "Maxiumum  length is 70 characters")
        .matches(/^[aA-zZ\s]+$/, "Only letters are allowed"),
      email: yup
        .string()
        .required("This field is required")
        .email("This field must contain a valid email"),
      githubProfile: yup
        .string()
        .required("This field is required")
        .matches(
          /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm,
          "This field must contain url adress"
        ),
    }),

    onSubmit: () => {
      setIsLoading(true);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/advertisment/sendCv`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          email: formik.values.email,
          githubProfile: formik.values.githubProfile,
        }),
      })
        .then(data => {
          console.log(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  if (!sendedMessage) {
    body = (
      <>
        <div>
          <FormControl
            placeholder="First Name"
            id="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
          />
        </div>
        <div>
          <FormControl
            placeholder="Last Name"
            id="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
          />
        </div>
        <div>
          <FormControl
            type="email"
            placeholder="Email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
        </div>
        <div>
          <FormControl
            type="text"
            placeholder="Github Profile"
            id="githubProfile"
            value={formik.values.githubProfile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.githubProfile && formik.errors.githubProfile}
          />
        </div>
        <button disabled={isLoading}>
          {isLoading ? <ClipLoader size="30" color="#fff" /> : "Send"}
        </button>
      </>
    );
  }

  if (sendedMessage) {
    body = (
      <>
        <h2>Thank your for sending your Cv</h2>
        <p>We'll reply for your resume as fast as possible.</p>
      </>
    );
  }

  return (
    <Modal closeModal={closeModalHandler} title="Send Cv">
      <form
        onSubmit={formik.handleSubmit}
        onClick={e => e.stopPropagation()}
        className={classes.container}
      >
        {body}
      </form>
    </Modal>
  );
};

export default SendCv;
