import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { listCategories } from "../category/api-category";
import { searchAuctions } from "./api-auction";
import AuctionsGrid from "./AuctionsGrid";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "auto",
    textAlign: "center",
    paddingTop: 10,
    backgroundColor: "#80808024",
  },
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 350,
    verticalAlign: "bottom",
    marginBottom: "20px",
  },
  searchField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    marginBottom: "20px",
  },
  searchButton: {
    minWidth: "20px",
    height: "30px",
    padding: "0 8px",
    marginBottom: "20px",
  },
}));

function Search() {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({
    category: "",
    search: "",
    results: [],
    searched: false,
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

  const handleSearch = (event) => {
    event.preventDefault();
    if (values.search) {
      searchAuctions({
        search: values.search || undefined,
        category: values.category,
      }).then((data) => {
        if (data && data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, results: data, searched: true });
        }
      });
    }
  };

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <form onSubmit={handleSearch}>
          <TextField
            id="select-category"
            select
            label="Select category"
            className={classes.textField}
            value={values.category}
            onChange={handleChange("category")}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            <MenuItem value="All">All</MenuItem>
            {categories.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.categoryName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="search"
            label="Search products"
            type="search"
            //   onKeyDown={enterKey}
            onChange={handleChange("search")}
            className={classes.searchField}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color={"primary"}
            className={classes.searchButton}
          >
            <SearchIcon />
          </Button>
        </form>

        <Divider />
        <AuctionsGrid products={values.results} searched={values.searched} />
      </Card>
    </div>
  );
}

export default Search;
