import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link, withRouter } from "react-router-dom";
import { Box, Button, ListItemIcon, Tooltip } from "@material-ui/core";
import auth from "../auth/auth-helper";
import { listCategories } from "../category/api-category";
import MyBidsMenu from "./MyBidsMenu";
import Search from "./Search";
import Logo from "../assets/images/logo2.png";
import { auctionsListItems, bidsListItems } from "./drawerListItems";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import LayersIcon from "@material-ui/icons/Layers";
import ShopTwoIcon from "@material-ui/icons/ShopTwo";
import HomeIcon from "@material-ui/icons/Home";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(12),
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
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
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  links: {
    textDecoration: "none",
    color: "white",
  },
  toolbarLeft: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
  },
  toolbarRight: {
    display: "flex",
    alignItems: "center",
  },
  dividerColor: {
    backgroundColor: "red",
  },
  drawerLinks: {
    textDecoration: "none",
    cursor: "pointer",
    color: "black",
  },
  authButton: {
    textTransform: "capitalize",
  },
  logo: {
    width: "100px",
    objectFit: "contain",
  },
  sidebarLinks: {
    textDecoration: "none",
    color: "black",
  },
}));

const Nav = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dropDownValues, setDropDownValues] = useState({
    showCategories: false,
    showAuctions: false,
    showBids: false,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listCategories(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={useStyles().root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Box className={classes.toolbarLeft}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <Link className={classes.links} to="/">
                <img className={classes.logo} src={Logo} alt="" />
              </Link>
            </Typography>
          </Box>
          <Search history={history} />
          {!auth.isAuthenticated() && (
            <span className={classes.toolbarRight}>
              <Link className={classes.links} to="/signin">
                <Tooltip title="Login">
                  <Button color="inherit">
                    <OpenInBrowserIcon />
                  </Button>
                </Tooltip>
              </Link>
            </span>
          )}

          {auth.isAuthenticated() && (
            <span className={classes.toolbarRight}>
              <MyBidsMenu />

              <Link
                className={classes.links}
                to={"/user/" + auth.isAuthenticated().user._id}
              >
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
                    auth.clearJWT(() => history.push("/"));
                  }}
                >
                  <ExitToAppIcon />
                </Button>
              </Tooltip>
            </span>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <>
            <Link className={classes.drawerLinks} to="/">
              <ListItem button onClick={handleDrawerClose}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>

            <ListItem
              button
              onClick={() =>
                setDropDownValues({
                  ...dropDownValues,
                  showCategories: !dropDownValues.showCategories,
                })
              }
            >
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Auctions By Category" />
              <ListItemIcon>
                {dropDownValues.showCategories ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </ListItemIcon>
            </ListItem>
            {dropDownValues.showCategories && (
              <>
                <Divider />
                <List>
                  {categories?.map((category) => (
                    <Link
                      key={category._id}
                      className={classes.drawerLinks}
                      to={{
                        pathname: `/auctions/categories/${category._id}`,
                        state: { title: category.categoryName },
                      }}
                    >
                      <ListItem button onClick={handleDrawerClose}>
                        <ListItemText inset secondary={category.categoryName} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
              </>
            )}

            {auth.isAuthenticated() && (
              <>
                {auth.isAuthenticated().user.seller && (
                  <>
                    <ListItem
                      button
                      onClick={() =>
                        setDropDownValues({
                          ...dropDownValues,
                          showAuctions: !dropDownValues.showAuctions,
                        })
                      }
                    >
                      <ListItemIcon>
                        <ShopTwoIcon />
                      </ListItemIcon>
                      <ListItemText primary="My Auctions" />
                      <ListItemIcon>
                        {dropDownValues.showAuctions ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </ListItemIcon>
                    </ListItem>
                    {dropDownValues.showAuctions && (
                      <>
                        <Divider />
                        <List>
                          {auctionsListItems.map((item) => (
                            <Link
                              key={item.title}
                              className={classes.drawerLinks}
                              to={{
                                pathname: item.path,
                                state: {
                                  title: item.title,
                                  status: item.status,
                                },
                              }}
                            >
                              <ListItem button onClick={handleDrawerClose}>
                                <ListItemText inset secondary={item.title} />
                              </ListItem>
                            </Link>
                          ))}
                        </List>
                        <Divider />
                      </>
                    )}
                  </>
                )}
                <ListItem
                  button
                  onClick={() =>
                    setDropDownValues({
                      ...dropDownValues,
                      showBids: !dropDownValues.showBids,
                    })
                  }
                >
                  <ListItemIcon>
                    <MonetizationOnIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Bids" />
                  <ListItemIcon>
                    {dropDownValues.showBids ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </ListItemIcon>
                </ListItem>
                {dropDownValues.showBids && (
                  <>
                    <Divider />
                    <List>
                      {bidsListItems.map((item) => (
                        <Link
                          key={item.title}
                          className={classes.drawerLinks}
                          to={{
                            pathname: item.path,
                            state: {
                              title: item.title,
                              status: item.status,
                            },
                          }}
                        >
                          <ListItem button onClick={handleDrawerClose}>
                            <ListItemText inset secondary={item.title} />
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                    <Divider />
                  </>
                )}
              </>
            )}
          </>
        </List>
      </Drawer>
    </div>
  );
};

export default withRouter(Nav);
