import {
  Divider,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAuctionImage } from "../helpers/auction-helper";
import { getStatusValues, update } from "./api-order";
import auth from "../auth/auth-helper";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
    paddingBottom: 0,
  },
  listImg: {
    width: "70px",
    verticalAlign: "top",
    marginRight: "10px",
  },
  listDetails: {
    display: "inline-block",
  },
  listQty: {
    margin: 0,
    fontSize: "0.9em",
    color: "#5f7c8b",
  },
  textField: {
    width: "160px",
    marginRight: "16px",
  },
  statusMessage: {
    position: "absolute",
    zIndex: "12",
    right: "5px",
    padding: "5px",
  },
}));

function OrderUpdate({ order }) {
  const classes = useStyles();
  const { token, user } = auth.isAuthenticated();
  const [values, setValues] = useState({
    open: 0,
    statusValues: [],
    error: "",
    status: "",
  });

  useEffect(() => {
    const abortcontroller = new AbortController();
    const signal = abortcontroller.signal;
    getStatusValues(signal).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: "Could not get status" });
      } else {
        setValues({
          ...values,
          statusValues: data,
          error: "",
          status: order.status,
        });
      }
    });
    return function cleanup() {
      abortcontroller.abort();
    };
  }, []);

  const handleStatusChange = (event) => {
    setValues({ ...values, status: event.target.value });

    if (event.target.value === "Processing") {
      update(
        { orderId: order._id },
        { token: token },
        {
          status: event.target.value,
        }
      );
    } else {
      update(
        { orderId: order._id },
        { token: token },
        { status: event.target.value }
      ).then((data) => {
        if (data && data.error) {
          setValues({ ...values, error: data.error });
        } else {
          console.log("Updated");
        }
      });
    }
  };

  return (
    <div>
      <Typography
        component="span"
        color="error"
        className={classes.statusMessage}
      >
        {values.error}
      </Typography>
      <List disablePadding style={{ backgroundColor: "#f8f8f8" }}>
        <ListItem button className={classes.nested}>
          <ListItemText
            primary={
              <div>
                <img
                  className={classes.listImg}
                  src={getAuctionImage(order.auction)}
                />
                <div className={classes.listDetails}>
                  {order.auction.itemName}
                </div>
              </div>
            }
          />
          <TextField
            id="select-status"
            select
            label="Update Status"
            className={classes.textField}
            value={values.status}
            onChange={handleStatusChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            {values.statusValues.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </ListItem>
        <Divider style={{ margin: "auto", width: "80%" }} />
      </List>
    </div>
  );
}

export default OrderUpdate;
