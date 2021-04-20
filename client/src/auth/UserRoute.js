import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Footer from "../core/Footer";
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
					<Footer />
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
