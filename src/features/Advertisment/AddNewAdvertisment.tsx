import React, { useContext, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { appContext } from "Context/App.context";
import classes from "./AddNewAdvertisment.module.css";
import Modal from "Components/Modal/Modal";
import FormControl from "Components/FormControl/FormControl";
import { useFormik } from "formik";

import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import FifthStep from "./FifthStep";

import * as yup from "yup";

const AddNewAdvertisment: FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(appContext);
  let body;
  const [step, setStep] = useState(1);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [expectedTechnologies, setExpectedTechnologies] = useState<string[]>([]);
  const [niceToHaveTechnologies, setNiceToHaveTechnologies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues: {
      positionName: "",
      company: "",
      place: "",
      level: "",
      formOfWork: "",
      workingTime: "",
      sallary: "",
    },

    validationSchema: yup.object({
      positionName: yup
        .string()
        .required("This field is required")
        .min(6, "Minimum 6 characters")
        .max(70, "Maximum 70 characters"),
      company: yup
        .string()
        .required("This field is required")
        .min(6, "Minimum 6 characters")
        .max(70, "Maximum 70 characters"),
      place: yup
        .string()
        .required("This field is required")
        .min(3, "Minimum 6 characters")
        .max(30, "Maximum 70 characters"),
      sallary: yup
        .string()
        .required("This field is required")
        .min(1, "Minimum 6 characters")
        .max(30, "Maximum 70 characters"),
      level: yup.string().required("This field is required"),
      formOfWork: yup.string().required("This field is required"),
      workingTime: yup.string().required("This field is required"),
    }),

    onSubmit: () => {
      setStep(2);
    },
  });

  const closeModal = () => {
    dispatch({ type: "HANDLE_ADVERTISEMENT_MODAL", payload: false });
  };

  const sendDataHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/advertisment/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Title: formik.values.positionName,
            Company: formik.values.company,
            City: formik.values.place,
            Level: formik.values.level,
            Earnings: formik.values.sallary,
            Form: formik.values.formOfWork,
            PartTime: formik.values.workingTime,
            Date: new Date().toISOString(),
            ExpectedTechnologies: expectedTechnologies,
            AdditionalTechnologies: niceToHaveTechnologies,
            Responsibilities: responsibilities,
            Requirements: requirements,
          }),
        }
      );

      const data = await response.json();
      setIsLoading(false);
      if (data.status === 201) {
        navigate("/offerts");
        dispatch({ type: "HANDLE_ADVERTISEMENT_MODAL", payload: false });
      }
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  if (step === 1) {
    body = (
      <>
        <div>
          <FormControl
            className={classes.control}
            placeholder="Company Name"
            onBlur={formik.handleBlur}
            error={formik.touched.company && formik.errors.company}
            value={formik.values.company}
            onChange={formik.handleChange}
            id="company"
          />
        </div>
        <div>
          <FormControl
            className={classes.control}
            placeholder="Position Name"
            onBlur={formik.handleBlur}
            error={formik.touched.positionName && formik.errors.positionName}
            value={formik.values.positionName}
            onChange={formik.handleChange}
            id="positionName"
          />
        </div>
        <div>
          <FormControl
            className={classes.control}
            placeholder="Place of work"
            onBlur={formik.handleBlur}
            error={formik.touched.place && formik.errors.place}
            value={formik.values.place}
            onChange={formik.handleChange}
            id="place"
          />
        </div>
        <div>
          <FormControl
            className={classes.control}
            placeholder="Sallary"
            onBlur={formik.handleBlur}
            error={formik.touched.sallary && formik.errors.sallary}
            value={formik.values.sallary}
            onChange={formik.handleChange}
            id="sallary"
          />
        </div>
        <div className={classes.selectBox}>
          <select
            data-testid="select"
            id="level"
            value={formik.values.level}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled selected>
              Level
            </option>
            <option value="Runior">Junior</option>
            <option value="Regular">Regular</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
          {formik.touched.level && formik.errors.level && (
            <span>{formik.errors.level}</span>
          )}
        </div>

        <div className={classes.selectBox}>
          <select
            data-testid="select2"
            id="formOfWork"
            value={formik.values.formOfWork}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" disabled selected>
              Form of work
            </option>
            <option value="Remote">Remote</option>
            <option value="Partly Remote">Partly Remote</option>
            <option value="Office Job">Office Job</option>
          </select>
          {formik.touched.formOfWork && formik.errors.formOfWork && (
            <span>{formik.errors.formOfWork}</span>
          )}
        </div>

        <div className={classes.selectBox}>
          <select
            data-testid="select3"
            id="workingTime"
            value={formik.values.workingTime}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            <option value="" disabled selected>
              Job Position
            </option>
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
          </select>
          {formik.touched.workingTime && formik.errors.workingTime && (
            <span>{formik.errors.workingTime}</span>
          )}
        </div>
        <button type="submit">Continue</button>
      </>
    );
  }

  if (step === 2) {
    body = (
      <SecondStep
        addResponsibility={setResponsibilities}
        setStep={setStep}
        responsibilities={responsibilities}
      />
    );
  }

  if (step === 3) {
    body = (
      <ThirdStep
        setStep={setStep}
        requirements={requirements}
        setRequirements={setRequirements}
      />
    );
  }

  if (step === 4) {
    body = (
      <FourthStep
        setExpectedTechnologies={setExpectedTechnologies}
        expectedTechnologies={expectedTechnologies}
        setStep={setStep}
      />
    );
  }

  if (step === 5) {
    body = (
      <FifthStep
        submit={sendDataHandler}
        setStep={setStep}
        isError={isError}
        niceToHaveTechnologies={niceToHaveTechnologies}
        setNiceToHaveTechnologies={setNiceToHaveTechnologies}
        isLoading={isLoading}
      />
    );
  }

  return (
    <Modal title="Add New Advertisment" closeModal={closeModal}>
      <form
        onSubmit={formik.handleSubmit}
        onClick={event => event.stopPropagation()}
        className={classes.form}
      >
        {body}
      </form>
    </Modal>
  );
};

export default AddNewAdvertisment;
