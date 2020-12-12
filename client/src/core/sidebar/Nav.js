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
import { Link, withRouter } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import auth from "../../auth/auth-helper";
import MyBidsMenu from "../MyBidsMenu";
import { listCategories } from "../../category/api-category";

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
  drawerLinksHover: {
    fontWeight: "bold",
  },
  drawerTitles: {
    fontSize: "16px",
    fontWeight: "800",
  },
}));

const Sidebar = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { user } = auth.isAuthenticated();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [myAuctions, setMyAuctions] = useState([
    { title: "All", path: "/myauctions" },
    { title: "Live Auctions", path: "/myauctions" },
    { title: "Sold Auctions", path: "/myauctions" },
    { title: "Orders", path: "/myauctions" },
  ]);
  const [myBids, setMyBids] = useState([
    { title: "All Bids", path: `/auctions/all/bids/${user?._id}` },
    { title: "Live Bids", path: `/auctions/live/bids/${user?._id}` },
    { title: "Won Bids", path: `/auctions/won/bids/${user?._id}` },
    { title: "Orders", path: `/auctions/all/bids/${user?._id}` },
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
          {!auth.isAuthenticated() && (
            <span>
              <Link className={classes.links} to="/signup">
                <Button color="inherit">Sign Up</Button>
              </Link>
              <Link className={classes.links} to="/signin">
                <Button color="inherit">Sign In</Button>
              </Link>
            </span>
          )}

          {auth.isAuthenticated() && (
            <span className={classes.toolbarRight}>
              <Link
                className={classes.links}
                to={"/user/" + auth.isAuthenticated().user._id}
              >
                <Button color="inherit">Profile</Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  auth.clearJWT(() => history.push("/"));
                }}
              >
                Sign out
              </Button>
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
                  Auctions By Category
                </Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            <div className={classes.list}>
              <List>
                {categories?.map((category) => (
                  <Link
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
                            to={item.path}
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
                        to={item.path}
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

export default withRouter(Sidebar);
