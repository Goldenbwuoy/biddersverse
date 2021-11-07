import React, { useState, useEffect } from "react";
import auth from "../../auth/auth-helper";
import { makeStyles } from "@material-ui/core/styles";
import {
	MenuItem,
	Select,
	Dialog,
	DialogContent,
	DialogTitle,
	CircularProgress,
	Grid,
	IconButton,
	Button,
	TextField,
	Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import { listCategories } from "../../category/api-category";
import { getDateString } from "../../helpers/auction-helper";
import { updateAuction } from "../api-admin";

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

function UpdateAuction({ open, setOpen, auction, editAuction }) {
	const classes = useStyles();
	const { token } = auth.isAdminAuthenticated();
	const [categories, setCategories] = useState([]);
	const [values, setValues] = useState({
		itemName: "",
		category: "",
		description: "",
		bidStart: "",
		bidEnd: "",
		startingBid: 0,
		error: "",
		loading: false,
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
		setValues({
			itemName: auction?.itemName,
			category: auction.category?._id,
			description: auction?.description,
			bidStart: getDateString(new Date(auction?.bidStart)),
			bidEnd: getDateString(new Date(auction?.bidEnd)),
			startingBid: auction?.startingBid,
			error: "",
			loading: false,
		});
	}, [auction]);

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const closeDialog = () => {
		setValues({ ...values, loading: false, error: "" });
		setOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let auctionData = new FormData();
		values.itemName && auctionData.append("itemName", values.itemName);
		values.category && auctionData.append("category", values.category);
		values.description &&
			auctionData.append("description", values.description);
		values.bidStart && auctionData.append("bidStart", values.bidStart);
		values.bidEnd && auctionData.append("bidEnd", values.bidEnd);
		values.startingBid &&
			auctionData.append("startingBid", values.startingBid);

		updateAuction(
			{ auctionId: auction._id },
			{ token: token },
			auctionData
		).then((data) => {
			if (data && data.error) {
				setValues({ ...values, loading: false, error: data.error });
			} else {
				editAuction(data);
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
				<DialogTitle id="">Update Auction</DialogTitle>
				<IconButton onClick={() => closeDialog()}>
					<CloseIcon />
				</IconButton>
			</div>

			<DialogContent>
				<div className={classes.paper}>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									id="name"
									label="Item Name"
									variant="outlined"
									required
									fullWidth
									value={values.itemName}
									onChange={handleChange("itemName")}
									margin="normal"
								/>
							</Grid>

							<Grid item xs={12}>
								<Select
									id="device"
									variant="filled"
									required
									fullWidth
									value={values.category}
									onChange={handleChange("category")}
									margin="normal"
								>
									{categories.map((category) => (
										<MenuItem
											key={category._id}
											value={category._id}
										>
											{category.categoryName}
										</MenuItem>
									))}
								</Select>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="multiline-flexible"
									label="Description"
									required
									fullWidth
									multiline
									rows="4"
									variant="outlined"
									value={values.description}
									onChange={handleChange("description")}
									margin="normal"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="startingBid"
									type="number"
									variant="outlined"
									required
									fullWidth
									label="Starting Bid ($)"
									value={values.startingBid}
									onChange={handleChange("startingBid")}
									margin="normal"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="datetime-local"
									variant="outlined"
									label="Auction Start Time"
									type="datetime-local"
									required
									fullWidth
									value={values.bidStart}
									onChange={handleChange("bidStart")}
									InputLabelProps={{
										shrink: true,
									}}
									margin="normal"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="datetime-local"
									label="Auction End Time"
									variant="outlined"
									type="datetime-local"
									required
									fullWidth
									value={values.bidEnd}
									onChange={handleChange("bidEnd")}
									InputLabelProps={{
										shrink: true,
									}}
									margin="normal"
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
									"Update Listing"
								)}
							</Button>
						</Grid>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default UpdateAuction;
