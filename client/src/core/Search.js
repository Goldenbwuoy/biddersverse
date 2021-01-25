import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import { searchAuctions } from "../auction/api-auction";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = ({ history }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    search: "",
    results: [],
    redirectToResults: false,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    searchAuctions({ search: values.search || undefined }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          results: data,
          redirectToResults: true,
        });
      }
    });
  };

  if (values.redirectToResults) {
    setValues({
      ...values,
      redirectToResults: false,
    });
    history.push({
      pathname: `/search?query=${values.search}`,
      state: { results: values.results },
    });
  }

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <form onSubmit={handleSearch}>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            value={values.search}
            onChange={(e) => setValues({ ...values, search: e.target.value })}
          />
          <Button
            disabled={!values.search}
            type="submit"
            style={{ display: "none" }}
          ></Button>
        </form>
      </div>
    </div>
  );
};

export default Search;
