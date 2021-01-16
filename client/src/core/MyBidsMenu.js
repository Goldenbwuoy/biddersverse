import {
  Button,
  Icon,
  makeStyles,
  Menu,
  MenuItem,
  Tooltip,
} from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
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
  const { user } = auth.isAuthenticated();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Orders">
        <Button
          color="inherit"
          aria-controls="bids-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          <ShoppingBasketIcon />
        </Button>
      </Tooltip>

      <Menu
        id="bids-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {user.seller && (
          <MenuItem onClick={handleClose}>
            <Link className={classes.link} to="/seller/orders">
              Sold Items
            </Link>{" "}
          </MenuItem>
        )}

        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to="/buyer/orders">
            Bought Items
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default MyBidsMenu;
