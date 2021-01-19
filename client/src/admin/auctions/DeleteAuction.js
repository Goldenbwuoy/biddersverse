import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import auth from "../../auth/auth-helper";
import { Tooltip } from "@material-ui/core";
import { deleteAuction } from "../api-admin";

function DeleteAuction({ auction, removeAuction }) {
  const [open, setOpen] = useState(false);
  const { token } = auth.isAdminAuthenticated();

  const clickButton = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    deleteAuction(
      {
        auctionId: auction._id,
      },
      { token: token }
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setOpen(false);
        removeAuction(auction);
      }
    });
  };
  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <Tooltip title="Delete">
        <IconButton
          size="small"
          aria-label="Delete"
          onClick={clickButton}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Auction"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {`${auction.itemName}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

export default DeleteAuction;
