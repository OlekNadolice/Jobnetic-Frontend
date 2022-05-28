import { useContext, useEffect, FC } from "react";
import { appContext } from "Context/App.context";

interface VerifyToken {
  children: React.ReactNode;
}

const VerifyToken: FC<VerifyToken> = props => {
  const { dispatch } = useContext(appContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/verifyUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      })
        .then(data => data.json())
        .then(response => {
          if (response.status === 401 || response.status == 500) {
            localStorage.removeItem("token");
            dispatch({ type: "HANDLE_LOGIN", payload: false });
          }
        });
    }
  }, []);

  return <>{props.children}</>;
};

export default VerifyToken;
