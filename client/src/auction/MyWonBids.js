import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import auth from "../auth/auth-helper";
import AuctionsGrid from "./AuctionsGrid";
import { listWonByBidder } from "./api-auction";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 1200,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
}));

function MyWonBids({ match }) {
  const classes = useStyles();
  const [auctions, setAuctions] = useState([]);
  const { token } = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listWonByBidder(
      {
        userId: match.params.userId,
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
  }, []);
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your Won Bids
        </Typography>
        <AuctionsGrid products={auctions} searched={false} />
      </Paper>
    </div>
  );
}

export default MyWonBids;
