import React, { useState } from "react";
import auth from "./../auth/auth-helper";
import { Redirect } from "react-router-dom";
import { adminSignin } from "./api-auth.js";
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Typography,
	Container,
	CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

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
		<Container className={classes.root} component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Admin Sign in
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
						id="name"
						label="Name"
						name="name"
						autoFocus
						value={values.name}
						onChange={handleChange("name")}
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
				</form>
			</div>
		</Container>
	);
}

export default AdminSignIn;
