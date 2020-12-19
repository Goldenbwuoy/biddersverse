import {
  Card,
  Icon,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Elements } from "react-stripe-elements";
import auth from "../auth/auth-helper";
import PlaceOrder from "./PlaceOrder";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "0px 0px",
    padding: "16px 40px 90px 40px",
    backgroundColor: "#80808017",
  },
  title: {
    margin: "24px 16px 8px 0px",
    color: theme.palette.openTitle,
  },
  subheading: {
    color: "rgba(88, 114, 128, 0.87)",
    marginTop: "20px",
  },
  addressField: {
    marginTop: "4px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "45%",
  },
  streetField: {
    marginTop: "4px",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "93%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "90%",
  },
}));

function Checkout() {
  const classes = useStyles();
  const { user } = auth.isAuthenticated();
  console.log(user);
  const [values, setValues] = useState({
    checkoutDetails: {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      delivery_address: {
        street: "",
        city: "",
        province: "",
        zipcode: "",
        country: "",
      },
    },

    error: "",
  });

  const handleDetailsChange = (name) => (event) => {
    let checkoutDetails = values.checkoutDetails;
    checkoutDetails[name] = event.target.value || undefined;
    setValues({ ...values, checkoutDetails: checkoutDetails });
  };

  const handleAddressChange = (name) => (event) => {
    let checkoutDetails = values.checkoutDetails;
    checkoutDetails.delivery_address[name] = event.target.value || undefined;
    setValues({ ...values, checkoutDetails: checkoutDetails });
  };

  return (
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Checkout
      </Typography>
      <TextField
        id="first_name"
        label="First Name"
        className={classes.textField}
        value={values.checkoutDetails.first_name}
        onChange={handleDetailsChange("first_name")}
        margin="normal"
      />
      <br />
      <TextField
        id="last_name"
        label="Last Name"
        className={classes.textField}
        value={values.checkoutDetails.last_name}
        onChange={handleDetailsChange("last_name")}
        margin="normal"
      />
      <br />
      <TextField
        id="email"
        type="email"
        label="Email"
        className={classes.textField}
        value={values.checkoutDetails.email}
        onChange={handleDetailsChange("email")}
        margin="normal"
      />
      <br />
      <Typography
        type="subheading"
        component="h3"
        className={classes.subheading}
      >
        Delivery Address
      </Typography>
      <TextField
        id="street"
        label="Street Address"
        className={classes.streetField}
        value={values.checkoutDetails.delivery_address.street}
        onChange={handleAddressChange("street")}
        margin="normal"
      />
      <br />
      <TextField
        id="city"
        label="City"
        className={classes.addressField}
        value={values.checkoutDetails.delivery_address.city}
        onChange={handleAddressChange("city")}
        margin="normal"
      />
      <TextField
        id="provice"
        label="Province"
        className={classes.addressField}
        value={values.checkoutDetails.delivery_address.province}
        onChange={handleAddressChange("province")}
        margin="normal"
      />
      <br />
      <TextField
        id="zipcode"
        label="Zip Code"
        className={classes.addressField}
        value={values.checkoutDetails.delivery_address.zipcode}
        onChange={handleAddressChange("zipcode")}
        margin="normal"
      />
      <TextField
        id="country"
        label="Country"
        className={classes.addressField}
        value={values.checkoutDetails.delivery_address.country}
        onChange={handleAddressChange("country")}
        margin="normal"
      />
      <br />{" "}
      {values.error && (
        <Typography component="p" color="error">
          <Icon color="error" className={classes.error}>
            error
          </Icon>
          {values.error}
        </Typography>
      )}
      <div>
        <Elements>
          <PlaceOrder />
        </Elements>
      </div>
    </Card>
  );
}

export default Checkout;
