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
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import SocketIOClient from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import auth from "../../auth/auth-helper";
import Message from "./Message";
const endpoint = "http://127.0.0.1:5000";

const useStyles = makeStyles((theme) => ({
	rightIcon: {
		marginLeft: "12px",
	},
	toggleChatsButton: {
		marginTop: "25px",
		textTransform: "capitalize",
	},
}));

let socket;

function Chat({ auction, openChats, setOpenChats }) {
	const classes = useStyles();
	const { user } = auth.isAuthenticated();
	const [text, setText] = useState("");
	const [chatMessages, setChatMessages] = useState([]);

	useEffect(() => {
		setChatMessages(auction.messages);
		socket = SocketIOClient(endpoint);
		socket.emit("join auction room", { room: auction._id });
		return () => {
			socket.emit("leave auction room", {
				room: auction._id,
			});
		};
	}, [auction]);

	useEffect(() => {
		socket.on("new message", (payload) => {
			console.log(payload);
			setChatMessages(payload);
		});

		return () => {
			socket.off("new message");
		};
	});

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const toggleChats = () => {
		setOpenChats(!openChats);
	};

	const sendMessage = (e) => {
		e.preventDefault();
		let newMessage = {
			message: text,
			time: new Date(),
			sender: user,
		};
		socket.emit("new message", {
			room: auction._id,
			messageInfo: newMessage,
		});
		setText("");
	};

	const keyPressed = (event) => {
		if (event.charCode === 13 && text) {
			sendMessage(event);
		}
	};

	return (
		<>
			<Button
				className={classes.toggleChatsButton}
				color="primary"
				variant="contained"
				onClick={toggleChats}
			>
				Chat Messages ({chatMessages?.length}){" "}
				{openChats ? (
					<ExpandLess className={classes.rightIcon} />
				) : (
					<ExpandMore className={classes.rightIcon} />
				)}
			</Button>
			<Dialog
				fullWidth={true}
				maxWidth={"md"}
				open={openChats}
				aria-labelledby=""
			>
				<div className="chat__header">
					<DialogTitle id="">
						<h4 className="chat__header-title">
							Auction Chat{" "}
							<span className="chatHeader__item">
								({auction.itemName})
							</span>
						</h4>
					</DialogTitle>
					<IconButton
						onClick={() => setOpenChats(false)}
						color="secondary"
					>
						<CloseIcon />
					</IconButton>
				</div>
				<Card className="chat">
					<ScrollToBottom className="chat__messages">
						{chatMessages &&
							chatMessages.map((message) => (
								<Message
									key={message._id}
									message={message}
									seller={auction.seller}
								/>
							))}
					</ScrollToBottom>

					<form
						className="chat__form"
						style={{ bottom: 0 }}
						onSubmit={sendMessage}
					>
						<TextField
							id="message"
							type="text"
							variant="filled"
							InputProps={{ disableUnderline: true }}
							className="chatForm__input"
							value={text}
							onChange={handleChange}
							multiline
							rows="4"
							onKeyPress={keyPressed}
						/>
						<IconButton
							disabled={!text}
							type="submit"
							color="primary"
							variant="contained"
						></IconButton>
					</form>
				</Card>
			</Dialog>
		</>
	);
}

export default Chat;
