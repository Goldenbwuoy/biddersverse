import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import auth from "../auth/auth-helper";
import { makeStyles } from "@material-ui/core/styles";
import SocketIOClient from "socket.io-client";
import BidHistory from "./BidHistory";
const endpoint = "http://127.0.0.1:5000";

const useStyles = makeStyles((theme) => ({
  placeForm: {
    margin: "0px 16px 16px",
    backgroundColor: "#e7ede4",
    display: "inline-block",
  },
  marginInput: {
    margin: 16,
  },
  marginBtn: {
    margin: "8px 16px 16px",
  },
}));

let socket;

function Bidding(props) {
  const classes = useStyles();
  const [bid, setBid] = useState("");
  const { user } = auth.isAuthenticated();

  useEffect(() => {
    socket = SocketIOClient(endpoint);
    socket.emit("join auction room", { room: props.auction._id });
    return () => {
      socket.emit("leave auction room", {
        room: props.auction._id,
      });
    };
  }, [props.auction._id]);

  useEffect(() => {
    socket.on("new bid", (payload) => {
      props.updateBids(payload);
    });

    return () => {
      socket.off("new bid");
    };
  });

  const handleChange = (event) => {
    setBid(event.target.value);
  };

  const placeBid = () => {
    let newBid = {
      bid: bid,
      time: new Date(),
      bidder: user,
    };
    socket.emit("new bid", {
      room: props.auction._id,
      bidInfo: newBid,
    });
    console.log(newBid);
    setBid("");
  };

  const minBid =
    props.auction.bids && props.auction.bids.length > 0
      ? props.auction.bids[0].bid
      : props.auction.startingBid;

  return (
    <div>
      {!props.justEnded && new Date() < new Date(props.auction.bidEnd) && (
        <div className={classes.placeForm}>
          <TextField
            id="bid"
            label="Your Bid ($)"
            value={bid}
            onChange={handleChange}
            type="number"
            margin="normal"
            helperText={`Enter $${Number(minBid) + 1} or more`}
            className={classes.marginInput}
          />
          <br />
          <Button
            variant="contained"
            className={classes.marginBtn}
            color="secondary"
            disabled={bid < minBid + 1}
            onClick={placeBid}
          >
            Place Bid
          </Button>
          <br />
        </div>
      )}
      {props.auction.bids.length > 0 && (
        <BidHistory bids={props.auction.bids} />
      )}
    </div>
  );
}

export default Bidding;
