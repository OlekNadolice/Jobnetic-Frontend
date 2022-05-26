import { useReducer, useEffect, useContext, FC } from "react";
import { appContext } from "Context/App.context";
import classes from "./advertismentPage.module.css";
import { useParams } from "react-router-dom";
import { RiBarChartGroupedLine } from "react-icons/ri";
import { MdIncompleteCircle, MdPlace, MdMapsHomeWork } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai";

import ClipLoader from "react-spinners/ClipLoader";

interface Data {}

interface initialStateInterface {
  loading: boolean;
  error: boolean;
  data: any;
}

const initialState = {
  loading: true,
  error: false,
  data: {},
};

const reducer = (state: initialStateInterface, action: any) => {
  switch (action.type) {
    case "SET_LOADING":
      return { loading: true, error: false, data: {} };
    case "SET_ERROR":
      return { loading: false, error: true, data: {} };

    case "SET_DATA":
      return { loading: false, error: false, data: action.payload };

    default:
      return { ...state };
  }
};

const AdvertismentPage: FC = () => {
  const { dispatch: globalDispatcher } = useContext(appContext);
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, data, error } = state;

  useEffect(() => {
    const fetchAdvertisment = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/advertisment/single?id=${id?.slice(1)}`
        );
        const data = await response.json();

        if (data.status === 200) {
          dispatch({ type: "SET_DATA", payload: data.data });
        }

        if (data.status === 404) {
          dispatch({ type: "SET_ERROR" });
        }
      } catch (err) {
        dispatch({ type: "SET_ERROR" });
      }
    };

    fetchAdvertisment();
  }, [id]);

  const openCvModal = () => {
    globalDispatcher({ type: "HANDLE_CV_MODAL", payload: true });
  };

  console.log(data);

  if (loading) {
    return (
      <div className={classes.centerFlex}>
        <ClipLoader color="#0d47a1" size="55px" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.centerFlex}>
        <h2>Ups Something went wrong :(</h2>
      </div>
    );
  }

  return (
    <>
      <div className={classes.container}>
        <div>
          <section className={classes.pageSection}>
            <header>
              <h2>{data.Title}</h2>
              <p>{data.Company}</p>
            </header>
            <div className={classes.infoBoxContainer}>
              <div className={classes.infoBox}>
                <MdPlace />
                <p>{data.City}</p>
              </div>
              <div className={classes.infoBox}>
                <RiBarChartGroupedLine />
                <p>{data.Level}</p>
              </div>
              <div className={classes.infoBox}>
                <MdIncompleteCircle />
                <p>{data.PartTime}</p>
              </div>
              <div className={classes.infoBox}>
                <MdMapsHomeWork />
                <p>{data.Form}</p>
              </div>
            </div>
          </section>

          <section className={classes.pageSection}>
            <h4>Technologies we use</h4>
            <h5>Expected</h5>
            <div className={classes.technologiesContainer}>
              {data.ExpectedTechnologies.length > 0 &&
                data.ExpectedTechnologies.map((element: string) => {
                  return <span key={element}>{element}</span>;
                })}
            </div>
            <h5>Nice to Have</h5>
            <div className={classes.technologiesContainer}>
              {data.AdditionalTechnologies.length > 0 &&
                data.AdditionalTechnologies.map((element: string) => {
                  return <span key={element}>{element}</span>;
                })}
            </div>
          </section>

          <section className={classes.pageSection}>
            <h4>Your responsibilities</h4>
            <ol>
              {data.Responsibilities.length > 0 &&
                data.Responsibilities.map((element: string) => {
                  return (
                    <li key={element} className={classes.sectionListItem}>
                      <AiOutlineCheck />
                      <p>{element}</p>
                    </li>
                  );
                })}
            </ol>
          </section>

          <section className={classes.pageSection}>
            <h4>Our requirements</h4>
            <ol className={classes.sectionList}>
              {data.Requirements.length > 0 &&
                data.Requirements.map((element: string) => {
                  return (
                    <li key={element} className={classes.sectionListItem}>
                      <AiOutlineCheck />
                      <p>{element}</p>
                    </li>
                  );
                })}
            </ol>
          </section>
        </div>
        <div>
          <button onClick={openCvModal} className={classes.actionBtn}>
            Apply now
          </button>
        </div>
      </div>
    </>
  );
};

export default AdvertismentPage;
