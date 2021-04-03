import React from "react";
import CardItem from "./CardItem";
import "./styles/Cards.css";

function Cards() {
	return (
		<div className="cards">
			<h1>Checkout These Recently Added Auctions</h1>
			<div className="cards__container">
				<div className="cards__wrapper">
					<ul className="cards__items">
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
					</ul>
					<ul className="cards__items">
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
						<CardItem
							src="/images/ps4.png"
							text="Brand New PS4"
							label="Adventure"
							path="/"
						/>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default Cards;
