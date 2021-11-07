import React, { useEffect, useState } from "react";
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
	Switch,
	FormControlLabel,
} from "@material-ui/core";
import { updateUser } from "../api-admin";
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

function UpdateUser({ open, setOpen, user, editUser }) {
	const { token } = auth.isAdminAuthenticated();
	const classes = useStyles();
	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		seller: false,
		loading: false,
		error: "",
	});

	useEffect(() => {
		setValues({
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
			phoneNumber: user?.phoneNumber,
			seller: user?.seller,
			loading: false,
			error: "",
		});
	}, [user]);

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleCheck = (event, checked) => {
		setValues({ ...values, seller: !values.seller });
	};

	const closeDialog = () => {
		setValues({
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			seller: false,
			loading: false,
			error: "",
		});
		setOpen(false);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });
		const userInfo = {
			firstName: values.firstName || undefined,
			lastName: values.lastName || undefined,
			email: values.email || undefined,
			phoneNumber: values.phoneNumber || undefined,
			seller: values.seller,
		};
		updateUser(
			{
				userId: user._id,
			},
			{
				token: token,
			},
			userInfo
		).then((data) => {
			if (data && data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				console.log(data);
				editUser(data);
				closeDialog();
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
				<DialogTitle id="">Update User</DialogTitle>
				<IconButton onClick={() => closeDialog()}>
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
									margin="normal"
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
									margin="normal"
								/>
							</Grid>
							<Grid item xs={12}>
								<Typography
									variant="subtitle1"
									className={classes.subheading}
								>
									Seller Account
								</Typography>
								<FormControlLabel
									control={
										<Switch
											checked={values.seller}
											onChange={handleCheck}
										/>
									}
									label={
										values.seller ? "Active" : "Inactive"
									}
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
								"Update User"
							)}
						</Button>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default UpdateUser;
