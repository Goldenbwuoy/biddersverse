import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AuctionsGrid from "./AuctionsGrid";
import { listOpenByCategory } from "./api-auction";

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

function AuctionsByCategory({ match, location }) {
  const classes = useStyles();
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listOpenByCategory(
      {
        categoryId: match.params.categoryId,
      },
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
  }, [match.params.categoryId]);
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          {location.state.title}
        </Typography>
        <AuctionsGrid products={auctions} searched={false} />
      </Paper>
    </div>
  );
}

export default AuctionsByCategory;
