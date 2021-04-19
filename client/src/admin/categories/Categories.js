import React, { useState, useEffect } from "react";
import {
	Button,
	Divider,
	Fab,
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
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";

const useStyles = makeStyles((theme) => ({
	container: {
		flexGrow: 1,
		overflow: "auto",
		paddingTop: theme.spacing(4),
		marginBottom: theme.spacing(10),
	},
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
	fab: {
		margin: 0,
		top: "auto",
		right: 40,
		bottom: 40,
		left: "auto",
		position: "fixed",
	},
	link: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "white",
		textDecoration: "none",
	},
}));

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: "#A5BEBD",
		color: theme.palette.common.black,
		fontWeight: "800",
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
	const [openCreate, setOpenCreate] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState({});

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

	const openEditDialog = (category) => {
		setSelectedCategory(category);
		setOpenEdit(true);
	};

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

	const updateCategories = (category) => {
		setCategories([...categories, category]);
	};

	const updateCategory = (category) => {
		let categoriesCopy = [...categories];
		const updatedCategories = categoriesCopy.map((currentCategory) =>
			currentCategory._id === category._id
				? {
						...currentCategory,
						categoryName: category.categoryName,
				  }
				: currentCategory
		);
		setCategories(updatedCategories);
		console.log(updatedCategories);
	};

	const emptyRows =
		rowsPerPage -
		Math.min(rowsPerPage, categories.length - page * rowsPerPage);

	return (
		<div className={classes.container}>
			<Paper className={classes.root} elevation={4}>
				<Typography type="title" className={classes.title}>
					Listing Categories
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
				<Table style={{ borderStyle: "solid", borderWidth: 1 }}>
					<TableHead>
						<TableRow>
							<StyledTableCell>Category Name</StyledTableCell>
							<StyledTableCell>Actions</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{categories
							.filter(
								(category) =>
									!search ||
									category.categoryName
										.toLowerCase()
										.includes(search.toLowerCase())
							)
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((category) => (
								<StyledTableRow key={category._id}>
									<StyledTableCell>
										{category.categoryName}
									</StyledTableCell>
									<StyledTableCell>
										<Tooltip title="Edit">
											<IconButton
												style={{
													marginRight: "15px",
												}}
												size="small"
												color="primary"
												onClick={() =>
													openEditDialog(category)
												}
											>
												<EditIcon />
											</IconButton>
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
								<StyledTableCell colSpan={2} />
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
			<Fab
				onClick={() => setOpenCreate(true)}
				className={classes.fab}
				color="primary"
				aria-label="add"
			>
				<AddIcon />
			</Fab>
			<CreateCategory
				open={openCreate}
				setOpen={setOpenCreate}
				updateCategories={updateCategories}
			/>
			<UpdateCategory
				open={openEdit}
				setOpen={setOpenEdit}
				category={selectedCategory}
				editCategory={updateCategory}
			/>
		</div>
	);
}

export default Categories;
