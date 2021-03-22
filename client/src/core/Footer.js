import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    position: "sticky",
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const Copyright = () => (
  <div>
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link style={{ textDecoration: "none" }} color="inherit" to="/">
        Biddersverse
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  </div>
);

function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </footer>
  );
}

export default Footer;
