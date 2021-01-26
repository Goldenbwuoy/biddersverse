import { makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { confirmEmail } from "./api-auth";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(2)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: "1.1em",
  },
  subheading: {
    color: theme.palette.openTitle,
    marginLeft: "24px",
  },
}));
function EmailConfirmation({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    error: false,
    confirming: true,
    confirmed: false,
  });

  const token = match.params.token;
  console.log(token);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    confirmEmail({ token }).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: true, confirming: false });
      } else {
        setValues({ ...values, confirming: false, confirmed: true });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [token]);
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Email Confirmation
        </Typography>
        {values.error && (
          <Typography type="subheading" className={classes.subheading}>
            Confirmation failed
          </Typography>
        )}
        {values.confirming && (
          <Typography type="subheading" className={classes.subheading}>
            Confirming your email please wait....
          </Typography>
        )}
        {values.confirmed && (
          <Typography type="subheading" className={classes.subheading}>
            Email Confirmed, proceed to <Link to="/signin">Sign in</Link>
          </Typography>
        )}
      </Paper>
    </div>
  );
}

export default EmailConfirmation;
