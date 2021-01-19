import React, { useState, useEffect } from "react";
import {
  Divider,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import auth from "../../auth/auth-helper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { listAuctions } from "../api-admin";

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

const getStatus = (auction) => {
  let currentDate = new Date();
  let status = "";
  if (currentDate < new Date(auction.bidStart)) {
    status = "Not started";
  } else if (
    currentDate > new Date(auction.bidStart) &&
    currentDate < new Date(auction.bidEnd)
  ) {
    status = "Live";
  } else if (currentDate > new Date(auction.bidEnd)) {
    if (auction.bids.length > 0) {
      status = "Sold";
    } else {
      status = "Ended (No Bids)";
    }
  }
  return status;
};

function Auctions() {
  const [auctions, setAuctions] = useState([]);
  const classes = useStyles();
  const { token } = auth.isAdminAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listAuctions({ token: token }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setAuctions(data);
      }
    });
  }, []);
  console.log(auctions);
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Auctions
        </Typography>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell>Seller</StyledTableCell>
              <StyledTableCell>Start Time</StyledTableCell>
              <StyledTableCell>End Time</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Bids Placed</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {auctions.map((auction) => (
              <StyledTableRow key={auction._id}>
                <StyledTableCell>{auction.itemName}</StyledTableCell>
                <StyledTableCell>{`${auction.seller.firstName} ${auction.seller.lastName}`}</StyledTableCell>
                <StyledTableCell>
                  {new Date(auction.bidStart).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(auction.bidEnd).toLocaleString()}
                </StyledTableCell>
                <StyledTableCell>{getStatus(auction)}</StyledTableCell>
                <StyledTableCell>{auction.bids.length}</StyledTableCell>
                <StyledTableCell>
                  <span style={{ display: "flex" }}>
                    <Tooltip title="Edit">
                      <IconButton size="small" color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        style={{ marginLeft: "15px" }}
                        size="small"
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default Auctions;
