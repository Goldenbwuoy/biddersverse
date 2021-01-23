import {
  Card,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import HomeImage from "../../assets/images/homeImage.PNG";
import RecentOrders from "../orders/RecentOrders";

const useStyles = makeStyles((theme) => ({
  imageCard: {
    maxWidth: 1000,
  },
  media: {
    minHeight: 400,
  },
  content: {
    flexGrow: 1,
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  links: {
    textDecoration: "none",
    color: "white",
  },
}));

function Home() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Image */}
          <Grid item xs={12} md={8} lg={9}>
            <Card className={classes.imageCard}>
              <CardMedia className={classes.media} image={HomeImage} />
            </Card>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>{/* <Deposits /> */}</Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <RecentOrders />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

export default Home;
