import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import {Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TablePagination ,
TableRow ,
TableSortLabel ,
Paper ,
FormControlLabel,
Switch ,
Button, Typography } from "@mui/material";

import { UserContext } from "../users/context";
import { useSnackbar } from "notistack";
import EditUser from "./addUser";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  { id: "role", numeric: true, disablePadding: false, label: "Role" },
  { id: "Status", numeric: true, disablePadding: false, label: "Status" },
  { id: "Edit", numeric: true, disablePadding: false, label: "Edit User" },
];


function EnhancedTableHead(props) {
  const {  order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="button">{headCell.label}</Typography>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const Users = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [openDetails, setOpenDetails] = useState(false);
  const [openAddNew, setOpenAddNew] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit=()=>{
    setOpenEdit(!openEdit);
  }

  const [item, setItem] = useState({});

  const handleOpenDetails = () => {
    setOpenDetails(!openDetails);
  }

  const handleAddNew = () => {
    setOpenAddNew(!openAddNew);
  }

  const { enqueueSnackbar } = useSnackbar();

  const { list, approveUser, refreshData } =
    useContext(UserContext);

  const handleApprove = async (row) => {
    try {
      await approveUser(row.id);
      enqueueSnackbar(`Status of ${row.email} changed!`, {
        variant: "success",
      });
      refreshData();
    } catch (err) {
      enqueueSnackbar(`failed to change Status of ${row.email} !`, {
        variant: "error",
      });
    }
  };


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };


  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        maxWidth: 800,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      {list ? (
        <Paper >
          <Typography variant="h2">Users</Typography>
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={list.length}
              />
              <TableBody>
                {stableSort(list, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.email}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <Typography variant="body1">{row.email}</Typography>
                        </TableCell>

                        <TableCell align="right">
                          <Typography variant="body1">{row.role} </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => {
                              handleApprove(row);
                            }}
                          >
                            <Typography variant="body1">
                              {row.isValidated? "Approved" : "Not Approved"}
                            </Typography>
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button variant="contained" color="secondary" onClick={() => {
                            setItem(row);
                            handleOpenEdit();
                          }}>
                            <Typography variant="body1">Edit User </Typography>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </Paper>)
        : ("")}
      <EditUser item={item} open={openEdit} handleClose={handleOpenEdit} />
    </Paper>
  );
};
export default Users;