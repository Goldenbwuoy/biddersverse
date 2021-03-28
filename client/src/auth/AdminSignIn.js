import React from "react";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import auth from "./../auth/auth-helper";
import { Redirect } from "react-router-dom";
import { adminSignin } from "./api-auth.js";
import Loading from "../core/Loading";

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 600,
		margin: "auto",
		textAlign: "center",
		marginTop: theme.spacing(5),
		paddingBottom: theme.spacing(2),
	},
	error: {
		verticalAlign: "middle",
	},
	title: {
		marginTop: theme.spacing(2),
		color: theme.palette.openTitle,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "80%",
	},
	submit: {
		margin: "auto",
		marginBottom: theme.spacing(2),
	},
}));

function AdminSignIn(props) {
	const classes = useStyles();
	const [values, setValues] = useState({
		name: "",
		password: "",
		error: "",
		loading: false,
		redirectToDashboard: false,
	});

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });
		const admin = {
			name: values.name || undefined,
			password: values.password || undefined,
		};

		adminSignin(admin).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				console.log(data);
				auth.authenticateAdmin(data, () => {
					setValues({
						...values,
						loading: false,
						error: "",
						redirectToDashboard: true,
					});
				});
			}
		});
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const { redirectToDashboard } = values;
	if (redirectToDashboard) {
		return <Redirect to="/admin/home" />;
	}
	return (
		<>
			{values.loading ? (
				<Loading />
			) : (
				<Card className={classes.card}>
					<CardContent>
						<Typography variant="h6" className={classes.title}>
							Administrator Sign In
						</Typography>
						<form onSubmit={clickSubmit}>
							<TextField
								id="name"
								type="text"
								label="Name"
								variant="outlined"
								className={classes.textField}
								value={values.name}
								onChange={handleChange("name")}
								margin="normal"
							/>
							<br />
							<TextField
								id="password"
								type="password"
								label="Password"
								variant="outlined"
								className={classes.textField}
								value={values.password}
								onChange={handleChange("password")}
								margin="normal"
							/>
							<br />{" "}
							{values.error && (
								<Typography component="p" color="error">
									<Icon
										color="error"
										className={classes.error}
									></Icon>
									{values.error}
								</Typography>
							)}
							<CardActions>
								<Button
									color="primary"
									type="submit"
									variant="contained"
									className={classes.submit}
								>
									Submit
								</Button>
							</CardActions>
						</form>
					</CardContent>
				</Card>
			)}
		</>
	);
}

export default AdminSignIn;
