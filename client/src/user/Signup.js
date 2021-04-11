import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { create } from "./api-user.js";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
		marginTop: theme.spacing(3),
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

function Signup() {
	const classes = useStyles();
	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
		loading: false,
		open: false,
		error: "",
	});

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });
		const user = {
			firstName: values.firstName || undefined,
			lastName: values.lastName || undefined,
			email: values.email || undefined,
			phoneNumber: values.phoneNumber || undefined,
			password: values.password || undefined,
		};
		create(user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					loading: false,
					error: "",
					open: true,
				});
			}
		});
	};

	return (
		<Container className={classes.root} component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form
					onSubmit={clickSubmit}
					className={classes.form}
					noValidate
				>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								value={values.firstName}
								onChange={handleChange("firstName")}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								value={values.lastName}
								onChange={handleChange("lastName")}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								value={values.email}
								onChange={handleChange("email")}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="phoneNumber"
								label="Phone Number"
								name="phoneNumber"
								value={values.phoneNumber}
								onChange={handleChange("phoneNumber")}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
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
						</Grid>
						{values.error && (
							<Grid item xs={12}>
								<Typography
									className={classes.error}
									color="secondary"
								>
									{values.error}
								</Typography>
							</Grid>
						)}
					</Grid>
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
							"Sign Up"
						)}
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link className={classes.link} to="/signin">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Dialog open={values.open} disableBackdropClick={true}>
				<DialogTitle>Account Created</DialogTitle>
				<DialogContent>
					<DialogContentText>
						An email has been sent to your address, check your inbox
						and confirm your email address.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link className={classes.link} to="/signin">
						<Button color="primary" variant="contained">
							Sign In
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</Container>
	);
}

export default Signup;
