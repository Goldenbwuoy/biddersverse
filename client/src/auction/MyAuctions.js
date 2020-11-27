import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import auth from "../auth/auth-helper";
import { listBySeller } from "./api-auction";
import Auctions from "./Auctions";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
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

function MyAuctions() {
  const classes = useStyles();
  const [auctions, setAuctions] = useState([]);
  const { user, token } = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listBySeller(
      {
        userId: user._id,
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
          Your Auctions
          <span className={classes.addButton}>
            <Link to="/auction/new">
              <Button color="primary" variant="contained">
                <AddIcon className={classes.leftIcon}></AddIcon> New Auction
              </Button>
            </Link>
          </span>
        </Typography>
        <Auctions auctions={auctions} />
      </Paper>
    </div>
  );
}

export default MyAuctions;
