import React from "react";
import { Link } from "react-router-dom";

function CardItem({ src, text, label, path }) {
	return (
		<>
			{/* <li className="cards__item"> */}
			<Link className="cards__item__link" to={path}>
				<figure className="cards__item__pic-wrap" data-category={label}>
					<img src={src} alt="Auction" className="cards__item__img" />
				</figure>
				<div className="cards__item__info">
					<h5 className="cards__item__text">{text}</h5>
					<div className="cards__item__row">
						<h4 className="cards__item__row-title">current bid</h4>
						<h4 className="cards__item__row-title">
							time remaining
						</h4>
					</div>
					<div className="cards__item__row">
						<h4 className="cards__item__row-price">$100</h4>
						<h4 className="cards__item__row-time">2h:34:09</h4>
					</div>
				</div>
			</Link>
			{/* </li> */}
		</>
	);
}

export default CardItem;
