import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { Link, withRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { mainListItemsData, secondaryListItems } from "./listItems";
import Logo from "../../assets/images/logo2.png";
import {
	Button,
	ListItem,
	ListItemIcon,
	ListItemText,
	Tooltip,
} from "@material-ui/core";
import auth from "../../auth/auth-helper";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		marginBottom: theme.spacing(12),
	},
	toolbarLeft: {
		display: "flex",
		alignItems: "center",
		flexGrow: 1,
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		backgroundColor: "black",
		height: "100px",
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		display: "flex",
		justifyContent: "center",
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 20,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		display: "flex",
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	links: {
		textDecoration: "none",
		color: "white",
	},

	sidebarLinks: {
		textDecoration: "none",
		color: "black",
	},
	logo: {
		width: "100px",
		objectFit: "contain",
		// margin: "0 20px",
		paddingTop: " 15px",
	},
}));

const Dashboard = ({ history }) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar>
					<Box className={classes.toolbarLeft}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							className={clsx(
								classes.menuButton,
								open && classes.menuButtonHidden
							)}
						>
							<MenuIcon />
						</IconButton>
						<Link to="/admin/home">
							<img
								className={classes.logo}
								src="/images/logo.png"
								alt="logo"
							/>
						</Link>
					</Box>

					<Link className={classes.links} to="#">
						<Tooltip title="Profile">
							<Button color="inherit">
								<AccountCircleIcon />
							</Button>
						</Tooltip>
					</Link>
					{/* Logout Icon button */}
					<Tooltip title="Signout">
						<Button
							color="inherit"
							onClick={() => {
								auth.clearAdminJWT(() => history.push("/"));
							}}
						>
							<ExitToAppIcon />
						</Button>
					</Tooltip>
				</Toolbar>
			</AppBar>
			<Drawer
				anchor="left"
				classes={{
					paper: clsx(
						classes.drawerPaper,
						!open && classes.drawerPaperClose
					),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					{/* {mainListItems} */}
					{mainListItemsData.map((item) => (
						<Link
							onClick={handleDrawerClose}
							className={classes.sidebarLinks}
							to={item.path}
						>
							<ListItem button>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.title} />
							</ListItem>
						</Link>
					))}
				</List>
				<Divider />
				{/* <List>{secondaryListItems}</List> */}
			</Drawer>
		</div>
	);
};

export default withRouter(Dashboard);
