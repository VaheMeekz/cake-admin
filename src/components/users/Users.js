import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountriesThunk } from "../../store/actiions/usersAction";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import "./users.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { makeArray } from "../../helpers/makeArray";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import axios from "axios";
import { baseUrl, token } from "../../api/userApi";
import Swal from "sweetalert2";

const Users = () => {
  const dispatch = useDispatch();
  const limit= 5;
  const [currentId, setCurrentId] = useState(null);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const users = useSelector((state) => state?.usersReducer.users);
  const count = useSelector((state) => state?.usersReducer.count);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getCountriesThunk(page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (count) {
      setPages(makeArray(Math.ceil(count / limit)));
    }
  }, [count, limit]);

  useEffect(() => {
    setData(users);
  }, [users]);

  const handleDeleteUser = () => {
    axios
      .post(
        `${baseUrl}/users/delete`,
        {
          id: currentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        if (!response.data.error) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Deleted",
            showConfirmButton: false,
            timer: 1500,
          });
          setOpen(false);
          setData(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box m={3}>
      <h2 mt={3} mb={3}>
        Users Settings
      </h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>#</strong>
              </TableCell>
              <TableCell align="left">
                <strong>name</strong>
              </TableCell>
              <TableCell align="left">
                <strong>email</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Delete</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data !== null &&
              data.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left" className="delBtn">
                    <DeleteIcon
                      onClick={() => {
                        setCurrentId(row.id);
                        setOpen(true);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3}>
        <div className="pagBox">
          <div>
            {pages.length - 1 == page ? (
              <ArrowBackIcon
                onClick={() => {
                  setPage(page - 1);
                }}
              />
            ) : null}
          </div>
          {pages.length > 1 &&
            pages.map((s) => {
              return (
                <div
                  className={page === s ? "ActivePagItem" : "pagItem"}
                  key={s}
                  onClick={() => {
                    setPage(s);
                  }}
                >
                  {s + 1}
                </div>
              );
            })}
          <div>
            {pages.length - 1 == page ? null : (
              <ArrowForwardIcon
                onClick={() => {
                  setPage(page + 1);
                }}
              />
            )}
          </div>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delate?"}</DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleDeleteUser} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Users;
