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
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  listItem: {
    marginTop: "5px",
    marginBottom: "5px",
    marginLeft: "45px",
  },
}));

const Sidebar = ({ history }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [myAuctions, setMyAuctions] = useState([
    { title: "All" },
    { title: "Live Auctions" },
    { title: "Sold Auctions" },
    { title: "Orders" },
  ]);
  const [myBids, setMyBids] = useState([
    { title: "All Bids" },
    { title: "Live Bids" },
    { title: "Won Bids" },
    { title: "Orders" },
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

  console.log(categories);

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
              {auth.isAuthenticated().user.seller && (
                <>
                  <Link className={classes.links} to="/myauctions">
                    <Button color="inherit">My Auctions</Button>
                  </Link>
                </>
              )}

              <MyBidsMenu />

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
                <Typography variant="h6">Home</Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText>
                <Typography variant="h6">Auctions By Category</Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            <div className={classes.list}>
              {categories?.map((category) => (
                <Typography className={classes.listItem} key={category._id}>
                  {category.categoryName}
                </Typography>
              ))}
            </div>

            <Divider />
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText>
                <Typography variant="h6">My Auctions</Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            <div className={classes.list}>
              {myAuctions?.map((item) => (
                <Typography className={classes.listItem} key={item.title}>
                  {item.title}
                </Typography>
              ))}
            </div>
            <Divider />
            <ListItem button onClick={handleDrawerClose}>
              <ListItemText>
                <Typography variant="h6">My Bids</Typography>
              </ListItemText>
            </ListItem>
            <Divider />
            <div className={classes.list}>
              {myBids?.map((item) => (
                <Typography className={classes.listItem} key={item.title}>
                  {item.title}
                </Typography>
              ))}
            </div>
            <Divider className={classes.divider} />
          </>
        </List>
      </Drawer>
    </div>
  );
};

export default withRouter(Sidebar);
