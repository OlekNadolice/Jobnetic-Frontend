import React from "react";
import { useContext } from "react";
import { appContext } from "Context/App.context";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  element: any;
}

const PublicRoute = (props: PublicRouteProps) => {
  const { isLoggedIn } = useContext(appContext);
  if (isLoggedIn) {
    return <Navigate to="/"></Navigate>;
  }

  return props.element;
};

export default PublicRoute;
