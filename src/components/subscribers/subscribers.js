import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeArray } from "../../helpers/makeArray";
import { getContactsThunk } from "../../store/actiions/contactUsAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { baseUrl, token } from "../../api/userApi";
import Swal from "sweetalert2";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { getSubscribersThunk } from "../../store/actiions/subscribersAction";
const Subscribers = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.subscribersReducer.subscribers);
  const count = useSelector((state) => state?.subscribersReducer.count);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [limit, setLimit] = useState(4);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  useEffect(() => {
    dispatch(getSubscribersThunk(page, limit));
  }, [page, limit]);

  useEffect(() => {
    if (count) {
      setPages(makeArray(Math.ceil(count / limit)));
    }
  }, [count, limit]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSendAnswer = () => {
    if (subject == "" && message == "") {
      setOpen(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } else {
      axios
        .post(
          `${baseUrl}/subscribers`,
          {
            subject,
            message,
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
              title: "Sended",
              showConfirmButton: false,
              timer: 1500,
            });
            setOpen(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <Box m={3}>
      <h2 mt={3} mb={3}>
        Subscribers
      </h2>
      <div style={{margin:"10px 0 10px 0"}}>
        <Button
          mt={3}
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Send Message
        </Button>
      </div>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data !== null &&
              data.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
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
          <DialogTitle id="alert-dialog-title">{"Send Message"}</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-basic"
              label="Subject"
              variant="standard"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <br />
            <textarea
              id="w3review"
              name="textHy"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="message"
              maxlength="200"
              cols="50"
              className="textareaText"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleSendAnswer} autoFocus>
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Subscribers;
