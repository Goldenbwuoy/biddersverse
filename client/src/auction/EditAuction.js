import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import auth from "../auth/auth-helper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { Avatar, MenuItem, Select } from "@material-ui/core";
import { listCategories } from "../category/api-category";
import { read, updateAuction } from "./api-auction";
import { getAuctionImage, getDateString } from "../helpers/auction-helper";

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
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "80%",
	},
	submit: {
		margin: "auto",
		marginBottom: theme.spacing(2),
	},
	select: {
		marginTop: 15,
		marginBottom: 15,
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "80%",
	},
	input: {
		display: "none",
	},
	filename: {
		marginLeft: "10px",
	},
	bigAvatar: {
		width: 60,
		height: 60,
		margin: "auto",
	},
}));

function EditAuction({ match }) {
	const classes = useStyles();
	const { token } = auth.isAuthenticated();
	const [categories, setCategories] = useState([]);
	const [redirectToAuction, setRedirectToAuction] = useState(false);
	const [auction, setAuction] = useState({
		itemName: "",
		category: "",
		description: "",
		image: "",
		bidStart: "",
		bidEnd: "",
		startingBid: 0,
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

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		read({ auctionId: match.params.auctionId }, signal).then((data) => {
			if (data.error) {
				// setError(data.error);
			} else {
				data.bidEnd = getDateString(new Date(data.bidEnd));
				data.bidStart = getDateString(new Date(data.bidStart));
				setAuction(data);
			}
		});

		return function cleanup() {
			abortController.abort();
		};
	}, [match.params.auctionId]);

	const handleChange = (name) => (event) => {
		const value =
			name === "image" ? event.target.files[0] : event.target.value;
		setAuction({ ...auction, [name]: value });
	};

	const handleSubmit = () => {
		let auctionData = new FormData();
		auction.itemName && auctionData.append("itemName", auction.itemName);
		auction.category && auctionData.append("category", auction.category);
		auction.description &&
			auctionData.append("description", auction.description);
		auction.image && auctionData.append("image", auction.image);
		auction.bidStart && auctionData.append("bidStart", auction.bidStart);
		auction.bidEnd && auctionData.append("bidEnd", auction.bidEnd);
		auction.startingBid &&
			auctionData.append("startingBid", auction.startingBid);

		updateAuction(
			{ auctionId: auction._id },
			{ token: token },
			auctionData
		).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				console.log("auction updated");
				setRedirectToAuction(true);
			}
		});
	};

	if (redirectToAuction) {
		return <Redirect to={`/auction/${auction._id}`} />;
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
						Update Auction
					</Typography>
					<br />
					<TextField
						id="name"
						label="Item Name"
						variant="outlined"
						className={classes.textField}
						value={auction.itemName}
						onChange={handleChange("itemName")}
						margin="normal"
					/>
					<br />
					<Select
						id="device"
						variant="filled"
						// disableUnderline
						className={classes.select}
						value={auction.category}
						onChange={handleChange("category")}
						margin="normal"
					>
						{categories.map((category) => (
							<MenuItem key={category._id} value={category._id}>
								{category.categoryName}
							</MenuItem>
						))}
					</Select>
					<br />
					<TextField
						id="multiline-flexible"
						label="Description"
						multiline
						rows="4"
						variant="outlined"
						value={auction.description}
						onChange={handleChange("description")}
						className={classes.textField}
						margin="normal"
					/>
					<br />
					<TextField
						id="startingBid"
						type="number"
						variant="outlined"
						label="Starting Bid ($)"
						className={classes.textField}
						value={auction.startingBid}
						onChange={handleChange("startingBid")}
						margin="normal"
					/>
					<br />
					<br />
					<TextField
						id="datetime-local"
						variant="outlined"
						label="Auction Start Time"
						type="datetime-local"
						value={auction.bidStart}
						className={classes.textField}
						onChange={handleChange("bidStart")}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br />
					<br />
					<TextField
						id="datetime-local"
						label="Auction End Time"
						variant="outlined"
						type="datetime-local"
						value={auction.bidEnd}
						className={classes.textField}
						onChange={handleChange("bidEnd")}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<br /> <br />
					{/* {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )} */}
				</CardContent>
				<CardActions>
					<Button
						color="primary"
						variant="contained"
						onClick={handleSubmit}
						className={classes.submit}
					>
						Update
					</Button>
					<Link to="/myauctions" className={classes.submit}>
						<Button variant="contained">Cancel</Button>
					</Link>
				</CardActions>
			</Card>
		</div>
	);
}

export default EditAuction;
