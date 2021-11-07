import React from "react";
import Settings from "@material-ui/icons/Settings";
import { IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteAuction from "./DeleteAuction";
import { Link } from "react-router-dom";

function AuctionSettingsMenu({ auction, SetRedirect }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<Settings
				style={{ cursor: "pointer", color: "#006637" }}
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
			></Settings>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>
					<Link
						style={{ textDecoration: "none" }}
						to={`/auction/edit/${auction._id}`}
					>
						<IconButton size="small">
							<EditIcon style={{ marginRight: 5 }} />
							<Typography>Edit auction</Typography>
						</IconButton>
					</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<DeleteAuction
						auction={auction}
						SetRedirect={SetRedirect}
					/>
				</MenuItem>
			</Menu>
		</div>
	);
}

export default AuctionSettingsMenu;
