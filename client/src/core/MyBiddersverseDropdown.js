import React, { useState } from "react";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import "./styles/Dropdown.css";

function MyBiddersverseDropdown() {
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
				<li>
					<Link
						className="dropdown-link"
						to="/auctions/all/bids"
						onClick={() => setClick(false)}
					>
						My Bids
					</Link>
				</li>
				{auth.isAuthenticated().user.seller && (
					<li>
						<Link
							className="dropdown-link"
							to="/auctions/all/by-seller"
							onClick={() => setClick(false)}
						>
							My Auctions
						</Link>
					</li>
				)}
			</ul>
		</>
	);
}

export default MyBiddersverseDropdown;
