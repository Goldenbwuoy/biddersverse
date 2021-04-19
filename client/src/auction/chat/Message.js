import React from "react";
import auth from "../../auth/auth-helper";
import moment from "moment";

import "./Message.css";
import maskIds from "../../helpers/user-helper";

const Message = ({ message, seller }) => {
	return auth.isAuthenticated().user?._id === message.sender ? (
		<div className="messageContainer justifyEnd">
			<div className="messageInfo justifyEnd">
				<div className="messageBox your-message backgroundBlue">
					<p className="messageText colorWhite">{message.message}</p>
				</div>
				<span className="time timeEnd">
					{moment(message.time).fromNow()}
				</span>
			</div>
		</div>
	) : (
		<div className="messageContainer justifyStart">
			<div className="messageInfo">
				<div className="messageBox other-message backgroundLight">
					<p className="name">
						{message.sender === seller._id ? (
							<span className="seller-title">Seller</span>
						) : (
							<span className="title">
								{maskIds(message.sender)}
							</span>
						)}{" "}
					</p>
					<span className="messageText colorDark">
						{message.message}
					</span>
				</div>
				<span className="time">{moment(message.time).fromNow()}</span>
			</div>
		</div>
	);
};

export default Message;
