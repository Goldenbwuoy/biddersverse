import { Card, IconButton, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import SocketIOClient from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import auth from "../../auth/auth-helper";
import Message from "./Message";
const endpoint = "http://127.0.0.1:5000";

let socket;

function Chat({ auction, updateBids }) {
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

  console.log(chatMessages);
  return (
    <Card className="chat">
      <div className="chat__header">
        <h3>
          Auction Chat{" "}
          <span className="chatHeader__item">({auction.itemName})</span>
        </h3>
      </div>
      <ScrollToBottom className="chat__messages">
        {chatMessages &&
          chatMessages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
      </ScrollToBottom>

      <form className="chat__form" style={{ bottom: 0 }} onSubmit={sendMessage}>
        <TextField
          id="message"
          type="text"
          label="Enter a Message"
          className="chatForm__input"
          value={text}
          onChange={handleChange}
        />
        <IconButton type="submit" color="primary" variant="contained">
          <SendIcon />
        </IconButton>
      </form>
    </Card>
  );
}

export default Chat;
