import React, { useState } from "react";
import "./styles/AuctionDetailTabs.css";

function AuctionDetailTabs({ auction }) {
	const [toggleState, setToggleState] = useState(1);

	const toggleTab = (index) => {
		setToggleState(index);
	};

	return (
		<div className="tab__container">
			<div className="bloc-tabs">
				<button
					className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
					onClick={() => toggleTab(1)}
				>
					Description
				</button>
				<button
					className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
					onClick={() => toggleTab(2)}
				>
					Auction Details
				</button>
			</div>

			<div className="content-tabs">
				<div
					className={
						toggleState === 1
							? "content  active-content"
							: "content"
					}
				>
					<p className="content__description">
						{auction.description}
					</p>
				</div>

				<div
					className={
						toggleState === 2
							? "content  active-content"
							: "content"
					}
				>
					<div className="content__details">
						<span className="content__details-item">
							<p className="content__details-title">
								Start Time:
							</p>
							<p className="content__details-title">End Time:</p>
							<p className="content__details-title">Seller:</p>
							<p className="content__details-title">
								Starting Bid:
							</p>
							<p className="content__details-title">
								Current Bid:
							</p>
						</span>
						<span className="content__details-item">
							<p className="content__details-value">
								{new Date(auction?.bidStart).toLocaleString()}
							</p>
							<p className="content__details-value">
								{new Date(auction?.bidEnd).toLocaleString()}
							</p>
							<p className="content__details-value">
								{auction.seller?.firstName}
							</p>
							<p className="content__details-value">
								{`$${auction?.startingBid}`}
							</p>
							<p className="content__details-value">
								{auction.bids?.length
									? `$${auction?.bids[0].bid}`
									: "None"}
							</p>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AuctionDetailTabs;
