import {
	Button,
	Container,
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
import React, { useState, useEffect } from "react";
import auth from "../../auth/auth-helper";
import { listUsers } from "../api-admin";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteUser from "./DeleteUser";

const useStyles = makeStyles((theme) => ({
	container: {
		flexGrow: 1,
		overflow: "auto",
		paddingTop: theme.spacing(4),
		marginBottom: theme.spacing(10),
	},
	root: theme.mixins.gutters({
		maxWidth: 1200,
		margin: "auto",
		padding: theme.spacing(1),
		marginBottom: theme.spacing(2),
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

function Users() {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [search, setSearch] = useState("");

	const classes = useStyles();
	const { token } = auth.isAdminAuthenticated();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		listUsers({ token: token }, signal).then((data) => {
			if (data && data.error) {
				console.log(data.error);
			} else {
				setUsers(data);
			}
		});

		return function cleanup() {
			abortController.abort();
		};
	}, [token]);

	const removeUser = (user) => {
		const updatedUsers = [...users];
		const index = updatedUsers.indexOf(user);
		updatedUsers.splice(index, 1);
		setUsers(updatedUsers);
	};

	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

	return (
		<div className={classes.container}>
			<Paper className={classes.root} elevation={4}>
				<Typography type="title" className={classes.title}>
					Registered Users
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
				<Table
					style={{
						borderWidth: 1,
						borderStyle: "solid",
						borderRadius: 5,
					}}
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>First Name</StyledTableCell>
							<StyledTableCell>Last Name</StyledTableCell>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell>Mobile Number</StyledTableCell>
							<StyledTableCell>Is Seller</StyledTableCell>
							<StyledTableCell>Actions</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users
							.filter(
								(user) =>
									!search ||
									user.firstName
										.toLowerCase()
										.includes(search.toLowerCase()) ||
									user.lastName
										.toLowerCase()
										.includes(search.toLowerCase())
							)
							.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
							.map((user) => (
								<StyledTableRow key={user._id}>
									<StyledTableCell>
										{user.firstName}
									</StyledTableCell>
									<StyledTableCell>
										{user.lastName}
									</StyledTableCell>
									<StyledTableCell>
										{user.email}
									</StyledTableCell>
									<StyledTableCell>
										{user.phoneNumber}
									</StyledTableCell>
									<StyledTableCell>
										{user.seller ? "Yes" : "No"}
									</StyledTableCell>
									<StyledTableCell>
										<Tooltip title="Edit">
											<Link
												to={`/admin/edit/user/${user._id}`}
											>
												<IconButton
													style={{
														marginRight: "15px",
													}}
													size="small"
													color="primary"
												>
													<EditIcon />
												</IconButton>
											</Link>
										</Tooltip>

										<DeleteUser
											user={user}
											removeUser={removeUser}
										/>
									</StyledTableCell>
								</StyledTableRow>
							))}
						{emptyRows > 0 && (
							<StyledTableRow style={{ height: 63 * emptyRows }}>
								<StyledTableCell colSpan={6} />
							</StyledTableRow>
						)}
					</TableBody>
				</Table>
				<TablePagination
					component="div"
					count={users.length}
					rowsPerPageOptions={[5, 10, 25]}
					page={page}
					onChangePage={handleChangePage}
					rowsPerPage={rowsPerPage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
			<Fab className={classes.fab} color="primary" aria-label="add">
				<Link className={classes.link} to="/admin/create/user">
					<AddIcon />
				</Link>
			</Fab>
		</div>
	);
}

export default Users;
