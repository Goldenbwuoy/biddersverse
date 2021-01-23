import React, { useState, useEffect } from "react";
import { Divider, makeStyles, Paper, Typography } from "@material-ui/core";
import auth from "../../auth/auth-helper";
import { listOrders } from "../api-admin";
import OrdersTable from "./OrdersTable";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 1450,
    margin: "auto",
    padding: theme.spacing(1),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
}));

function Orders() {
  const [orders, setOrders] = useState([]);
  const { token } = auth.isAdminAuthenticated();
  const classes = useStyles();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listOrders({ token: token }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  }, [token]);

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Orders
        </Typography>
        <Divider />
        <OrdersTable orders={orders} />
      </Paper>
    </div>
  );
}

export default Orders;
