import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import auth from "../auth/auth-helper";
import { deleteAuction } from "./api-auction";

function DeleteAuction({ auction, SetRedirect }) {
  const [open, setOpen] = useState(false);
  const { token } = auth.isAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteAuction(
      {
        auctionId: auction._id,
      },
      { token: token }
    ).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        console.log("auction deleted");
        SetRedirect(true);
      }
    });
  };
  return (
    <span>
      <IconButton
        size="small"
        aria-label="Delete"
        onClick={clickButton}
        color="secondary"
      >
        <DeleteIcon style={{ marginRight: 5 }} /> Delete Auction
      </IconButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"Delete Auction"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete {auction.itemName}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            color="secondary"
            autoFocus="autoFocus"
            onClick={handleDelete}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

export default DeleteAuction;
