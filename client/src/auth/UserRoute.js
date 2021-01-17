import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Nav from "../core/Nav";
import auth from "./auth-helper";

const UserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAuthenticated() ? (
        <>
          <Nav />
          <Component {...props} />
        </>
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default UserRoute;
