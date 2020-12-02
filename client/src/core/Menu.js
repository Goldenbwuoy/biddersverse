import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";

const styles = {
  icon: {
    color: "white",
  },
  links: {
    textDecoration: "none",
    color: "white",
  },
};

const Menu = withRouter(({ history }) => (
  <AppBar position="sticky">
    <Toolbar>
      <Typography
        variant="h6"
        color="inherit"
        aria-label="Home"
        style={{ flexGrow: 1 }}
      >
        <Link style={styles.links} to="/">
          Biddersverse
        </Link>
      </Typography>

      {!auth.isAuthenticated() && (
        <span>
          <Link style={styles.links} to="/signup">
            <Button color="inherit">Sign Up</Button>
          </Link>
          <Link style={styles.links} to="/signin">
            <Button color="inherit">Sign In</Button>
          </Link>
        </span>
      )}

      {auth.isAuthenticated() && (
        <span>
          {auth.isAuthenticated().user.seller && (
            <>
              <Link style={styles.links} to="/myauctions">
                <Button color="inherit">My Auctions</Button>
              </Link>
            </>
          )}
          <Link
            style={styles.links}
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
));

export default Menu;
