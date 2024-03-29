import queryString from "querystring";
const BASE_URL = "http://localhost:5000";

const create = (params, credentials, auction) => {
	return fetch(`${BASE_URL}/api/auctions/all/by/${params.userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${credentials.token}`,
		},
		body: JSON.stringify(auction),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

const listOpen = async (signal) => {
	try {
		let response = await fetch(`${BASE_URL}/api/auctions`, {
			method: "GET",
			signal: signal,
		});
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const listPopular = async (signal) => {
	try {
		let response = await fetch(`${BASE_URL}/api/auctions/popular`, {
			method: "GET",
			signal: signal,
		});
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const listLatest = async (signal) => {
	try {
		let response = await fetch(`${BASE_URL}/api/auctions/added/latest`, {
			method: "GET",
			signal: signal,
		});
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const homePageListings = async (signal) => {
	try {
		let response = await fetch(`${BASE_URL}/api/auctions/home_listings`, {
			method: "GET",
			signal: signal,
		});
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const listOpenByCategory = async (params) => {
	try {
		let response = await fetch(
			`${BASE_URL}/api/auctions/category/${params.categoryId}`,
			{
				method: "GET",
			}
		);
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const searchAuctions = async (params) => {
	const query = queryString.stringify(params);
	try {
		let response = await fetch(`${BASE_URL}/api/auctions?${query}`, {
			method: "GET",
		});
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const read = async (params, signal) => {
	try {
		let response = await fetch(
			`${BASE_URL}/api/auction/${params.auctionId}`,
			{
				method: "GET",
				signal: signal,
			}
		);
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const listRelated = async (params, signal) => {
	try {
		let response = await fetch(
			`${BASE_URL}/api/auctions/related/${params.auctionId}`,
			{
				method: "GET",
				signal: signal,
			}
		);
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const listBySeller = async (params, credentials, signal) => {
	try {
		let response = await fetch(
			`${BASE_URL}/api/auctions/${params.status}/by/${params.userId}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${credentials.token}`,
				},
			}
		);
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const listByBidder = async (params, credentials, signal) => {
	try {
		let response = await fetch(
			`${BASE_URL}/api/auctions/bid/${params.status}/${params.userId}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${credentials.token}`,
				},
			}
		);
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const deleteAuction = async (params, credentials) => {
	try {
		let response = await fetch(
			`${BASE_URL}/api/auctions/${params.auctionId}`,
			{
				method: "DELETE",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${credentials.token}`,
				},
			}
		);
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

const updateAuction = (params, credentials, auction) => {
	return fetch(`${BASE_URL}/api/auctions/${params.auctionId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${credentials.token}`,
		},
		body: auction,
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

const payDeposit = async (params, credentials) => {
	console.log(credentials.token);

	try {
		let response = await fetch(
			`${BASE_URL}/api/auctions/bidder/${params.userId}/join/${params.auctionId}`,
			{
				method: "PUT",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${credentials.token}`,
				},
			}
		);
		return response.json();
	} catch (err) {
		console.log(err);
	}
};

export {
	create,
	listOpen,
	listPopular,
	homePageListings,
	listBySeller,
	read,
	listOpenByCategory,
	listByBidder,
	listLatest,
	deleteAuction,
	updateAuction,
	listRelated,
	searchAuctions,
	payDeposit,
};
