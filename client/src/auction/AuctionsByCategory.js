import React, { useEffect, useState } from "react";
import { listOpenByCategory } from "./api-auction";
import AuctionCardGrid from "./AuctionCardGrid";

function AuctionsByCategory({ match, location }) {
	const [auctions, setAuctions] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		listOpenByCategory(
			{
				categoryId: match.params.categoryId,
			},
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
	}, [match.params.categoryId]);
	return (
		<div style={{ height: "100vh", paddingTop: "30px" }}>
			<AuctionCardGrid
				auctions={auctions}
				setAuctions={setAuctions}
				title={location.state.title}
			/>
		</div>
	);
}

export default AuctionsByCategory;
