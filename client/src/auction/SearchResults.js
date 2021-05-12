import React, { useEffect, useState } from "react";
import AuctionCardGrid from "./AuctionCardGrid";
import search from "../core/search-helper";

function SearchResults({ location }) {
	// const results = location.state.results;
	const searchTerm = location.pathname.split("=")[1];
	const [results, setResults] = useState([]);

	useEffect(() => {
		const searchResults = search.getResult();
		setResults(searchResults);
	}, [searchTerm]);

	console.log(results);

	return (
		<div style={{ height: "100vh", paddingTop: "30px" }}>
			<AuctionCardGrid
				setAuctions={setResults}
				auctions={results}
				title={`Search Results for ${searchTerm}`}
				search={true}
			/>
		</div>
	);
}

export default SearchResults;
