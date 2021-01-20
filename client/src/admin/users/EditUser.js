import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import auth from "../../auth/auth-helper";
import { readUser, updateUser } from "../api-admin";
import { Redirect } from "react-router-dom";
import { FormControlLabel, Switch } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
  },
  error: {
    verticalAlign: "middle",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  input: {
    display: "none",
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  filename: {
    marginLeft: "10px",
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
}));

function EditUser({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    seller: false,
    error: "",
    redirectToProfile: false,
  });
  const { token } = auth.isAdminAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    readUser(
      {
        userId: match.params.userId,
      },
      { token: token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          seller: data.seller,
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId, token]);

  const clickSubmit = () => {
    const user = {
      firstName: values.firstName || undefined,
      lastName: values.lastName || undefined,
      email: values.email || undefined,
      phoneNumber: values.phoneNumber,
      seller: values.seller || undefined,
    };
    updateUser(
      {
        userId: match.params.userId,
      },
      {
        token: token,
      },
      user
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, userId: data._id, redirectToProfile: true });
      }
    });
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = (event, checked) => {
    setValues({ ...values, seller: checked });
  };

  if (values.redirectToProfile) {
    return <Redirect to="/admin/users" />;
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit User
        </Typography>
        <TextField
          id="firstName"
          label="First Name"
          className={classes.textField}
          value={values.firstName}
          onChange={handleChange("firstName")}
          margin="normal"
        />
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
        <Typography variant="subtitle1" className={classes.subheading}>
          Seller Account
        </Typography>
        <FormControlLabel
          control={
            <Switch
              classes={{
                checked: classes.checked,
                bar: classes.bar,
              }}
              checked={values.seller}
              onChange={handleCheck}
            />
          }
          label={values.seller ? "Active" : "Inactive"}
        />
        <br />{" "}
        {values.error && (
          <Typography component="p" color="error">
            <Icon color="error" className={classes.error}></Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={clickSubmit}
          className={classes.submit}
        >
          Update
        </Button>
      </CardActions>
    </Card>
  );
}

export default EditUser;
