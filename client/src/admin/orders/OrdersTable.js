import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";

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

function OrdersTable({ orders }) {
  return (
    <div>
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
    </div>
  );
}

export default OrdersTable;
