import { Card, CardMedia, makeStyles } from "@material-ui/core";
import React from "react";
import LoadingImage from "../assets/images/loading.gif";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    top: "50%",
    left: "50%",
    marginTop: "-50px",
    marginLeft: "-100px",
  },
  image: {
    width: "150px",
    objectFit: "contain",
  },
});
function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img className={classes.image} src={LoadingImage} alt="" />
    </div>
  );
}

export default Loading;
