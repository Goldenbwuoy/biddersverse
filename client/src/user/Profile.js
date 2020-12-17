import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Edit from "@material-ui/icons/Edit";
import Person from "@material-ui/icons/Person";
import Divider from "@material-ui/core/Divider";
import DeleteUser from "./DeleteUser";
import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
import { Redirect, Link } from "react-router-dom";
import defaultImage from "../assets/images/profile-pic.png";
import stripeButton from "../assets/images/stripeButton.png";
import client_config from "../config/client_config";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 10,
  },
  stripe_connect: {
    marginRight: "10px",
  },
  stripe_connected: {
    verticalAlign: "super",
    marginRight: "10px",
  },
}));

function Profile({ match }) {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        userId: match.params.userId,
      },
      { token: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.bigAvatar} />
          </ListItemAvatar>
          <ListItemText
            primary={`${user.firstName} ${user.lastName}`}
            secondary={user.email}
          />{" "}
          {auth.isAuthenticated().user &&
            auth.isAuthenticated().user._id === user._id && (
              <ListItemSecondaryAction>
                {user.seller && user.stripe_seller && (
                  <Button
                    variant="contained"
                    disabled
                    className={classes.stripe_connected}
                  >
                    Stripe connected
                  </Button>
                )}

                {user.seller && !user.stripe_seller && (
                  <a
                    href={
                      "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=" +
                      client_config.stripe_connect_test_client_id +
                      "&scope=read_write"
                    }
                    className={classes.stripe_connected}
                  >
                    <img src={stripeButton} alt="stripe_button" />
                  </a>
                )}
                <Link to={"/user/edit/" + user._id}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          {" "}
          <ListItemText primary={user.about} />{" "}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={"Joined: " + new Date(user.createdAt).toDateString()}
          />
        </ListItem>
      </List>
    </Paper>
  );
}

export default Profile;
