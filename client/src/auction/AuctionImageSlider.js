import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { getImage } from "../helpers/auction-helper";

function AuctionImageSlider({ auction }) {
	const [images, setImages] = useState([]);

	useEffect(() => {
		if (auction.images && auction.images.length > 0) {
			let images = [];

			auction.images &&
				auction.images.forEach((item) => {
					images.push({
						original: getImage(item),
						thumbnail: getImage(item),
					});
				});
			setImages(images);
		}
	}, [auction]);

	return (
		<div>
			<ImageGallery items={images} />
		</div>
	);
}

export default AuctionImageSlider;
