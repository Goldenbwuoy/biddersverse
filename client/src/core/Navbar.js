import React, { useEffect, useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Button from "./Button";
import CategoryDropdown from "./Dropdown";
import "./styles/Navbar.css";
import AccountDropdown from "./AccountDropdown";
import { listCategories } from "../category/api-category";
import auth from "../auth/auth-helper";
import MyBiddersverseDropdown from "./MyBiddersverseDropdown";

function Navbar() {
	const history = useHistory();
	const [click, setClick] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const [profileDropdown, setProfileDropdown] = useState(false);
	const [myBiddersverseDropdown, setMyBiddersverseDropdown] = useState(false);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		listCategories(signal).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setCategories(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, []);

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

	const onMouseEnterMybiddersverse = () =>
		window.innerWidth < 960
			? setMyBiddersverseDropdown(false)
			: setMyBiddersverseDropdown(true);
	const onMouseLeaveMybiddersverse = () =>
		window.innerWidth < 960
			? setMyBiddersverseDropdown(false)
			: setMyBiddersverseDropdown(false);

	return (
		<>
			<nav className="navbar">
				<Link to="/" className="nav-logo">
					<img className="logo" src="/images/logo.png" />
				</Link>
				<div className="menu-icon" onClick={handleClick}>
					{click ? (
						<ClearIcon style={{ color: "white" }} />
					) : (
						<MenuIcon style={{ color: "white" }} />
					)}
				</div>

				<ul className={click ? "nav-menu active" : "nav-menu"}>
					{auth.isAuthenticated() && (
						<li
							onMouseEnter={onMouseEnterMybiddersverse}
							onMouseLeave={onMouseLeaveMybiddersverse}
							className="nav-item"
						>
							<Link
								to="/"
								className="nav-links dropdown"
								onClick={closeMobileMenu}
							>
								My Biddersverse <ArrowDropDownIcon />
							</Link>
							{myBiddersverseDropdown && (
								<MyBiddersverseDropdown />
							)}
						</li>
					)}

					<li
						className="nav-item"
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
					>
						<Link
							to="#"
							className="nav-links dropdown"
							onClick={closeMobileMenu}
						>
							Auctions By Category <ArrowDropDownIcon />
						</Link>
						{dropdown && (
							<CategoryDropdown categories={categories} />
						)}
					</li>
					{auth.isAuthenticated() && (
						<li
							className="nav-item"
							onMouseEnter={onMouseEnterProfile}
							onMouseLeave={onMouseLeaveProfile}
						>
							<Link
								to="#"
								className="nav-links dropdown"
								onClick={closeMobileMenu}
							>
								<AccountCircleIcon /> <ArrowDropDownIcon />
							</Link>
							{profileDropdown && (
								<AccountDropdown history={history} />
							)}
						</li>
					)}

					{!auth.isAuthenticated() && (
						<li className="nav-item">
							<Link
								to="/signin"
								className="nav-links-mobile"
								onClick={closeMobileMenu}
							>
								Sign In
							</Link>
						</li>
					)}
				</ul>
				{!auth.isAuthenticated() && <Button text="Sign In" />}
			</nav>
		</>
	);
}

export default withRouter(Navbar);
