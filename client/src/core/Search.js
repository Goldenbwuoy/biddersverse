import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import { searchAuctions } from "../auction/api-auction";
import { useHistory } from "react-router-dom";

const Search = ({ header }) => {
	const history = useHistory();
	const [values, setValues] = useState({
		search: "",
		results: [],
		redirectToResults: false,
	});

	const handleSearch = (e) => {
		e.preventDefault();
		searchAuctions({ search: values.search || undefined }).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setValues({
					...values,
					results: data,
					redirectToResults: true,
				});
			}
		});
	};

	console.log(history);

	if (values.redirectToResults) {
		setValues({
			...values,
			redirectToResults: false,
		});
		history.push({
			pathname: `/search?query=${values.search}`,
			state: { results: values.results },
		});
	}

	return (
		<>
			{header ? (
				<form onSubmit={handleSearch} className="search-form-header">
					<span className="search-section-header">
						<input
							className="search-input-header"
							type="text"
							placeholder="Search Auctions..."
							value={values.search}
							onChange={(event) =>
								setValues({
									...values,
									search: event.target.value,
								})
							}
						/>
						<Button
							disabled={!values.search}
							className="search-icon-header"
							onClick={() => setValues({ ...values, search: "" })}
						>
							{values.search ? <ClearIcon /> : <SearchIcon />}
						</Button>
						<Button
							style={{ display: "none" }}
							disabled={!values.search}
							type="submit"
						></Button>
					</span>
				</form>
			) : (
				<form onSubmit={handleSearch} className="search-form">
					<span className="search-section">
						<input
							className="search-input"
							type="text"
							placeholder="Search Auctions..."
							value={values.search}
							onChange={(event) =>
								setValues({
									...values,
									search: event.target.value,
								})
							}
						/>
						<Button
							style={{ display: "none" }}
							disabled={!values.search}
							type="submit"
						></Button>
						<Button
							disabled={!values.search}
							className="search-icon"
							onClick={() => setValues({ ...values, search: "" })}
						>
							{values.search ? <ClearIcon /> : <SearchIcon />}
						</Button>
					</span>
				</form>
			)}
		</>
	);
};

export default Search;
