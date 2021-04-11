import React, { useEffect, useState } from "react";
import auth from "../auth/auth-helper";
import { listBySeller } from "./api-auction";
import AuctionCardGrid from "./AuctionCardGrid";

function AuctionsBySeller({ location }) {
	const [auctions, setAuctions] = useState([]);
	const { user, token } = auth.isAuthenticated();
	const status = location.pathname.split("/")[2];

	const title =
		status && status === "all"
			? "All Auctions"
			: status === "live"
			? "Live Auctions"
			: "Sold Auctions";

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		listBySeller(
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
	}, [user._id, status]);
	return (
		<div style={{ height: "100vh", paddingTop: "30px" }}>
			<AuctionCardGrid auctions={auctions} title={title} />
		</div>
	);
}

export default AuctionsBySeller;
