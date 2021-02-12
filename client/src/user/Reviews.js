import {
  Card,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../auth/auth-helper";
import { listReviews } from "./api-user";

const useStyles = makeStyles((theme) => ({
  paper: theme.mixins.gutters({
    maxWidth: 700,
    margin: "auto",
    padding: theme.spacing(3),
    backgroundColor: "#80808024",
  }),
  title: {
    margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: "1.2em",
  },
  card: {
    backgroundColor: "#586261",
  },
  noRevies: {
    margin: theme.spacing(2),
  },
  reviewContainer: {
    padding: theme.spacing(2),
  },
  reviewHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2),
  },
}));

function Reviews({ userId }) {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);
  const { token } = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listReviews({ userId }, { token }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setReviews(data);
      }
    });
  }, [userId, token]);
  return (
    <Paper className={classes.paper}>
      <Typography className={classes.title}>Reviews</Typography>
      {reviews.length ? (
        <>
          {reviews.map((review) => (
            <div key={review._id}>
              <Card className={classes.reviewContainer}>
                <div>
                  <div className={classes.reviewHeader}>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/user/${review.customer._id}`}
                    >
                      <Typography
                        style={{ fontWeight: "700" }}
                      >{`${review.customer.firstName} ${review.customer.lastName}`}</Typography>
                    </Link>

                    <Typography>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                  </div>
                  <div>
                    <Rating name="read-only" value={review.rating} readOnly />
                    <Typography>{review.review}</Typography>
                  </div>
                </div>
              </Card>
              <Divider />
            </div>
          ))}
        </>
      ) : (
        <Card>
          <Typography className={classes.noRevies}>No Reviews :)</Typography>
        </Card>
      )}
    </Paper>
  );
}

export default Reviews;
