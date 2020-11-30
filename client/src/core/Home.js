import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Categories from "./../auction/Categories";
import { listCategories } from "../category/api-category";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
}));

function Home() {
  const classes = useStyles();
  const [categoryIds, setCategoryIds] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listCategories(signal).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        let names = [],
          ids = [];
        data.map((item) => {
          names.push(item.categoryName);
          ids.push(item._id);
        });
        setCategoryNames(names);
        setCategoryIds(ids);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={8}>
          <Categories categoryNames={categoryNames} categoryIds={categoryIds} />
        </Grid>
        <Grid item xs={4} sm={4}>
          <Typography>Suggested Products</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
