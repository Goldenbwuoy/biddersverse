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
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  withStyles,
} from "@material-ui/core";
import auth from "../../auth/auth-helper";
import EditIcon from "@material-ui/icons/Edit";
import { listAuctions } from "../api-admin";
import DeleteAuction from "./DeleteAuction";
import ViewBids from "./ViewBids";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 1450,
    margin: "auto",
    padding: theme.spacing(1),
    marginBottom: "20px",
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.openTitle,
    fontSize: "1.2em",
  },
  rightIcon: {
    marginLeft: "10px",
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

    return function cleanup() {
      abortController.abort();
    };
  }, [token]);

  const removeAuction = (auction) => {
    const updatedAuctions = [...auctions];
    const index = updatedAuctions.indexOf(auction);
    updatedAuctions.splice(index, 1);
    setAuctions(updatedAuctions);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, auctions.length - page * rowsPerPage);

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Auctions
        </Typography>
        <Divider />
        <Table style={{ borderStyle: "solid" }}>
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
            {auctions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((auction) => (
                <StyledTableRow key={auction._id}>
                  <StyledTableCell>{auction.itemName}</StyledTableCell>
                  <StyledTableCell>{`${auction.seller?.firstName} ${auction.seller?.lastName}`}</StyledTableCell>
                  <StyledTableCell>
                    {new Date(auction.bidStart).toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell>
                    {new Date(auction.bidEnd).toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell>{getStatus(auction)}</StyledTableCell>
                  <StyledTableCell>
                    {/* View bid history button */}
                    <ViewBids auction={auction} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <span style={{ display: "flex" }}>
                      <Tooltip title="Edit">
                        <IconButton
                          style={{ marginRight: "15px" }}
                          size="small"
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <DeleteAuction
                        auction={auction}
                        removeAuction={removeAuction}
                      />
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 63 * emptyRows }}>
                <StyledTableCell colSpan={7} />
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={auctions.length}
          rowsPerPageOptions={[5, 10, 25]}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Auctions;
