import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import auth from "../auth/auth-helper";
import "./styles/Dropdown.css";

const MenuItems = [
	{
		title: "View Profile",
		path: "/user/",
		cName: "dropdown-link",
	},
	{
		title: "Edit Profile",
		path: "/user/edit/",
		cName: "dropdown-link",
	},
	{
		title: "Reset Password",
		path: "/",
		cName: "dropdown-link",
	},
];

function AccountDropdown({ history }) {
	const { user } = auth.isAuthenticated();
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);
	return (
		<>
			<ul
				onClick={handleClick}
				className={
					click
						? "dropdown-menu account clicked"
						: "dropdown-menu account"
				}
			>
				{MenuItems.map((item, index) => {
					return (
						<li key={index}>
							<Link
								className={item.cName}
								to={item.path + user._id}
								onClick={() => setClick(false)}
							>
								{item.title}
							</Link>
						</li>
					);
				})}
				<li>
					<button
						className="logout-button"
						onClick={() => {
							auth.clearJWT(() => history.push("/"));
						}}
					>
						Sign Out
					</button>
				</li>
			</ul>
		</>
	);
}

export default withRouter(AccountDropdown);
