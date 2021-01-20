import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { readCategory, updateCategory } from "../api-admin";
import auth from "../../auth/auth-helper";

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
}));

function EditCategory({ match }) {
  const classes = useStyles();
  const { token } = auth.isAdminAuthenticated();
  const [values, setValues] = useState({
    categoryName: "",
    redirectToCategories: false,
    error: "",
  });

  useEffect(() => {
    const abortController = new AbortController();
    readCategory(
      {
        categoryId: match.params.categoryId,
      },
      { token: token }
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categoryName: data.categoryName });
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.categoryId, token]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    const category = {
      categoryName: values.categoryName || undefined,
    };
    updateCategory(
      { categoryId: match.params.categoryId },
      { token: token },
      category
    ).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", redirectToCategories: true });
      }
    });
  };

  if (values.redirectToCategories) {
    return <Redirect to="/admin/categories" />;
  }

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            Update Category
          </Typography>
          <form onSubmit={clickSubmit}>
            <TextField
              id="categoryName"
              label="Category Name"
              className={classes.textField}
              value={values.categoryName}
              onChange={handleChange("categoryName")}
              margin="normal"
            />
            <br />
            <br />{" "}
            {values.error && (
              <Typography component="p" color="error">
                <Icon color="error" className={classes.error}></Icon>
                {values.error}
              </Typography>
            )}
            <CardActions>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className={classes.submit}
              >
                Update
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditCategory;
