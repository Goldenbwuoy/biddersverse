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
} from "@material-ui/core";
import auth from "../../auth/auth-helper";
import { updateCategory } from "../api-admin";

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
		width: 450,
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

function UpdateCategory({ open, setOpen, category, editCategory }) {
	const { token } = auth.isAdminAuthenticated();
	const classes = useStyles();
	const [values, setValues] = useState({
		categoryName: "",
		loading: false,
		error: "",
	});

	useEffect(() => {
		setValues({
			categoryName: category?.categoryName,
			loading: false,
			error: "",
		});
	}, [category]);

	const closeDialog = () => {
		setValues({
			categoryName: "",
			loading: false,
			error: "",
		});
		setOpen(false);
	};

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, loading: true });
		const categoryInfo = {
			categoryName: values.categoryName,
		};

		updateCategory(
			{ categoryId: category._id },
			{ token: token },
			categoryInfo
		).then((data) => {
			if (data && data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				editCategory(data);
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
				<DialogTitle id="">Update Category</DialogTitle>
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
							<Grid item xs={12}>
								<TextField
									autoComplete="fname"
									name="categoryName"
									variant="outlined"
									required
									fullWidth
									id="categoryName"
									label="Category Name"
									autoFocus
									value={values.categoryName}
									onChange={(event) =>
										setValues({
											...values,
											categoryName: event.target.value,
										})
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
								"Update Category"
							)}
						</Button>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default UpdateCategory;
