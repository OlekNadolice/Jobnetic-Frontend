import { FC } from "react";
import Form from "Components/Form/Form";
import FormControl from "Components/FormControl/FormControl";
import CheckBox from "Components/CheckBox/CheckBox";

import { useFormik } from "formik";
import * as yup from "yup";

import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import validateEmail from "./registerService";

const Register: FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      checkbox: false,
    },

    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email field is required")
        .email("Email field must contain a valid email")
        .test(
          "Check duplicate email",
          "This email already exists",
          function (value): any {
            return validateEmail(value);
            // return new Promise((resolve, reject) => {
            //   fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/emailVerification`, {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ email: value }),
            //   })
            //     .then(response => response.json())
            //     .then(data => {
            //       if (data.status === 200) {
            //         resolve(false);
            //       } else {
            //         resolve(true);
            //       }
            //     });
            // });
          }
        ),
      name: yup
        .string()
        .required("Name field is required")
        .min(3, "At least 3 characters is required")
        .max(30, "Maxiumum 30 characters is allowed"),
      password: yup
        .string()
        .required("Password field is required")
        .min(6, "Password must contain at least 6 characters")
        .max(40, "Maximum 30 characters is allowed"),
      checkbox: yup.boolean().oneOf([true], "You must accept the Terms."),
    }),

    onSubmit: () => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formik.values.name,
          email: formik.values.email,
          password: formik.values.password,
        }),
      })
        .then(data => data.json())
        .then(response => {
          if (response.status === 201) {
            navigate("/thanks");
          }
        });
    },
  });

  return (
    <div className="flexContainer">
      <Form
        url="/login"
        urlText="Login"
        buttonText="Register"
        promptText="Already have an account ?"
        submit={formik.handleSubmit}
      >
        <FormControl
          placeholder="Enter a email"
          id="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email}
        >
          <AiOutlineMail />
        </FormControl>

        <FormControl
          placeholder="Enter a name"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
        >
          <BsFillPersonFill />
        </FormControl>

        <FormControl
          placeholder="Enter a password"
          id="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
        >
          <RiLockPasswordLine />
        </FormControl>
        <CheckBox
          onChange={formik.handleChange}
          error={formik.touched.checkbox && formik.errors.checkbox}
          id="checkbox"
          label="I understand and agree with the Terms."
          checked={formik.values.checkbox}
        />
      </Form>
    </div>
  );
};

export default Register;
