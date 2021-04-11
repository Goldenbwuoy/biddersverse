import React, { useEffect, useState } from "react";
import { listLatest } from "../auction/api-auction";
import AuctionCardSlider from "./AuctionCardSlider";
import HeroSection from "./HeroSection";

function Home() {
	const [latestAuctions, setLatestAuctions] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		listLatest(signal).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setLatestAuctions(data);
			}
		});

		return function cleanup() {
			abortController.abort();
		};
	}, []);

	return (
		<>
			<HeroSection />
			<AuctionCardSlider auctions={latestAuctions} title="New Listings" />
			<AuctionCardSlider
				auctions={latestAuctions}
				title="Popular Listings"
			/>
			<AuctionCardSlider
				auctions={latestAuctions}
				title="Closing Listings"
			/>
			<AuctionCardSlider
				auctions={latestAuctions}
				title="Recently Sold Listings"
			/>
		</>
	);
}

export default Home;
