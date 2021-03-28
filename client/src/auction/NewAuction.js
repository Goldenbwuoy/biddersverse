import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import AddPhoto from "@material-ui/icons/AddPhotoAlternate";
import auth from "../auth/auth-helper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { create } from "./api-auction";
import { MenuItem, Select } from "@material-ui/core";
import { listCategories } from "../category/api-category";
import { getDateString } from "../helpers/auction-helper";
import FileUpload from "./FileUpload";

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
		fontSize: "1em",
	},
	uploadPhotoSection: {
		marginLeft: theme.spacing(7),
		marginRight: theme.spacing(7),
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 450,
	},
	submit: {
		margin: "auto",
		marginBottom: theme.spacing(2),
	},
	select: {
		marginTop: 25,
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 450,
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
	const { user, token } = auth.isAuthenticated();
	const [categories, setCategories] = useState([]);
	const currentDate = new Date();
	const defaultStartTime = getDateString(currentDate);
	const defaultEndTime = getDateString(
		new Date(currentDate.setHours(currentDate.getHours() + 1))
	);
	const [images, setImages] = useState([]);

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
		<div>
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
					<div className={classes.uploadPhotoSection}>
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
					/>
					<br />
					<Select
						id="device"
						variant="filled"
						// disableUnderline
						className={classes.select}
						value={values.category}
						onChange={handleChange("category")}
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
					/>
					<br /> <br />
					{values.error && (
						<Typography component="p" color="error">
							<Icon color="error" className={classes.error}>
								error
							</Icon>
							{values.error}
						</Typography>
					)}
				</CardContent>
				<CardActions>
					<Button
						color="primary"
						variant="contained"
						onClick={clickSubmit}
						className={classes.submit}
					>
						Submit
					</Button>
					<Link to="/myauctions" className={classes.submit}>
						<Button variant="contained">Cancel</Button>
					</Link>
				</CardActions>
			</Card>
		</div>
	);
}

export default NewAuction;
