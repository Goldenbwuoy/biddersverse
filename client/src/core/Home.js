import React, { useEffect, useState } from "react";
import { listLatest } from "../auction/api-auction";
import AuctionCardGrid from "../auction/AuctionCardGrid";
import PopularAuctions from "../auction/PopularAuctions";
import HeroSection from "./HeroSection";

const auctions = [
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
			<AuctionCardGrid auctions={auctions} title="Recently Added" />
			<AuctionCardGrid auctions={auctions} title="Popular Auctions" />
		</>
	);
}

export default Home;
