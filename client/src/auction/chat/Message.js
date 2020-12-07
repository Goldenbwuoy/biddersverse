import React from "react";
import auth from "../../auth/auth-helper";
import moment from "moment";

import "./Message.css";

const Message = ({ message, seller }) => {
  console.log(message.sender);
  console.log(seller._id);
  return auth.isAuthenticated().user?._id === message.sender ? (
    <div className="messageContainer justifyEnd">
      <div className="messageBox your-message backgroundBlue">
        <p className="messageText colorWhite">{message.message}</p>
        <span className="time">{moment(message.time).fromNow()}</span>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox other-message backgroundLight">
        <span></span>
        <p className="name">
          {message.sender === seller._id ? (
            <span className="seller-title">Seller</span>
          ) : (
            <span className="title">{message.sender}</span>
          )}{" "}
        </p>
        <span className="messageText colorDark">{message.message}</span>
        <span className="time">{moment(message.time).fromNow()}</span>
      </div>
    </div>
  );
};

export default Message;
