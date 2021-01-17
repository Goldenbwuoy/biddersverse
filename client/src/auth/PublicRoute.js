import React, { Component } from "react";
import { Route } from "react-router-dom";
import Nav from "../core/Nav";

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <>
        <Nav />
        <Component {...props} />
      </>
    )}
  />
);

export default PublicRoute;
