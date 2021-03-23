const getAuctionImage = (auction) => {
	const BASE_URL = "http://localhost:5000";
	const image = `${BASE_URL}/api/auctions/image/${
		auction._id
	}?${new Date().getTime()}`;
	return image;
};

const getImage = (image) => {
	const img = new URL(`http://localhost:5000/${image}`);
	return img.toString();
};

const getDateString = (date) => {
	let year = date.getFullYear();
	let day =
		date.getDate().toString().length === 1
			? "0" + date.getDate()
			: date.getDate();
	let month =
		date.getMonth().toString().length === 1
			? "0" + (date.getMonth() + 1)
			: date.getMonth() + 1;
	let hours =
		date.getHours().toString().length === 1
			? "0" + date.getHours()
			: date.getHours();
	let minutes =
		date.getMinutes().toString().length === 1
			? "0" + date.getMinutes()
			: date.getMinutes();
	let dateString = `${year}-${month}-${day}T${hours}:${minutes}`;
	return dateString;
};

const calculateTimeLeft = (date) => {
	const difference = date - new Date();
	let timeLeft = {};

	if (difference > 0) {
		timeLeft = {
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
			minutes: Math.floor((difference / 1000 / 60) % 60),
			seconds: Math.floor((difference / 1000) % 60),
			timeEnd: false,
		};
	} else {
		timeLeft = { timeEnd: true };
	}

	return timeLeft;
};

export { getAuctionImage, getDateString, calculateTimeLeft, getImage };
