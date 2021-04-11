import React, { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { listByBidder } from "./api-auction";
import AuctionCardGrid from "./AuctionCardGrid";

function AuctionsByBidder({ location }) {
	const [auctions, setAuctions] = useState([]);
	const { token, user } = auth.isAuthenticated();
	const status = location.pathname.split("/")[2];

	const title =
		status && status === "all"
			? "All Placed Bids"
			: status === "live"
			? "Live Bids"
			: "Won Bids";

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		listByBidder(
			{
				userId: user._id,
				status: status,
			},
			{ token: token },
			signal
		).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAuctions(data);
			}
		});
		return function cleanup() {
			abortController.abort();
		};
	}, [user.id, status]);
	return (
		<div style={{ height: "100vh", paddingTop: "30px" }}>
			<AuctionCardGrid auctions={auctions} title={title} />
		</div>
	);
}

export default AuctionsByBidder;
