import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
	Button,
	CssBaseline,
	TextField,
	Typography,
	Container,
	CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { resetPassword } from "./api-user";
import auth from "../auth/auth-helper";

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
}));

function UpdatePassword({ match }) {
	const classes = useStyles();
	const history = useHistory();
	const { token } = auth.isAuthenticated();
	const [values, setValues] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
		error: "",
		loading: false,
		redirectBack: false,
	});
	console.log(history);

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true, error: "" });
		const passwordInfo = {
			userId: match.params.userId,
			oldPassword: values.oldPassword || undefined,
			newPassword: values.newPassword || undefined,
			confirmPassword: values.confirmPassword || undefined,
		};

		resetPassword({ token: token }, passwordInfo).then((data) => {
			console.log(data);
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					loading: false,
					error: "",
					redirectBack: true,
				});
			}
		});
	};

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const { redirectBack } = values;
	if (redirectBack) {
		history.goBack();
	}

	return (
		<Container className={classes.root} component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Reset Password
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
						name="oldPassword"
						label="Old Password"
						type="password"
						id="old-password"
						autoComplete="current-password"
						value={values.oldPassword}
						onChange={handleChange("oldPassword")}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="newPassword"
						label="New Password"
						type="password"
						id="new-password"
						autoComplete="current-password"
						value={values.newPassword}
						onChange={handleChange("newPassword")}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="confirmPassword"
						label="Confirm Password"
						type="password"
						id="confirm-password"
						autoComplete="current-password"
						value={values.confirmPassword}
						onChange={handleChange("confirmPassword")}
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
							"Reset"
						)}
					</Button>
				</form>
			</div>
		</Container>
	);
}

export default UpdatePassword;
