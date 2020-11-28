import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  endTime: {
    fontSize: "0.75em",
    color: "#323232",
    fontWeight: 300,
  },
  subheading: {
    margin: "16px",
    color: theme.palette.openTitle,
  },
}));

const calculateTimeLeft = (date) => {
  const difference = date - new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      timeEnd: false,
    };
  } else {
    timeLeft = { timeEnd: true };
  }
  return timeLeft;
};

function Timer({ endTime, update }) {
  const classes = useStyles();
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(new Date(endTime))
  );

  useEffect(() => {
    let timer = null;
    if (!timeLeft.timeEnd) {
      timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(new Date(endTime)));
      }, 1000);
    } else {
      update();
    }

    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <div className={classes.subheading}>
      {!timeLeft.timeEnd ? (
        <Typography component="p" variant="h6">
          {timeLeft.days !== 0 && `${timeLeft.days} d `}
          {timeLeft.hours !== 0 && `${timeLeft.hours} h `}
          {timeLeft.minutes !== 0 && `${timeLeft.minutes} m `}
          {timeLeft.seconds !== 0 && `${timeLeft.seconds} s`} left{" "}
          <span className={classes.endTime}>{`(ends at ${new Date(
            endTime
          ).toLocaleString()})`}</span>
        </Typography>
      ) : (
        <Typography component="p" variant="h6">
          Auction ended
        </Typography>
      )}
    </div>
  );
}

export default Timer;
