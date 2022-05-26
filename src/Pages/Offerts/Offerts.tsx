import React, { useReducer, useEffect, FC } from "react";
import classes from "./offerts.module.css";
import ClipLoader from "react-spinners/ClipLoader";
import Advertisement from "Components/Advertisment/Advertisment";
import ReactPaginate from "react-paginate";

interface Data {
  Title: string;
  Company: string;
  Contract: string;
  Date: string;
  Level: string;
  PartTime: string;
  City: string;
  Earnings: string;
  Form: string;
  _id: string;
}

interface InitialState {
  loading: boolean;
  error: boolean;
  data: Data[];
  page: number;
  size: number;
}

const initialState: InitialState = {
  loading: true,
  error: false,
  data: [],
  page: 0,
  size: 0,
};

const reducer = (state: InitialState, action: any) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, data: [], error: false };

    case "SET_ERROR":
      return { ...state, error: true, loading: false, data: [] };

    case "SET_DATA":
      return {
        ...state,
        error: false,
        loading: false,
        data: action.payload.data,
        size: action.payload.size,
      };

    case "SET_PAGE":
      return { ...state, page: action.payload };

    default:
      return { ...state };
  }
};

const Offerts: FC = () => {
  let body;
  const limit = 5;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { loading, error, data, page, size } = state;

  useEffect(() => {
    const fetchOfferts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/advertisment/all?limit=${limit}&skip=${
            page * limit
          }`
        );
        const data = await response.json();
        console.log(data);

        dispatch({ type: "SET_DATA", payload: { data: data.data, size: data.size } });
      } catch (err) {
        dispatch({ type: "SET_ERROR" });
      }
    };

    fetchOfferts();
  }, [page]);

  const handlePageClick = (selectedItems: any) => {
    dispatch({ type: "SET_PAGE", payload: selectedItems.selected });
  };

  if (loading) {
    body = (
      <div className={classes.loading}>
        <ClipLoader color="#0d47a1" size="60px" />{" "}
      </div>
    );
  }

  if (error) {
    body = <div className={classes.loading}>Ups, something went wrong :(</div>;
  }

  if (data.length > 0) {
    body = (
      <div>
        {data.map((element: Data) => {
          return (
            <Advertisement
              id={element._id}
              key={element._id}
              form={element.Form}
              title={element.Title}
              company={element.Company}
              place={element.City}
              price={element.Earnings}
              partTime={element.PartTime}
              level={element.Level}
              date={element.Date}
            />
          );
        })}
        {size > limit && (
          <ReactPaginate
            className={classes.pagination}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            breakLabel="..."
            pageCount={Math.ceil(size / limit)}
            previousLabel=" previous"
            nextLabel="next "
            activeClassName={classes.active}
            previousClassName={classes.btn}
            pageClassName={classes.btn}
            nextClassName={classes.btn}
          />
        )}
      </div>
    );
  }

  return <div className={classes.containerOfferts}>{body}</div>;
};

export default Offerts;
