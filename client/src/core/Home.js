import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Categories from "./../auction/Categories";
import { listLatest } from "../auction/api-auction";
import Suggestions from "../auction/Suggestions";
import HomeImage from "../assets/images/homeImage.PNG";
import PopularAuctions from "../auction/PopularAuctions";
import { Card, CardMedia } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  imageCard: {
    maxWidth: "100%",
  },
  media: {
    minHeight: 450,
  },
}));

function Home() {
  const classes = useStyles();
  const [latestAuctions, setLatestAuctions] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listLatest(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setLatestAuctions(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={8}>
          <Card className={classes.imageCard}>
            <CardMedia className={classes.media} image={HomeImage} />
          </Card>
          <PopularAuctions />
        </Grid>
        <Grid item xs={4} sm={4}>
          <Suggestions auctions={latestAuctions} title="Latest Auctions" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
