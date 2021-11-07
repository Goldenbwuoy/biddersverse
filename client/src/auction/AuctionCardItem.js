import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getImage } from "../helpers/auction-helper";
import ShowTimer from "./ShowTimer";

const statuses = {
	live: "Live",
	notStarted: "Auction Not Started",
	ended: "Auction Ended",
};

const labelStatus = (auction, current) => {
	let status = "";
	if (current < new Date(auction.bidStart)) status = statuses.notStarted;
	else if (
		current > new Date(auction.bidStart) &&
		current < new Date(auction.bidEnd)
	)
		status = statuses.live;
	else if (current > new Date(auction.bidEnd)) status = statuses.ended;

	return status;
};

function AuctionCardItem({ auction }) {
	const [justEnded, setJustEnded] = useState(false);
	const currentDate = new Date();

	const update = () => {
		setJustEnded(true);
	};

	const auctionState = labelStatus(auction, currentDate);
	console.log(auction);
	return (
		<>
			<Link className="cards__item__link" to={`/auction/${auction._id}`}>
				<figure
					className="cards__item__pic-wrap"
					data-category={`${auctionState} (${auction.bids?.length} bids)`}
				>
					<img
						src={getImage(auction?.images[0])}
						alt="Auction"
						className="cards__item__img"
					/>
				</figure>
				<div className="cards__item__info">
					<h5 className="cards__item__text">{auction.itemName}</h5>
					<div className="cards__item__row">
						<h4 className="cards__item__row-title">
							{auctionState === statuses.notStarted &&
								"starting bid"}
							{auctionState === statuses.live && "current bid"}
							{auctionState === statuses.ended && "winning bid"}
						</h4>
						<h4 className="cards__item__row-title">
							time remaining
						</h4>
					</div>
					<div className="cards__item__row">
						<h4 className="cards__item__row-price">
							{`$${
								auction.bids?.length > 0
									? auction.bids[0].bid
									: auction.startingBid
							}`}
						</h4>
						{currentDate > new Date(auction.bidStart) ? (
							<ShowTimer
								endTime={auction.bidEnd}
								update={update}
							/>
						) : (
							<h4 className="cards__item__row-time small">
								{`Starts at ${new Date(
									auction.bidStart
								).toLocaleString()}`}
							</h4>
						)}
					</div>
				</div>
			</Link>
		</>
	);
}

export default AuctionCardItem;
