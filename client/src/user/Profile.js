import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import auth from "./../auth/auth-helper";
import { read } from "./api-user.js";
import { Redirect, Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import profileImage from "../assets/images/profile-pic.jpg";
import stripeButton from "../assets/images/stripeButton.png";
import client_config from "../config/client_config";
import { Button, Card, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 700,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    backgroundColor: "#80808024",
  }),
  topSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  card: {
    padding: "8px",
  },
  stripe_connect: {
    marginRight: "10px",
  },
  stripe_connected: {
    verticalAlign: "super",
    marginRight: "10px",
  },
  infoContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0",
  },
  infoText: {
    display: "flex",
    marginBottom: "15px",
  },
  profileImage: {
    display: "flex",
    width: "200px",
  },
  infoTitle: {
    fontWeight: "700",
    marginRight: "10px",
  },
  auctionsInfo: {
    display: "flex",
    justifyContent: "space-around",
    margin: "20px 0",
  },
  auctionInfoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  stripeInfo: {
    display: "flex",
    justifyContent: "space-around",
    margin: "20px 0",
  },
}));

function Profile({ match }) {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const { token } = auth.isAuthenticated();
  const isUser =
    auth.isAuthenticated().user &&
    auth.isAuthenticated().user._id === user?._id;

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        userId: match.params.userId,
      },
      { token: token },
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
  }, [match.params.userId, token]);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }
  return (
    <Paper className={classes.root} elevation={4}>
      <span className={classes.topSection}>
        <Typography variant="h6" className={classes.title}>
          Profile
        </Typography>
        {isUser && (
          <Tooltip title="Edit Profile">
            <Link to={`/user/edit/${user._id}`}>
              <EditIcon color="primary" />
            </Link>
          </Tooltip>
        )}
      </span>

      <Card className={classes.card}>
        <div className={classes.infoContainer}>
          <div>
            <span className={classes.infoText}>
              <Typography className={classes.infoTitle}>First Name:</Typography>
              <Typography>{user.firstName}</Typography>
            </span>
            <span className={classes.infoText}>
              <Typography className={classes.infoTitle}>Last Name:</Typography>
              <Typography>{user.lastName}</Typography>
            </span>
            <span className={classes.infoText}>
              <Typography className={classes.infoTitle}>Status:</Typography>
              <Typography>Status</Typography>
            </span>
            <span className={classes.infoText}>
              <Typography className={classes.infoTitle}>
                Member Since:
              </Typography>
              <Typography>{new Date(user.createdAt).toDateString()}</Typography>
            </span>
          </div>
          <img
            className={classes.profileImage}
            src={profileImage}
            alt="profile"
          />
        </div>
        <Divider />
        <div className={classes.auctionsInfo}>
          <div className={classes.auctionInfoSection}>
            <Typography variant="h3">200</Typography>
            <Typography>Auctions Posted</Typography>
          </div>
          <div className={classes.auctionInfoSection}>
            <Typography variant="h3">100</Typography>
            <Typography>Sold Auctions</Typography>
          </div>
          <div className={classes.auctionInfoSection}>
            <Typography variant="h3">230</Typography>
            <Typography>Won Auctions</Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.stripeInfo}>
          <span>
            {isUser && (
              <>
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
              </>
            )}
          </span>
        </div>
      </Card>

      {/* <List dense>
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
      </List> */}
    </Paper>
  );
}

export default Profile;
