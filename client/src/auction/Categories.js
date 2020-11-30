import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { listOpenByCategory } from "./api-auction";
import AuctionsGrid from "./AuctionsGrid";
import { listCategories } from "../category/api-category";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    background: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    width: "100%",
    transform: "translateZ(0)",
  },
  tileTitle: {
    verticalAlign: "middle",
    lineHeight: 2.5,
    textAlign: "center",
    fontSize: "1.35em",
    margin: "0 4px 0 0",
  },
  card: {
    margin: "auto",
    marginTop: 20,
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(
      2
    )}px`,
    color: theme.palette.openTitle,
    backgroundColor: "#80808024",
    fontSize: "1.1em",
  },
  icon: {
    verticalAlign: "sub",
    color: "#738272",
    fontSize: "0.9em",
  },
  link: {
    color: "#4d6538",
    textShadow: "0px 2px 12px #ffffff",
    cursor: "pointer",
    fontSize: "15px",
  },
}));

function Categories() {
  const classes = useStyles();
  const [selected, setSelected] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [products, setProducts] = useState([]);

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
          return null;
        });
        setCategoryNames(names);
        setCategoryIds(ids);
        setSelected(names[0]);

        listOpenByCategory({
          categoryId: ids[0],
        }).then((data) => {
          if (data && data.error) {
            console.log(data.error);
          } else {
            setProducts(data);
          }
        });
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const listbyCategory = (category) => (event) => {
    setSelected(categoryNames[categoryIds.indexOf(category)]);
    listOpenByCategory({
      categoryId: category,
    }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  return (
    <div>
      <Card className={classes.card}>
        <Typography type="title" className={classes.title}>
          Explore Auctions by category
        </Typography>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={4}>
            {categoryNames.map((tile, i) => (
              <GridListTile
                key={i}
                className={classes.tileTitle}
                style={{
                  height: "64px",
                  backgroundColor:
                    selected === tile
                      ? "rgba(95, 139, 137, 0.56)"
                      : "rgba(95, 124, 139, 0.32)",
                }}
              >
                <span
                  className={classes.link}
                  onClick={listbyCategory(
                    categoryIds[categoryNames.indexOf(tile)]
                  )}
                >
                  {tile}
                </span>
              </GridListTile>
            ))}
          </GridList>
        </div>
        <Divider />
        <AuctionsGrid products={products} searched={false} />
      </Card>
    </div>
  );
}

export default Categories;
