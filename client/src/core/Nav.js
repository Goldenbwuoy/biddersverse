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
import { Box, Button, Tooltip } from "@material-ui/core";
import auth from "../auth/auth-helper";
import { listCategories } from "../category/api-category";
import MyBidsMenu from "./MyBidsMenu";
import Search from "./Search";

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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#CDD6DA",
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
  list: {
    marginLeft: "25px",
  },
  listItem: {
    marginTop: "5px",
    marginBottom: "5px",
    marginLeft: "45px",
    "&:hover": {
      fontWeight: "bold",
    },
  },
  drawerLinks: {
    textDecoration: "none",
    cursor: "pointer",
    color: "black",
  },
  drawerTitles: {
    fontSize: "16px",
    fontWeight: "800",
  },
  authButton: {
    textTransform: "capitalize",
  },
}));

const Nav = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [myAuctions, setMyAuctions] = useState([
    {
      title: "All Auctions",
      path: "/auctions/all/by-seller",
      status: "all",
    },
    {
      title: "Live Auctions",
      path: "/auctions/live/by-seller",
      status: "live",
    },
    {
      title: "Sold Auctions",
      path: "/auctions/sold/by-seller",
      status: "sold",
    },
  ]);
  const [myBids, setMyBids] = useState([
    { title: "All Placed Bids", path: `/auctions/all/bids`, status: "all" },
    { title: "Live Bids", path: `/auctions/live/bids`, status: "live" },
    { title: "Won Bids", path: `/auctions/won/bids`, status: "won" },
  ]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listCategories(signal).then((data) => {
      if (data.error) {
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
                Biddersverse
              </Link>
            </Typography>
          </Box>
          <Search />
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
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        color="black"
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
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText>
                <Link className={classes.drawerLinks} to="/">
                  <Typography className={classes.drawerTitles}>Home</Typography>
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText>
                <Typography className={classes.drawerTitles}>
                  Open Auctions By Category
                </Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            <div className={classes.list}>
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
                      <ListItemText primary={category.categoryName} />
                    </ListItem>
                  </Link>
                ))}
              </List>
            </div>

            <Divider />
            {auth.isAuthenticated() && (
              <>
                {auth.isAuthenticated().user.seller && (
                  <>
                    <ListItem button>
                      <ListItemText>
                        <Typography className={classes.drawerTitles}>
                          My Auctions
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <Divider />
                    <div className={classes.list}>
                      <List>
                        {myAuctions?.map((item) => (
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
                              <ListItemText primary={item.title} />
                            </ListItem>
                          </Link>
                        ))}
                      </List>
                    </div>
                    <Divider />
                  </>
                )}
                <ListItem button>
                  <ListItemText>
                    <Typography className={classes.drawerTitles}>
                      My Bids
                    </Typography>
                  </ListItemText>
                </ListItem>
                <Divider />
                <div className={classes.list}>
                  <List>
                    {myBids?.map((item) => (
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
                          <ListItemText primary={item.title} />
                        </ListItem>
                      </Link>
                    ))}
                  </List>
                </div>
                <Divider className={classes.divider} />
              </>
            )}
          </>
        </List>
      </Drawer>
    </div>
  );
};

export default withRouter(Nav);
