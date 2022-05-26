import React from "react";
import { useContext } from "react";
import { appContext } from "Context/App.context";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { isLoggedIn } = useContext(appContext);
  if (isLoggedIn) {
    return props.element;
  }

  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
