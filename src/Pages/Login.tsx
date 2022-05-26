import { useState, useContext } from "react";
import { appContext } from "Context/App.context";

import Form from "Components/Form/Form";
import FormControl from "Components/FormControl/FormControl";

import { useFormik } from "formik";
import * as yup from "yup";

import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(appContext);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email field is required")
        .email("This field should contain a valid email"),
      password: yup
        .string()
        .required("Password field is required")
        .min(6, "Password is too short! At least 6 characters is required")
        .max(25, "Password is too long! Maximum 25 characters"),
    }),

    onSubmit: () => {
      setIsLoading(true);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formik.values.email,
          password: formik.values.password,
        }),
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          if (data.status === 201) {
            dispatch({ type: "HANDLE_LOGIN", payload: true });
            localStorage.setItem("name", data.name);
            localStorage.setItem("token", data.token);
          }

          if (data.status === 401) {
            setErrorMessage(data.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <div className="flexContainer">
      <Form
        errorMessage={errorMessage}
        buttonText="Login"
        submit={formik.handleSubmit}
        promptText="Dont have an account ?"
        urlText="Register"
        isLoading={isLoading}
        url="/register"
      >
        <FormControl
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
          id="email"
          type="email"
          placeholder="Enter a email"
        >
          <AiOutlineMail />
        </FormControl>
        <FormControl
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
          id="password"
          type="password"
          placeholder="Enter a password"
        >
          <RiLockPasswordLine />
        </FormControl>
      </Form>
    </div>
  );
};

export default Login;
