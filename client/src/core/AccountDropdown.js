import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Dropdown.css";

const MenuItems = [
	{
		title: "View Profile",
		path: "/",
		cName: "dropdown-link",
	},
	{
		title: "Edit Profile",
		path: "/",
		cName: "dropdown-link",
	},
	{
		title: "Reset Password",
		path: "/",
		cName: "dropdown-link",
	},
	{
		title: "Sign Out",
		path: "/",
		cName: "dropdown-link",
	},
];

function AccountDropdown() {
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);
	return (
		<>
			<ul
				onClick={handleClick}
				className={click ? "dropdown-menu clicked" : "dropdown-menu"}
			>
				{MenuItems.map((item, index) => {
					return (
						<li key={index}>
							<Link
								className={item.cName}
								to={item.path}
								onClick={() => setClick(false)}
							>
								{item.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default AccountDropdown;
