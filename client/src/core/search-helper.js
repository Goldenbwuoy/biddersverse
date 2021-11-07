const search = {
	setResult(searchResults, callback) {
		if (typeof window !== "undefined") {
			sessionStorage.setItem(
				"searchResults",
				JSON.stringify(searchResults)
			);
		}
		callback();
	},

	getResult() {
		if (typeof window === "undefined") return false;

		if (sessionStorage.getItem("searchResults"))
			return JSON.parse(sessionStorage.getItem("searchResults"));
		else return false;
	},
};

export default search;
