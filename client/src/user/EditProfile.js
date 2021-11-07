import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import auth from "./../auth/auth-helper";
import { read, update } from "./api-user.js";
import { Redirect } from "react-router-dom";
import {
	CircularProgress,
	Container,
	FormControlLabel,
	Grid,
	Switch,
} from "@material-ui/core";
import {
	CountryDropdown,
	RegionDropdown,
	CountryRegionData,
} from "react-country-region-selector";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100vh",
		marginBottom: 15,
	},
	card: {
		margin: "auto",
		marginTop: theme.spacing(5),
		padding: theme.spacing(2),
		width: "100%",
	},
	title: {
		margintop: theme.spacing(4),
		marginBottom: theme.spacing(2),
		color: theme.palette.primary,
	},
	error: {
		verticalAlign: "middle",
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "80%",
	},
	input: {
		display: "none",
	},
	submit: {
		margin: `${theme.spacing(4)} 0`,
	},

	subheading: {
		marginTop: theme.spacing(2),
		color: theme.palette.openTitle,
	},
}));

function EditProfile({ match }) {
	const classes = useStyles();
	const [values, setValues] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phoneNumber: "",
		street: "",
		city: "",
		zipcode: "",
		country: "",
		seller: false,
		error: "",
		redirectToProfile: false,
	});
	const jwt = auth.isAuthenticated();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		read(
			{
				userId: match.params.userId,
			},
			{ token: jwt.token },
			signal
		).then((data) => {
			if (data && data.error) {
				setValues({ ...values, error: data.error });
			} else {
				console.log(data);
				setValues({
					...values,
					firstName: data.firstName,
					lastName: data.lastName,
					email: data.email,
					phoneNumber: data.phoneNumber,
					seller: data.seller,
					street: data.address?.street,
					city: data.address?.city,
					zipcode: data.address?.zipcode,
					country: data.address?.country,
				});
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.userId, jwt.token]);

	const clickSubmit = (event) => {
		event.preventDefault();
		const user = {
			firstName: values.firstName || undefined,
			lastName: values.lastName || undefined,
			email: values.email || undefined,
			phoneNumber: values.phoneNumber,
			seller: values.seller || undefined,
			address: {
				street: values.street || undefined,
				city: values.city || undefined,
				zipcode: values.zipcode || undefined,
				country: values.country || undefined,
			},
		};
		update(
			{
				userId: match.params.userId,
			},
			{
				token: jwt.token,
			},
			user
		).then((data) => {
			if (data && data.error) {
				setValues({ ...values, error: data.error });
			} else {
				auth.updateUser(data, () => {
					setValues({
						...values,
						userId: data._id,
						redirectToProfile: true,
					});
				});
			}
		});
	};
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const handleCheck = (event, checked) => {
		setValues({ ...values, seller: checked });
	};

	if (values.redirectToProfile) {
		return <Redirect to={"/user/" + values.userId} />;
	}
	return (
		<Container className={classes.root} component="main" maxWidth="sm">
			<Card className={classes.card}>
				<div className={classes.paper}>
					<form
						onSubmit={clickSubmit}
						className={classes.form}
						noValidate
					>
						<Typography variant="h6" className={classes.title}>
							Edit Profile
						</Typography>
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
									Address
								</Typography>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="street"
									label="Street"
									name="street"
									value={values.street}
									onChange={handleChange("street")}
									margin="normal"
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="city"
									variant="outlined"
									required
									fullWidth
									id="city"
									label="City"
									autoFocus
									value={values.city}
									onChange={handleChange("city")}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="zipcode"
									variant="outlined"
									required
									fullWidth
									id="zipcode"
									label="Zip Code"
									autoFocus
									value={values.zipcode}
									onChange={handleChange("zipcode")}
								/>
							</Grid>
							<Grid item xs={12}>
								<CountryDropdown
									value={values.country}
									onChange={(val) =>
										setValues({ ...values, country: val })
									}
									style={{
										height: 60,
										width: "100%",
										marginTop: 10,
									}}
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
								"Update Profile"
							)}
						</Button>
					</form>
				</div>
			</Card>
		</Container>
	);
}

export default EditProfile;
