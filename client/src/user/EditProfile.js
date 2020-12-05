import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core/styles";
import auth from "./../auth/auth-helper";
import { read, update } from "./api-user.js";
import { Redirect } from "react-router-dom";
import { Avatar, FormControlLabel, Switch } from "@material-ui/core";
import defaultImage from "../assets/images/profile-pic.png";

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

function EditProfile({ match }) {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    about: "",
    photo: "",
    password: "",
    email: "",
    phoneNumber: "",
    seller: false,
    error: "",
    id: "",
    redirectToProfile: false,
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read(
      {
        userId: match.params.userId,
      },
      { token: jwt.token },
      signal
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          id: data._id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          about: data.about,
          seller: data.seller,
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  const clickSubmit = () => {
    let userData = new FormData();
    values.firstName && userData.append("firstName", values.firstName);
    values.lastName && userData.append("lastName", values.lastName);
    values.email && userData.append("email", values.email);
    values.phoneNumber && userData.append("phoneNumber", values.phoneNumber);
    values.passoword && userData.append("passoword", values.passoword);
    values.about && userData.append("about", values.about);
    values.seller && userData.append("seller", values.seller);
    values.photo && userData.append("photo", values.photo);
    update(
      {
        userId: match.params.userId,
      },
      {
        token: jwt.token,
      },
      userData
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        auth.updateUser(data, () => {
          setValues({ ...values, userId: data._id, redirectToProfile: true });
        });
      }
    });
  };
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleCheck = (event, checked) => {
    setValues({ ...values, seller: checked });
  };

  const url = "http://localhost:5000";
  const photoUrl = values.id
    ? `${url}/api/users/photo/${values.id}?${new Date().getTime()}`
    : defaultImage;

  if (values.redirectToProfile) {
    return <Redirect to={"/user/" + values.userId} />;
  }
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Edit Profile
        </Typography>
        <Avatar src={photoUrl} className={classes.bigAvatar} />
        <br />
        <input
          accept="image/*"
          onChange={handleChange("photo")}
          className={classes.input}
          id="icon-button-file"
          type="file"
        />
        <label htmlFor="icon-button-file">
          <Button variant="contained" color="default" component="span">
            Upload
            <FileUpload />
          </Button>
        </label>
        <span className={classes.filename}>
          {values.photo ? values.photo.name : ""}
        </span>
        <br />
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
          id="multiline-flexible"
          label="About"
          className={classes.textField}
          multiline
          rows="2"
          value={values.about}
          onChange={handleChange("about")}
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
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}

export default EditProfile;
