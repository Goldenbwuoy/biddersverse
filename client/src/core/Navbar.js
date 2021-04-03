import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "./Button";
import CategoryDropdown from "./Dropdown";
import "./styles/Navbar.css";
import AccountDropdown from "./AccountDropdown";

function Navbar() {
	const [click, setClick] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const [profileDropdown, setProfileDropdown] = useState(false);

	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const onMouseEnter = () =>
		window.innerWidth < 960 ? setDropdown(false) : setDropdown(true);
	const onMouseLeave = () =>
		window.innerWidth < 960 ? setDropdown(false) : setDropdown(false);

	const onMouseEnterProfile = () =>
		window.innerWidth < 960
			? setProfileDropdown(false)
			: setProfileDropdown(true);
	const onMouseLeaveProfile = () =>
		window.innerWidth < 960
			? setProfileDropdown(false)
			: setProfileDropdown(false);

	return (
		<>
			<nav className="navbar">
				<Link to="/" className="nav-links">
					<p>Biddersverse</p>
				</Link>
				<div className="menu-icon" onClick={handleClick}>
					<i className={click ? "fas fa-times" : "fas fa-bars"} />
					{click ? (
						<ClearIcon style={{ color: "white" }} />
					) : (
						<MenuIcon style={{ color: "white" }} />
					)}
				</div>
				<ul className={click ? "nav-menu active" : "nav-menu"}>
					<li className="nav-item">
						<Link
							to="/"
							className="nav-links"
							onClick={closeMobileMenu}
						>
							My Biddersverse
						</Link>
					</li>
					<li
						className="nav-item"
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
					>
						<Link
							to="/"
							className="nav-links dropdown"
							onClick={closeMobileMenu}
						>
							Auctions By Category <ArrowDropDownIcon />
						</Link>
						{dropdown && <CategoryDropdown />}
					</li>
					<li
						className="nav-item"
						onMouseEnter={onMouseEnterProfile}
						onMouseLeave={onMouseLeaveProfile}
					>
						<Link
							to="/"
							className="nav-links dropdown"
							onClick={closeMobileMenu}
						>
							<AccountCircleIcon /> <ArrowDropDownIcon />
						</Link>
						{profileDropdown && <AccountDropdown />}
					</li>
					<li className="nav-item">
						<Link
							to="/"
							className="nav-links-mobile"
							onClick={closeMobileMenu}
						>
							sign Up
						</Link>
					</li>
				</ul>
				<Button text="Sign In" />
			</nav>
		</>
	);
}

export default withRouter(Navbar);
