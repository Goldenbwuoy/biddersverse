import { Button, makeStyles, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

function MyBidsMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = auth.isAuthenticated().user;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="bids-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        My Bids
      </Button>

      <Menu
        id="bids-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to={`/auctions/all/bids/${user._id}`}>
            All bids
          </Link>{" "}
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to={`/auctions/live/bids/${user._id}`}>
            Live bids
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to={`/auctions/won/bids/${user._id}`}>
            Won bids
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default MyBidsMenu;
