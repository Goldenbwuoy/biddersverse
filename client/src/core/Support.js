import {
	Card,
	IconButton,
	makeStyles,
	TextField,
	Dialog,
	DialogTitle,
	Button,
	Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
	openButton: {
		color: "#fff",
		textTransform: "capitalize",
		justifyContent: "flex-start",
		paddingLeft: 0,
	},
	card: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
	image: {
		width: 200,
		objectFit: "contain",
	},
}));

function SupportUs() {
	const classes = useStyles();
	const [openSupport, setOpenSupport] = useState(false);
	return (
		<>
			<Button
				className={classes.openButton}
				onClick={() => setOpenSupport(true)}
			>
				Support Us
			</Button>
			<Dialog
				fullWidth={true}
				maxWidth={"sm"}
				open={openSupport}
				aria-labelledby=""
			>
				<div className="chat__header">
					<DialogTitle id="">
						<h4 className="chat__header-title">
							Scan the QR code and Support This Project
						</h4>
					</DialogTitle>
					<IconButton
						onClick={() => setOpenSupport(false)}
						color="secondary"
					>
						<CloseIcon />
					</IconButton>
				</div>
				<Card className={classes.card}>
					<img
						style={{ marginTop: 100 }}
						className={classes.image}
						src="/images/wechat-support.jpg"
						alt=""
					/>
					<img
						className={classes.image}
						src="/images/alipay-support.jpg"
						alt=""
					/>
				</Card>
			</Dialog>
		</>
	);
}

export default SupportUs;
