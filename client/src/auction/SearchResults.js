import React from "react";
import AuctionCardGrid from "./AuctionCardGrid";

function SearchResults({ location }) {
	const results = location.state.results;
	console.log(location.pathname.split("=")[1]);
	return (
		<div style={{ height: "100vh", paddingTop: "30px" }}>
			<AuctionCardGrid
				auctions={results}
				title="Search Results"
				search={true}
			/>
		</div>
	);
}

export default SearchResults;
