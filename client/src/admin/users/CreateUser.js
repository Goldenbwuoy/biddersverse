import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import { makeStyles } from "@material-ui/core/styles";
import {
	Button,
	CssBaseline,
	TextField,
	Grid,
	Typography,
	Dialog,
	DialogContent,
	DialogTitle,
	CircularProgress,
	IconButton,
} from "@material-ui/core";
import { createUser } from "../api-admin";
import auth from "../../auth/auth-helper";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
	},

	paper: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
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
}));

function CreateUser({ open, setOpen, updateUsers }) {
	const { token } = auth.isAdminAuthenticated();
	const classes = useStyles();
	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		password: "",
		loading: false,
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

		createUser({ token: token }, user).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				console.log(data);
				setValues({
					...values,
					firstName: "",
					lastName: "",
					email: "",
					phoneNumber: "",
					password: "",
					loading: false,
					error: "",
				});
				updateUsers(data);
				setOpen(false);
			}
		});
	};

	return (
		<Dialog open={open} aria-labelledby="">
			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<DialogTitle id="">New User</DialogTitle>
				<IconButton onClick={() => setOpen(false)}>
					<CloseIcon />
				</IconButton>
			</div>

			<DialogContent>
				<CssBaseline />
				<div className={classes.paper}>
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
								"Create User"
							)}
						</Button>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default CreateUser;
