import React, { useEffect, useState } from "react";
import auth from "../../auth/auth-helper";

import "./Message.css";

const Message = ({ message }) => {
  const [isSender, setIsSender] = useState(false);

  useEffect(() => {
    auth.isAuthenticated().user._id === message.sender && setIsSender(true);
  }, [message]);

  return isSender ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">sender</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{message.message}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message.message}</p>
      </div>
      <p className="sentText pl-10 ">sender</p>
    </div>
  );
};

export default Message;
