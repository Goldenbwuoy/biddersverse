import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { listRelated, read } from "./api-auction.js";
import { Link, Redirect } from "react-router-dom";
import auth from "../auth/auth-helper.js";
import Timer from "./Timer.js";
import Bidding from "./Bidding.js";
import AuctionSettingsMenu from "./AuctionSettingsMenu";
import { getAuctionImage } from "../helpers/auction-helper.js";
import Suggestions from "./Suggestions.js";
import Chat from "./chat/Chat.js";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  flex: {
    display: "flex",
  },
  card: {
    padding: "24px 40px 40px",
  },
  subheading: {
    margin: "16px",
    color: theme.palette.openTitle,
  },
  description: {
    margin: "16px",
    fontSize: "0.9em",
    color: "#4f4f4f",
  },
  price: {
    padding: "16px",
    margin: "16px 0px",
    display: "flex",
    backgroundColor: "#93c5ae3d",
    fontSize: "1.3em",
    color: "#375a53",
  },
  media: {
    height: 300,
    display: "inline-block",
    width: "100%",
  },
  icon: {
    verticalAlign: "sub",
  },
  link: {
    color: "#3e4c54b3",
    fontSize: "0.9em",
  },
  itemInfo: {
    width: "35%",
    margin: "16px",
  },
  bidSection: {
    margin: "20px",
    minWidth: "50%",
  },
  lastBid: {
    color: "#303030",
    margin: "16px",
  },
}));

function Auction({ match }) {
  const classes = useStyles();
  const [auction, setAuction] = useState({});
  const [error, setError] = useState("");
  const [relatedAuctions, setRelatedAuctions] = useState([]);
  const [justEnded, setJustEnded] = useState(false);
  const [redirectToMyAuctions, setRedirectToMyAuctions] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ auctionId: match.params.auctionId }, signal).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setAuction(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.auctionId]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listRelated({ auctionId: match.params.auctionId }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setRelatedAuctions(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.auctionId]);

  const updateBids = (updatedAuction) => {
    setAuction(updatedAuction);
  };

  const update = () => {
    setJustEnded(true);
  };

  if (redirectToMyAuctions) {
    return <Redirect to="/myauctions" />;
  }

  const currentDate = new Date();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={8}>
          <Card className={classes.card}>
            <CardHeader
              title={auction.itemName}
              subheader={
                <>
                  <span>
                    {currentDate < new Date(auction.bidStart) &&
                      "Auction Not Started"}
                    {currentDate > new Date(auction.bidStart) &&
                      currentDate < new Date(auction.bidEnd) &&
                      "Auction Live"}
                    {currentDate > new Date(auction.bidEnd) && "Auction Ended"}
                  </span>
                  {auth.isAuthenticated().user &&
                    auth.isAuthenticated().user._id === auction.seller?._id && (
                      <span style={{ float: "right" }}>
                        <AuctionSettingsMenu
                          auction={auction}
                          SetRedirect={setRedirectToMyAuctions}
                        />
                      </span>
                    )}
                </>
              }
            />
            <Grid container spacing={6}>
              <Grid item xs={5} sm={5}>
                <CardMedia
                  className={classes.media}
                  image={getAuctionImage(auction)}
                  title={auction.itemName}
                />
                <Typography
                  component="p"
                  variant="subtitle1"
                  className={classes.subheading}
                >
                  About Item
                </Typography>
                <Typography component="p" className={classes.description}>
                  {auction.description}
                </Typography>
              </Grid>

              <Grid item xs={7} sm={7}>
                {currentDate > new Date(auction.bidStart) ? (
                  <>
                    <Timer endTime={auction.bidEnd} update={update} />
                    {auction.bids.length > 0 && (
                      <Typography
                        component="p"
                        variant="subtitle1"
                        className={classes.lastBid}
                      >
                        {` Last bid: $ ${auction.bids[0].bid}`}
                      </Typography>
                    )}
                    {!auth.isAuthenticated() && (
                      <Typography style={{ padding: "16px" }}>
                        Please, <Link to="/signin">sign in</Link> to place your
                        bid.
                      </Typography>
                    )}
                    {auth.isAuthenticated() && (
                      <Bidding
                        auction={auction}
                        justEnded={justEnded}
                        updateBids={updateBids}
                      />
                    )}
                  </>
                ) : (
                  <Typography
                    component="p"
                    variant="h6"
                  >{`Auction Starts at ${new Date(
                    auction.bidStart
                  ).toLocaleString()}`}</Typography>
                )}
              </Grid>
            </Grid>
          </Card>
          {/* <Chat
            auction={auction}
            justEnded={justEnded}
            updateBids={updateBids}
          /> */}
        </Grid>
        <Grid item xs={4} sm={4}>
          {/* <Suggestions auctions={relatedAuctions} title="Related Auctions" /> */}
          <Chat
            auction={auction}
            justEnded={justEnded}
            updateBids={updateBids}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Auction;
