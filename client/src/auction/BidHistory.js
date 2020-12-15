import {
  Button,
  Card,
  Dialog,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import auth from "../auth/auth-helper";
import maskIds from "../helpers/user-helper";

const useStyles = makeStyles((theme) => ({
  bidHistory: {
    backgroundColor: "#f3f3f3",
    padding: "16px",
    margin: "20px",
    maxWidth: 600,
  },
  close: {
    float: "right",
    cursor: "pointer",
  },
  heading: {
    fontSize: 20,
    paddingBottom: "10px",
  },
  historyButton: {
    margin: "16px",
  },
}));

function BidHistory({ bids }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        className={classes.historyButton}
        onClick={handleOpen}
      >
        Show Bid History
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
      >
        <Card className={classes.bidHistory}>
          <Typography className={classes.heading}>
            All bids
            <span className={classes.close}>
              <CloseIcon
                color="secondary"
                onClick={handleClose}
                aria-label="close"
              />
            </span>
          </Typography>
          <Divider />

          <br />
          <Grid container spacing={4}>
            <Grid item xs={3} sm={3}>
              <Typography variant="subtitle1" color="primary">
                Bid Amount
              </Typography>
            </Grid>
            <Grid item xs={5} sm={5}>
              <Typography variant="subtitle1" color="primary">
                Bid Time
              </Typography>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Typography variant="subtitle1" color="primary">
                Bidder
              </Typography>
            </Grid>
          </Grid>
          {bids.map((item, index) => {
            return (
              <Grid container spacing={4} key={index}>
                <Grid item xs={3} sm={3}>
                  <Typography variant="body2">${item.bid}</Typography>
                </Grid>
                <Grid item xs={5} sm={5}>
                  <Typography variant="body2">
                    {new Date(item.time).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  {item.bidder._id === auth?.isAuthenticated().user._id ? (
                    <Typography style={{ color: "#3F4771", fontWeight: "700" }}>
                      You
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      {maskIds(item.bidder._id)}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            );
          })}
        </Card>
      </Dialog>
    </div>
  );
}

export default BidHistory;
