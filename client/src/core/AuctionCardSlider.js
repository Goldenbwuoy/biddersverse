import { Container } from "@material-ui/core";
import React from "react";
import Slider from "react-slick";
import AuctionCardItem from "../auction/AuctionCardItem";
import "./styles/AuctionCardSlider.css";

function AuctionCardSlider({ auctions, title }) {
	var settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 320,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: false,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: false,
				},
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: false,
				},
			},
		],
	};
	return (
		<div className="slider">
			<Container component="main" maxWidth="xl">
				<div className="slider__cards">
					<h3 className="slider__header">{title}</h3>
					<Slider {...settings}>
						{auctions.map((auction) => (
							<AuctionCardItem
								key={auction._id}
								auction={auction}
							/>
						))}
					</Slider>
				</div>
			</Container>
		</div>
	);
}

export default AuctionCardSlider;
