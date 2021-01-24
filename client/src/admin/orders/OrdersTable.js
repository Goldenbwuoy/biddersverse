import React from "react";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  table: {
    borderStyle: "solid",
    borderWidth: 0.5,
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

function OrdersTable({ orders }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);
  return (
    <div>
      <Table className={classes.table}>
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
          {orders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((order) => (
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
          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 63 * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={orders.length}
        rowsPerPageOptions={[5, 10, 25]}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default OrdersTable;
