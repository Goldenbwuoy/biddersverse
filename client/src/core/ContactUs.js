import {
	Card,
	IconButton,
	makeStyles,
	TextField,
	Dialog,
	DialogTitle,
	Button,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import EmailIcon from "@material-ui/icons/Email";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
	openButton: {
		color: "#fff",
		textTransform: "capitalize",
		justifyContent: "flex-start",
		paddingLeft: 0,
	},
	card: {
		padding: 10,
	},
}));

function ContactUs() {
	const classes = useStyles();
	const [openContact, setOpenContacts] = useState(false);
	return (
		<>
			<Button
				className={classes.openButton}
				onClick={() => setOpenContacts(true)}
			>
				Contact Us
			</Button>
			<Dialog
				fullWidth={true}
				maxWidth={"sm"}
				open={openContact}
				aria-labelledby=""
			>
				<div className="chat__header">
					<DialogTitle id="">
						<h4 className="chat__header-title">Contact Us</h4>
					</DialogTitle>
					<IconButton
						onClick={() => setOpenContacts(false)}
						color="secondary"
					>
						<CloseIcon />
					</IconButton>
				</div>
				<Card className={classes.card}>
					<TextField
						id="name"
						label="First Name"
						// className={classes.textField}
						// value={values.itemName}
						// onChange={handleChange("itemName")}
						margin="normal"
						variant="outlined"
						fullWidth
						required
					/>
					<TextField
						id="name"
						label="Last Name"
						// className={classes.textField}
						// value={values.itemName}
						// onChange={handleChange("itemName")}
						margin="normal"
						variant="outlined"
						fullWidth
						required
					/>
					<TextField
						id="name"
						label="Email Name"
						// className={classes.textField}
						// value={values.itemName}
						// onChange={handleChange("itemName")}
						margin="normal"
						variant="outlined"
						fullWidth
						required
					/>

					<br />
					<TextField
						id="description"
						label="Message"
						multiline
						rows="4"
						// value={values.description}
						// onChange={handleChange("description")}
						// className={classes.textField}
						margin="normal"
						variant="outlined"
						fullWidth
						required
					/>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						startIcon={<EmailIcon />}
					>
						Send
					</Button>
				</Card>
			</Dialog>
		</>
	);
}

export default ContactUs;
