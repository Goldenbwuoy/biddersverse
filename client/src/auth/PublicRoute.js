import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "../core/Navbar";

const PublicRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) => (
			<>
				<Navbar />
				<Component {...props} />
			</>
		)}
	/>
);

export default PublicRoute;
