import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import ViewIcon from "@material-ui/icons/Visibility";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { getAuctionImage, calculateTimeLeft } from "../helpers/auction-helper";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    padding: theme.spacing(1),
    paddingBottom: 24,
    backgroundColor: "#80808024",
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: "1.1em",
  },
  viewButton: {
    verticalAlign: "middle",
  },
  card: {
    width: "100%",
    display: "inline-flex",
  },
  details: {
    display: "inline-block",
    width: "100%",
  },
  content: {
    flex: "1 0 auto",
    padding: "16px 8px 0px",
  },
  cover: {
    width: "65%",
    height: 130,
    margin: "8px",
  },
  controls: {
    marginTop: "8px",
  },
  date: {
    color: "rgba(0, 0, 0, 0.4)",
  },
  icon: {
    verticalAlign: "sub",
  },
  iconButton: {
    width: "28px",
    height: "28px",
  },
  productTitle: {
    fontSize: "1.15em",
    marginBottom: "5px",
  },
  subheading: {
    color: "rgba(88, 114, 128, 0.67)",
  },
  actions: {
    float: "right",
    marginRight: "6px",
  },
  price: {
    display: "inline",
    lineHeight: "3",
    paddingLeft: "8px",
    color: theme.palette.text.secondary,
  },
  links: {
    textDecoration: "none",
  },
}));

function Suggestions({ auctions, title }) {
  const currentDate = new Date();
  const showTimeLeft = (date) => {
    let timeLeft = calculateTimeLeft(date);
    return (
      !timeLeft.timeEnd && (
        <span>
          {timeLeft.days !== 0 && `${timeLeft.days} d `}
          {timeLeft.hours !== 0 && `${timeLeft.hours} h `}
          {timeLeft.minutes !== 0 && `${timeLeft.minutes} m `}
          {timeLeft.seconds !== 0 && `${timeLeft.seconds} s `} left
        </span>
      )
    );
  };

  const auctionState = (auction) => {
    return (
      <span>
        {currentDate < new Date(auction.bidStart) &&
          `Auction Starts at ${new Date(auction.bidStart).toLocaleString()}`}
        {currentDate > new Date(auction.bidStart) &&
          currentDate < new Date(auction.bidEnd) && (
            <>
              {`Auction is live | ${auction.bids.length} bids |`} <br />
              {showTimeLeft(new Date(auction.bidEnd))}
            </>
          )}
        {currentDate > new Date(auction.bidStart) &&
          auction.bids.length > 0 &&
          ` | Last bid: $ ${auction.bids[0].bid}`}
      </span>
    );
  };
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          {title}
        </Typography>
        {auctions.map((item, i) => {
          return (
            <span key={i}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cover}
                  image={getAuctionImage(item)}
                  title={item.itemName}
                />
                <div className={classes.details}>
                  <CardContent className={classes.content}>
                    <Link className={classes.links} to={"/auction/" + item._id}>
                      <Typography
                        variant="h3"
                        component="h3"
                        className={classes.productTitle}
                        color="primary"
                      >
                        {item.itemName}
                      </Typography>
                    </Link>
                    <Typography component="p" className={classes.date}>
                      {auctionState(item)}
                    </Typography>
                  </CardContent>
                  <div className={classes.controls}>
                    <Typography
                      type="subheading"
                      component="h3"
                      className={classes.price}
                      color="primary"
                    >
                      {/* $ {item.price} */}
                    </Typography>
                    <span className={classes.actions}>
                      <Link to={"/auction/" + item._id}>
                        <IconButton color="secondary" dense="dense">
                          <ViewIcon className={classes.iconButton} />
                        </IconButton>
                      </Link>
                      {/* <AddToCart item={item} /> */}
                    </span>
                  </div>
                </div>
              </Card>
              <Divider />
            </span>
          );
        })}
      </Paper>
    </div>
  );
}

export default Suggestions;
