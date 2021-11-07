import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Dropdown.css";

const MenuItems = [
	{
		title: "Marketing",
		path: "/",
		cName: "dropdown-link",
	},
	{
		title: "Consulting",
		path: "/",
		cName: "dropdown-link",
	},
	{
		title: "Design",
		path: "/",
		cName: "dropdown-link",
	},
	{
		title: "Development",
		path: "/",
		cName: "dropdown-link",
	},
];

function DropDown({ categories }) {
	const [click, setClick] = useState(false);

	const handleClick = () => setClick(!click);
	return (
		<>
			<ul
				onClick={handleClick}
				className={click ? "dropdown-menu clicked" : "dropdown-menu"}
			>
				{categories.map((category, index) => {
					return (
						<li key={category._id}>
							<Link
								className="dropdown-link"
								to={{
									pathname: `/auctions/categories/${category._id}`,
									state: {
										title: category.categoryName,
									},
								}}
								onClick={() => setClick(false)}
							>
								{category.categoryName}
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default DropDown;
