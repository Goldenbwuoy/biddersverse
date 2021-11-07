import React, { useEffect, useState } from "react";

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

function ShowTimer({ endTime, update }) {
	const [timeLeft, setTimeLeft] = useState(
		calculateTimeLeft(new Date(endTime))
	);

	useEffect(() => {
		let timer = null;
		if (!timeLeft.timeEnd) {
			timer = setTimeout(() => {
				setTimeLeft(calculateTimeLeft(new Date(endTime)));
			}, 1000);
		} else {
			update();
		}

		return () => {
			clearTimeout(timer);
		};
	});
	return (
		<>
			{!timeLeft.timeEnd ? (
				<h4 className="cards__item__row-time">
					{timeLeft.days !== 0 && `${timeLeft.days} d `}
					{timeLeft.hours !== 0 && `${timeLeft.hours} h `}
					{timeLeft.minutes !== 0 && `${timeLeft.minutes} m `}
					{timeLeft.seconds !== 0 && `${timeLeft.seconds} s`}
				</h4>
			) : (
				<h4 className="cards__item__row-time">Auction ended</h4>
			)}
		</>
	);
}

export default ShowTimer;
