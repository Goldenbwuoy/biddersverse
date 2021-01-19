import React from "react";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "../admin/dashboard/Dashboard";
import auth from "./auth-helper";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth.isAdminAuthenticated() ? (
        <>
          <Dashboard />
          <Component {...props} />
        </>
      ) : (
        <Redirect
          to={{
            pathname: "/adminLogin",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default AdminRoute;
