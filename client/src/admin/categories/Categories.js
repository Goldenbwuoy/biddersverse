import React, { useState, useEffect } from "react";
import {
  Button,
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
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import auth from "../../auth/auth-helper";
import { listCategories } from "../api-admin";
import DeleteCategory from "./DeleteCategory";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(1),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.openTitle,
    fontSize: "1.2em",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
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

function Categories() {
  const [categories, setCategories] = useState([]);
  const { token } = auth.isAdminAuthenticated();
  const classes = useStyles();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    listCategories({ token: token }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [token]);

  const removeCategory = (category) => {
    const updatedCategories = [...categories];
    const index = updatedCategories.indexOf(category);
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Product Categories
          <span className={classes.addButton}>
            <Link to="/admin/create/category">
              <Button color="primary" variant="contained">
                <AddIcon className={classes.leftIcon}></AddIcon> New Category
              </Button>
            </Link>
          </span>
        </Typography>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>categoryName</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <StyledTableRow key={category._id}>
                <StyledTableCell>{category.categoryName}</StyledTableCell>
                <StyledTableCell>
                  <Tooltip title="Edit">
                    <Link to={`/admin/edit/category/${category._id}`}>
                      <IconButton
                        style={{ marginRight: "15px" }}
                        size="small"
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <DeleteCategory
                    category={category}
                    removeCategory={removeCategory}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default Categories;
