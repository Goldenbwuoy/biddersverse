import {
  Button,
  Card,
  Dialog,
  IconButton,
  makeStyles,
  Typography,
  DialogContent,
  DialogTitle,
  Box,
  TextField,
  FormControlLabel,
  Switch,
  Tooltip,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React, { useState } from "react";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { submitReview } from "./api-order";
import auth from "../auth/auth-helper";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f3f3f3",
    padding: "16px",
    margin: "10px",
    maxWidth: 800,
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px",
  },
  textField: { marginTop: "20px", maxWidth: 800 },
  review: {
    color: "rgb(53, 97, 85)",
  },
}));

function Review({ order }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const { token } = auth.isAuthenticated();
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = (event, checked) => {
    setAnonymous(checked);
  };

  const handleSubmit = () => {
    let post = {
      rating: rating || undefined,
      review: review || undefined,
      anonymous: anonymous || undefined,
    };

    submitReview({ orderId: order._id }, { token: token }, post).then(
      (data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          console.log("review created");
          setOpen(false);
        }
      }
    );
  };

  console.log(anonymous);
  return (
    <div>
      <IconButton onClick={handleOpen} className={classes.review} size="small">
        <RateReviewIcon style={{ marginRight: "10px" }} />
        Write a Review
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        disableBackdropClick={true}
      >
        <DialogTitle>Submit A Review</DialogTitle>
        <DialogContent>
          <Card className={classes.root}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Typography component="legend">Rating Score</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                precision={0.5}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>
            <br />
            <Typography variant="subtitle1" className={classes.subheading}>
              Anonymous
            </Typography>
            <Tooltip title="Display or Hide your name in the Seller's Reviews">
              <FormControlLabel
                control={
                  <Switch
                    classes={{
                      checked: classes.checked,
                      bar: classes.bar,
                    }}
                    checked={anonymous}
                    onChange={handleCheck}
                  />
                }
                label={anonymous ? "Hidden" : "Public"}
              />
            </Tooltip>

            <br />
            <TextField
              className={classes.textField}
              id="outlined-multiline-static"
              label="Write Review"
              value={review}
              multiline
              fullWidth
              rows={5}
              variant="outlined"
              onChange={(event) => setReview(event.target.value)}
            />
          </Card>
        </DialogContent>
        <span className={classes.actions}>
          <Button
            style={{ textTransform: "capitalize" }}
            color="primary"
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{ textTransform: "capitalize" }}
            color="primary"
            variant="contained"
            disabled={rating === 0 && review === ""}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </span>
      </Dialog>
    </div>
  );
}

export default Review;
