import React, { useState, useEffect } from "react";
import {
  Divider,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from "@material-ui/core";
import auth from "../../auth/auth-helper";
import { listOrders } from "../api-admin";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 1450,
    margin: "auto",
    padding: theme.spacing(1),
    // marginTop: theme.spacing(2),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#A5BEBD",
    color: theme.palette.common.black,
    fontWeight: "850",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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

  console.log(orders);

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Orders
        </Typography>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell>Seller</StyledTableCell>
              <StyledTableCell>Buyer</StyledTableCell>
              <StyledTableCell>Winning Bid</StyledTableCell>
              <StyledTableCell>Created On</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <StyledTableRow key={order._id}>
                <StyledTableCell>
                  {order.product.auction.itemName}
                </StyledTableCell>
                <StyledTableCell>{`${order.product.seller.firstName} ${order.product.seller.lastName}`}</StyledTableCell>
                <StyledTableCell>{`${order.user.firstName} ${order.user.lastName}`}</StyledTableCell>
                <StyledTableCell>
                  $ {order.product.auction.bids[0].bid}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell>{order.product.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default Orders;
