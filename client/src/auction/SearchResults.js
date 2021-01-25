import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import AuctionsGrid from "./AuctionsGrid";
import { Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: theme.mixins.gutters({
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
}));

function SearchResults({ location }) {
  const classes = useStyles();
  const results = location.state.results;
  return (
    <div>
      <Paper className={classes.paper}>
        <Typography type="title" className={classes.title}>
          Seach Results
        </Typography>
        <Divider />
        <AuctionsGrid products={results} searched={true} />
      </Paper>
    </div>
  );
}

export default SearchResults;
