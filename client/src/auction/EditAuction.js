import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import auth from "../auth/auth-helper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { Avatar, MenuItem, Select } from "@material-ui/core";
import { listCategories } from "../category/api-category";
import { read, updateAuction } from "./api-auction";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: "1em",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  select: {
    marginTop: 25,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  input: {
    display: "none",
  },
  filename: {
    marginLeft: "10px",
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
}));

const getDateString = (date) => {
  let year = date.getFullYear();
  let day =
    date.getDate().toString().length === 1
      ? "0" + date.getDate()
      : date.getDate();
  let month =
    date.getMonth().toString().length === 1
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let hours =
    date.getHours().toString().length === 1
      ? "0" + date.getHours()
      : date.getHours();
  let minutes =
    date.getMinutes().toString().length === 1
      ? "0" + date.getMinutes()
      : date.getMinutes();
  let dateString = `${year}-${month}-${day}T${hours}:${minutes}`;
  return dateString;
};

function EditAuction({ match }) {
  const classes = useStyles();
  const { token } = auth.isAuthenticated();
  const [categories, setCategories] = useState([]);
  const [redirectToAuction, setRedirectToAuction] = useState(false);
  const [auction, setAuction] = useState({
    itemName: "",
    category: "",
    description: "",
    image: "",
    bidStart: "",
    bidEnd: "",
    startingBid: 0,
  });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listCategories(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ auctionId: match.params.auctionId }, signal).then((data) => {
      if (data.error) {
        // setError(data.error);
      } else {
        data.bidEnd = getDateString(new Date(data.bidEnd));
        data.bidStart = getDateString(new Date(data.bidStart));
        setAuction(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.auctionId]);

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setAuction({ ...auction, [name]: value });
  };

  const handleSubmit = () => {
    let auctionData = new FormData();
    auction.itemName && auctionData.append("itemName", auction.itemName);
    auction.category && auctionData.append("category", auction.category);
    auction.description &&
      auctionData.append("description", auction.description);
    auction.image && auctionData.append("image", auction.image);
    auction.bidStart && auctionData.append("bidStart", auction.bidStart);
    auction.bidEnd && auctionData.append("bidEnd", auction.bidEnd);
    auction.startingBid &&
      auctionData.append("startingBid", auction.startingBid);

    updateAuction(
      { auctionId: auction._id },
      { token: token },
      auctionData
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        console.log("auction updated");
        setRedirectToAuction(true);
      }
    });
  };

  const logoUrl =
    auction._id &&
    `http://localhost:5000/api/auctions/image/${
      auction?._id
    }?${new Date().getTime()}`;

  if (redirectToAuction) {
    return <Redirect to={`/auction/${auction._id}`} />;
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Update Auction
          </Typography>
          <br />
          <Avatar src={logoUrl} className={classes.bigAvatar} />
          <br />
          <input
            accept="image/*"
            onChange={handleChange("image")}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="default" component="span">
              Change Image
              <FileUpload />
            </Button>
          </label>{" "}
          <span className={classes.filename}>
            {auction.image ? auction.image.name : ""}
          </span>
          <br />
          <br />
          <TextField
            id="name"
            label="Item Name"
            className={classes.textField}
            value={auction.itemName}
            onChange={handleChange("itemName")}
            margin="normal"
          />
          <br />
          <Select
            id="device"
            variant="filled"
            // disableUnderline
            className={classes.select}
            value={auction.category}
            onChange={handleChange("category")}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
          <br />
          <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rows="2"
            value={auction.description}
            onChange={handleChange("description")}
            className={classes.textField}
            margin="normal"
          />
          <br />
          <TextField
            id="startingBid"
            label="Starting Bid ($)"
            className={classes.textField}
            value={auction.startingBid}
            onChange={handleChange("startingBid")}
            margin="normal"
          />
          <br />
          <br />
          <TextField
            id="datetime-local"
            label="Auction Start Time"
            type="datetime-local"
            value={auction.bidStart}
            className={classes.textField}
            onChange={handleChange("bidStart")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br />
          <br />
          <TextField
            id="datetime-local"
            label="Auction End Time"
            type="datetime-local"
            value={auction.bidEnd}
            className={classes.textField}
            onChange={handleChange("bidEnd")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br /> <br />
          {/* {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )} */}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            className={classes.submit}
          >
            Update
          </Button>
          <Link to="/myauctions" className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}

export default EditAuction;
