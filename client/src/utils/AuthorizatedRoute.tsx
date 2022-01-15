import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import Loading from "../components/global/Loading";
import { RootStore } from "./TypeScript";

const AuthorizatedRoute = ({ children, ...props }: RouteProps) => {
  const { auth } = useSelector((state: RootStore) => state);

  return (
    <Route
      {...props}
      render={({ location }) => {
        if (auth.token) {
          return <Fragment> {children} </Fragment>;
        }
        // } else if (!auth.token) {
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: "/login",
        //         state: { from: location },
        //       }}
        //     />
        //   );
        // }
      }}
    ></Route>
  );
};

export default AuthorizatedRoute;
