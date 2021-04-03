import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../core/Navbar";
import auth from "./auth-helper";

const UserRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			auth.isAuthenticated() ? (
				<>
					<Navbar />
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
