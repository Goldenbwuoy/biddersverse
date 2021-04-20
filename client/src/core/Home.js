import React, { useEffect, useState } from "react";
import { listLatest, homePageListings } from "../auction/api-auction";
import AuctionCardSlider from "./AuctionCardSlider";
import HeroSection from "./HeroSection";

function Home() {
	const [listings, setListings] = useState([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		homePageListings(signal).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setListings(data);
			}
		});

		return function cleanup() {
			abortController.abort();
		};
	}, []);
	console.log(listings);

	return (
		<>
			<HeroSection />
			{listings.latest && (
				<AuctionCardSlider
					auctions={listings.latest}
					title="New Listings"
				/>
			)}

			{listings.popular && (
				<AuctionCardSlider
					auctions={listings.popular}
					title="Popular Listings"
				/>
			)}
			{listings.closing && (
				<AuctionCardSlider
					auctions={listings.closing}
					title="Closing Listings"
				/>
			)}
			{listings.recentlySold && (
				<AuctionCardSlider
					auctions={listings.recentlySold}
					title="Recently Sold Listings"
				/>
			)}
		</>
	);
}

export default Home;
