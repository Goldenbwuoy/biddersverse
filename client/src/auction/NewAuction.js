import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FileUpload from "@material-ui/icons/AddPhotoAlternate";
import auth from "../auth/auth-helper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { create } from "./api-auction";
import { MenuItem, Select } from "@material-ui/core";
import { listCategories } from "../category/api-category";
import { getDateString } from "../helpers/auction-helper";

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
}));

function NewAuction() {
  const classes = useStyles();
  const { user, token } = auth.isAuthenticated();
  const [categories, setCategories] = useState([]);
  const currentDate = new Date();
  const defaultStartTime = getDateString(currentDate);
  const defaultEndTime = getDateString(
    new Date(currentDate.setHours(currentDate.getHours() + 1))
  );

  const [values, setValues] = useState({
    itemName: "",
    category: "none",
    description: "",
    image: "",
    bidStart: defaultStartTime,
    bidEnd: defaultEndTime,
    startingBid: 0,
    redirect: false,
    error: "",
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

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = () => {
    if (values.bidEnd < values.bidStart) {
      setValues({ ...values, error: "Auction cannot end before it starts" });
    } else {
      let auctionData = new FormData();
      values.itemName && auctionData.append("itemName", values.itemName);
      values.category !== "none" &&
        auctionData.append("category", values.category);
      values.description &&
        auctionData.append("description", values.description);
      values.image && auctionData.append("image", values.image);
      values.startingBid &&
        auctionData.append("startingBid", values.startingBid);
      values.bidStart && auctionData.append("bidStart", values.bidStart);
      values.bidEnd && auctionData.append("bidEnd", values.bidEnd);
      create(
        {
          userId: user._id,
        },
        {
          token: token,
        },
        auctionData
      ).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, error: "", redirect: true });
        }
      });
    }
  };

  if (values.redirect) {
    return <Redirect to={"/myauctions"} />;
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            New Auction
          </Typography>
          <br />
          <input
            accept="image/*"
            onChange={handleChange("image")}
            className={classes.input}
            id="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <Button variant="contained" color="secondary" component="span">
              Upload Image
              <FileUpload />
            </Button>
          </label>{" "}
          <span className={classes.filename}>
            {values.image ? values.image.name : ""}
          </span>
          <br />
          <TextField
            id="name"
            label="Item Name"
            className={classes.textField}
            value={values.itemName}
            onChange={handleChange("itemName")}
            margin="normal"
          />
          <br />
          <Select
            id="device"
            variant="filled"
            // disableUnderline
            className={classes.select}
            value={values.category}
            onChange={handleChange("category")}
          >
            <MenuItem value="none" disabled>
              Select Category
            </MenuItem>
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
            value={values.description}
            onChange={handleChange("description")}
            className={classes.textField}
            margin="normal"
          />
          <br />
          <TextField
            id="startingBid"
            label="Starting Bid ($)"
            className={classes.textField}
            value={values.startingBid}
            onChange={handleChange("startingBid")}
            margin="normal"
          />
          <br />
          <br />
          <TextField
            id="datetime-local"
            label="Auction Start Time"
            type="datetime-local"
            defaultValue={defaultStartTime}
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
            defaultValue={defaultEndTime}
            className={classes.textField}
            onChange={handleChange("bidEnd")}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br /> <br />
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
          <Link to="/myauctions" className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}

export default NewAuction;
