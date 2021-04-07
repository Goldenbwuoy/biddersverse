import React, { useEffect, useState } from "react";
import { listOpenByCategory } from "./api-auction";
import AuctionCardGrid from "./AuctionCardGrid";

const __auctions = [
	{
		src: "/images/ps4.png",
		text: "Brand New PS4",
		label: "Adventure",
		path: "/",
	},
	{
		src: "/images/ps4.png",
		text: "Brand New PS4",
		label: "Adventure",
		path: "/",
	},
	{
		src: "/images/ps4.png",
		text: "Brand New PS4",
		label: "Adventure",
		path: "/",
	},
	{
		src: "/images/ps4.png",
		text: "Brand New PS4",
		label: "Adventure",
		path: "/",
	},
	{
		src: "/images/ps4.png",
		text: "Brand New PS4",
		label: "Adventure",
		path: "/",
	},
	{
		src: "/images/ps4.png",
		text: "Brand New PS4",
		label: "Adventure",
		path: "/",
	},
];

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
		<div>
			<AuctionCardGrid
				auctions={__auctions}
				title={location.state.title}
			/>
		</div>
	);
}

export default AuctionsByCategory;
