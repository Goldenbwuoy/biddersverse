import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import { createUser } from "../api-admin";
import auth from "../../auth/auth-helper";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  space: {
    flexGrow: 1,
  },
}));

function NewUser() {
  const classes = useStyles();
  const { token } = auth.isAdminAuthenticated();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    open: false,
    error: "",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      email: values.email || undefined,
      phoneNumber: values.phoneNumber || undefined,
      password: values.password || undefined,
    };
    createUser({ token: token }, user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  };

  const closeDialog = () => {
    setValues({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      open: false,
      error: "",
    });
  };
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            New User
          </Typography>
          <form onSubmit={clickSubmit}>
            <TextField
              id="firstName"
              label="First Name"
              className={classes.textField}
              value={values.firstName}
              onChange={handleChange("firstName")}
              margin="normal"
            />
            <br />
            <TextField
              id="lastName"
              label="Last Name"
              className={classes.textField}
              value={values.lastName}
              onChange={handleChange("lastName")}
              margin="normal"
            />
            <br />
            <TextField
              id="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={values.email}
              onChange={handleChange("email")}
              margin="normal"
            />
            <br />
            <TextField
              id="phoneNumber"
              label="Mobile Phone"
              className={classes.textField}
              value={values.phoneNumber}
              onChange={handleChange("phoneNumber")}
              margin="normal"
            />
            <br />
            <TextField
              id="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={values.password}
              onChange={handleChange("password")}
              margin="normal"
            />
            <br />{" "}
            {values.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}></Icon>
                {values.error}
              </Typography>
            )}
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className={classes.submit}
              >
                Create
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New User</DialogTitle>
        <DialogContent>
          <DialogContentText>New User successfully created.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/admin/users">
            <Button
              style={{ textTransform: "capitalize" }}
              color="primary"
              variant="contained"
            >
              Exit
            </Button>
          </Link>
          <Typography className={classes.space}></Typography>
          <Button
            style={{ textTransform: "capitalize" }}
            onClick={closeDialog}
            color="primary"
            variant="contained"
          >
            Add New
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewUser;
