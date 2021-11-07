import React, { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, useHistory } from "react-router-dom";
import { create } from "./api-auction";
import {
	MenuItem,
	Select,
	Card,
	CardActions,
	CardContent,
	Button,
	TextField,
	Typography,
	Icon,
} from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import { listCategories } from "../category/api-category";
import { getDateString } from "../helpers/auction-helper";
import FileUpload from "./FileUpload";

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: theme.spacing(4),
	},
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
		fontSize: "1em",
	},

	submit: {
		margin: "auto",
		marginBottom: theme.spacing(2),
		textDecoration: "none",
	},

	input: {
		display: "none",
	},
	filename: {
		marginLeft: "10px",
	},
}));

function NewAuction() {
	const classes = useStyles();
	const history = useHistory();
	const { user, token } = auth.isAuthenticated();
	const [categories, setCategories] = useState([]);
	const currentDate = new Date();
	const defaultStartTime = getDateString(currentDate);
	const defaultEndTime = getDateString(
		new Date(currentDate.setHours(currentDate.getHours() + 1))
	);
	const [images, setImages] = useState([]);

	console.log(history);

	const [values, setValues] = useState({
		itemName: "",
		category: "none",
		description: "",
		bidStart: defaultStartTime,
		bidEnd: defaultEndTime,
		startingBid: 0,
		redirect: false,
		error: "",
	});

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		listCategories(signal).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setCategories(data);
			}
		});
	}, []);

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const updateImages = (newImages) => {
		setImages(newImages);
	};

	const clickSubmit = () => {
		if (values.bidEnd < values.bidStart) {
			setValues({
				...values,
				error: "Auction cannot end before it starts",
			});
		} else {
			let auctionData = {
				itemName: values.itemName || undefined,
				category:
					values.category !== "none" ? values.category : undefined,
				images: images.length !== 0 ? images : undefined,
				description: values.description || undefined,
				startingBid: values.startingBid || undefined,
				bidStart: values.bidStart || undefined,
				bidEnd: values.bidEnd || undefined,
			};

			create(
				{
					userId: user._id,
				},
				{
					token: token,
				},
				auctionData
			).then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({ ...values, error: "", redirect: true });
				}
			});
		}
	};

	if (values.redirect) {
		return <Redirect to={"/auctions/all/by-seller"} />;
	}

	return (
		<div className={classes.root}>
			<Card className={classes.card}>
				<CardContent>
					<Typography
						type="headline"
						component="h2"
						className={classes.title}
					>
						New Auction
					</Typography>
					<br />
					<div>
						<FileUpload updateImages={updateImages} />
					</div>
					<br />
					<TextField
						id="name"
						label="Item Name"
						className={classes.textField}
						value={values.itemName}
						onChange={handleChange("itemName")}
						margin="normal"
						variant="outlined"
						fullWidth
						required
					/>
					<br />
					<Select
						id="device"
						variant="filled"
						// disableUnderline
						value={values.category}
						onChange={handleChange("category")}
						fullWidth
						required
					>
						<MenuItem value="none" disabled>
							Select Category
						</MenuItem>
						{categories.map((category) => (
							<MenuItem key={category._id} value={category._id}>
								{category.categoryName}
							</MenuItem>
						))}
					</Select>
					<br />
					<TextField
						id="description"
						label="Description"
						multiline
						rows="4"
						value={values.description}
						onChange={handleChange("description")}
						className={classes.textField}
						margin="normal"
						variant="outlined"
						fullWidth
						required
					/>
					<br />
					<TextField
						id="startingBid"
						type="number"
						label="Starting Bid ($)"
						className={classes.textField}
						value={values.startingBid}
						onChange={handleChange("startingBid")}
						margin="normal"
						variant="outlined"
						fullWidth
						required
					/>
					<br />
					<br />
					<TextField
						id="datetime-local"
						label="Auction Start Time"
						type="datetime-local"
						defaultValue={defaultStartTime}
						className={classes.textField}
						onChange={handleChange("bidStart")}
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						fullWidth
						required
					/>
					<br />
					<br />
					<TextField
						id="datetime-local"
						label="Auction End Time"
						type="datetime-local"
						defaultValue={defaultEndTime}
						className={classes.textField}
						onChange={handleChange("bidEnd")}
						InputLabelProps={{
							shrink: true,
						}}
						variant="outlined"
						fullWidth
						required
					/>
					<br /> <br />
					{values.error && (
						<Typography
							style={{ display: "flex", alignItems: "center" }}
							color="error"
						>
							<Icon color="error" className={classes.error}>
								<ErrorIcon />
							</Icon>
							{values.error}
						</Typography>
					)}
				</CardContent>
				<CardActions>
					<Button
						className={classes.submit}
						variant="contained"
						color="secondary"
						onClick={() => history.goBack()}
					>
						Cancel
					</Button>

					<Button
						color="primary"
						variant="contained"
						onClick={clickSubmit}
						className={classes.submit}
					>
						Submit
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}

export default NewAuction;
