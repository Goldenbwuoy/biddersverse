import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ShopTwoIcon from "@material-ui/icons/ShopTwo";

export const mainListItemsData = [
	{
		title: "Dashboard",
		path: "/admin/home",
		icon: <DashboardIcon />,
	},
	{
		title: "Users",
		path: "/admin/users",
		icon: <PeopleIcon />,
	},
	{
		title: "Auctions",
		path: "/admin/auctions",
		icon: <ShopTwoIcon />,
	},
	{
		title: "Orders",
		path: "/admin/orders",
		icon: <ShoppingCartIcon />,
	},
	{
		title: "Auction Categories",
		path: "/admin/categories",
		icon: <LayersIcon />,
	},
];

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Saved reports</ListSubheader>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Current month" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Last quarter" />
		</ListItem>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Year-end sale" />
		</ListItem>
	</div>
);
