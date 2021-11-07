import React, { useState } from "react";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import "./styles/MyBiddersverseDropdown.css";
import Divider from "@material-ui/core/Divider";

function MyBiddersverseDropdown() {
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);

	const isSeller = auth.isAuthenticated().user.seller;
	return (
		<div className={isSeller ? "dashboard seller" : "dashboard"}>
			{isSeller && (
				<>
					<div>
						<h4 className="dashboard__header">My Listings</h4>
						<ul className="dashboard__list">
							<li>
								<Link
									to="/auctions/all/by-seller"
									className="dashboard__link"
								>
									All My Listings
								</Link>
							</li>
							<li>
								<Link
									to="/auctions/live/by-seller"
									className="dashboard__link"
								>
									Live Listings
								</Link>
							</li>
							<li>
								<Link
									to="/auctions/sold/by-seller"
									className="dashboard__link"
								>
									Sold Listings
								</Link>
							</li>
							<li>
								<Link
									to="/auction/new"
									className="dashboard__link"
								>
									Create Listing
								</Link>
							</li>
							<li>
								<Link
									to="/seller/orders"
									className="dashboard__link"
								>
									Orders
								</Link>
							</li>
						</ul>
					</div>
					<Divider orientation="vertical" flexItem />
				</>
			)}

			<div>
				<h4 className="dashboard__header">My Bids</h4>
				<ul className="dashboard__list">
					<li>
						<Link
							to="/auctions/all/bids"
							className="dashboard__link"
						>
							All Bids
						</Link>
					</li>
					<li>
						<Link
							to="/auctions/live/bids"
							className="dashboard__link"
						>
							Live Bids
						</Link>
					</li>
					<li>
						<Link
							to="/auctions/won/bids"
							className="dashboard__link"
						>
							Won Bids
						</Link>
					</li>
					<li>
						<Link to="/buyer/orders" className="dashboard__link">
							Bought Items
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default MyBiddersverseDropdown;
