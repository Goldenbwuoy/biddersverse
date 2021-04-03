import React, { useEffect, useState } from "react";
import { listLatest } from "../auction/api-auction";
import PopularAuctions from "../auction/PopularAuctions";
import Cards from "./Cards";
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
			<Cards />
		</>
	);
}

export default Home;
