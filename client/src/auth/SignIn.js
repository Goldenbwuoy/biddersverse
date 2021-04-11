import React, { useState } from "react";
import auth from "./../auth/auth-helper";
import { Redirect } from "react-router-dom";
import { signin } from "./api-auth.js";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	error: {
		marginTop: theme.spacing(1),
	},
	loading: {
		color: "#fff",
	},
	link: {
		textDecoration: "none",
		color: "#006637",
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
		<Container className={classes.root} component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form
					onSubmit={clickSubmit}
					className={classes.form}
					noValidate
				>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={values.email}
						onChange={handleChange("email")}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={values.password}
						onChange={handleChange("password")}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					{values.error && (
						<Typography className={classes.error} color="secondary">
							{values.error}
						</Typography>
					)}

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						{values.loading ? (
							<CircularProgress
								size={24}
								className={classes.loading}
							/>
						) : (
							"Sign In"
						)}
					</Button>
					<Grid container>
						<Grid item xs>
							<Link className={classes.link} to="#">
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link className={classes.link} to="/signup">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}

export default SignIn;
