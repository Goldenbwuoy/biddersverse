import React, { useState } from "react";
import Dropzone from "react-dropzone";
import PlusIcon from "@material-ui/icons/AddAPhoto";
import axios from "../config/axios";

function FileUpload(props) {
	const [images, setImages] = useState([]);

	const onDrop = (files) => {
		let formData = new FormData();
		const config = {
			header: { "content-type": "multipart/form-data" },
		};
		formData.append("file", files[0]);
		axios
			.post("/api/auctions/uploadImage", formData, config)
			.then((response) => {
				if (response && response.error) {
					alert("Failed to save image in server");
				} else {
					setImages([...images, response.data.image]);
					props.updateImages([...images, response.data.image]);
				}
			});
	};

	const onDelete = (image) => {
		const currentIndex = images.indexOf(image);
		let newImages = [...images];
		newImages.splice(currentIndex, 1);
		setImages(newImages);
		props.updateImages(newImages);
	};
	return (
		<div style={{ display: "flex", justifyContent: "space-between" }}>
			<Dropzone onDrop={onDrop} multiple={false} maxSize={500000000}>
				{({ getRootProps, getInputProps }) => (
					<div
						style={{
							width: "200px",
							height: "140px",
							border: "1px solid lightgray",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
						{...getRootProps()}
					>
						<input {...getInputProps()} />
						<PlusIcon style={{ fontSize: "3rem" }} />
					</div>
				)}
			</Dropzone>

			{images.length !== 0 && (
				<div
					style={{
						display: "flex",
						width: "200px",
						height: "140px",
						overflowX: "scroll",
					}}
				>
					{images?.map((image, index) => (
						<div key={index} onClick={() => onDelete(image)}>
							<img
								style={{
									// minWidth: "200px",
									width: "160px",
									height: "120px",
									objectFit: "contain",
									border: "1px solid lightgray",
									marginRight: "1px",
								}}
								src={`http://localhost:5000/${image}`}
								alt={`productImg-${index}`}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default FileUpload;
