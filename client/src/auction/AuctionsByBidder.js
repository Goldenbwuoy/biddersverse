import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import auth from "../auth/auth-helper";
import AuctionsGrid from "./AuctionsGrid";
import { listByBidder } from "./api-auction";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 1200,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    backgroundColor: "#80808024",
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.openTitle,
    fontSize: "1.2em",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
}));

function AuctionsByBidder({ location }) {
  const classes = useStyles();
  const [auctions, setAuctions] = useState([]);
  const { token, user } = auth.isAuthenticated();
  const status = location.pathname.split("/")[2];

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listByBidder(
      {
        userId: user._id,
        status: status,
      },
      { token: token },
      signal
    ).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setAuctions(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [user.id, status]);
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          {status && status === "all"
            ? "All Placed Bids"
            : status === "live"
            ? "Live Bids"
            : "Won Bids"}
        </Typography>
        <AuctionsGrid products={auctions} searched={false} />
      </Paper>
    </div>
  );
}

export default AuctionsByBidder;
