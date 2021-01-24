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
  TablePagination,
  TableRow,
  TextField,
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
    marginBottom: "20px",
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
  textField: {
    margin: "10px 0",
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, categories.length - page * rowsPerPage);

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
        <TextField
          className={classes.textField}
          value={search}
          onChange={handleSearchChange}
          size="small"
          id="outlined-basic"
          label="Search"
          variant="outlined"
        />
        <Table style={{ borderStyle: "solid" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>categoryName</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories
              .filter(
                (category) => !search || category.categoryName.includes(search)
              )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => (
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
            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 63 * emptyRows }}>
                <StyledTableCell />
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={categories.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Categories;
