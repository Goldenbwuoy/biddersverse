import React from "react";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ErrorIcon from "@material-ui/icons/Error";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import auth from "./../auth/auth-helper";
import { Link, Redirect } from "react-router-dom";
import { signin } from "./api-auth.js";
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
	links: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 300,
		textDecoration: "none",
	},
}));

function SignIn(props) {
	const classes = useStyles();
	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		redirectToRefer: false,
	});

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });
		const user = {
			email: values.email || undefined,
			password: values.password || undefined,
		};

		signin(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				auth.authenticate(data, () => {
					setValues({
						...values,
						loading: false,
						error: "",
						redirectToReferrer: true,
					});
				});
			}
		});
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const { from } = props.location.state || {
		from: {
			pathname: "/",
		},
	};
	const { redirectToReferrer } = values;
	if (redirectToReferrer) {
		return <Redirect to={from} />;
	}
	return (
		<>
			{values.loading ? (
				<Loading />
			) : (
				<Card className={classes.card}>
					<CardContent>
						<Typography variant="h6" className={classes.title}>
							Sign In
						</Typography>
						<form onSubmit={clickSubmit}>
							<TextField
								id="email"
								type="email"
								label="Email"
								variant="outlined"
								className={classes.textField}
								value={values.email}
								onChange={handleChange("email")}
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
									>
										<ErrorIcon />
									</Icon>
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
						<Link className={classes.links} to="/signup">
							Don't have an account?
						</Link>
						<Link className={classes.links} to="/adminLogin">
							Are you the admin?
						</Link>
					</CardContent>
				</Card>
			)}
		</>
	);
}

export default SignIn;
