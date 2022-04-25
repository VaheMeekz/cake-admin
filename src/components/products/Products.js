import {
  Box,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeArray } from "../../helpers/makeArray";
import { getProductsThunk } from "../../store/actiions/productAction";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseUrl, token } from "../../api/userApi";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { getCategoryThunk } from "../../store/actiions/categoryAction";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const count = useSelector((state) => state.productReducer.count);
  const categories = useSelector((state) => state?.categoryReducer.category);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const limit = 5;
  const [currentId, setCurrentId] = useState(null);
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [value, setValue] = useState(0);
  const [addValue, seAddValue] = useState(0);

  //value
  const [nameHy, setNameHy] = useState();
  const [nameRu, setNameRu] = useState();
  const [nameEn, setNameEn] = useState();
  const [descriptionHy, setDescripHy] = useState();
  const [descriptionRu, setDescripRu] = useState();
  const [descriptionEn, setDescripEn] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  //end
  const [nameNewHy, setNameNewHy] = useState("");
  const [nameNewRu, setNameNewRu] = useState("");
  const [nameNewEn, setNameNewEn] = useState("");
  const [descriptionNewHy, setDescripNewHy] = useState();
  const [descriptionNewRu, setDescripNewRu] = useState();
  const [descriptionNewEn, setDescripNewEn] = useState();
  const [priceNew, setPriceNew] = useState();
  const [currentCategory, setCurrentCategory] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeAdd = (event, newValue) => {
    seAddValue(newValue);
  };

  useEffect(() => {
    dispatch(getProductsThunk(page, limit));
  }, [page, limit]);

  useEffect(() => {
    dispatch(getCategoryThunk());
  }, []);

  useEffect(() => {
    if (count) {
      setPages(makeArray(Math.ceil(count / limit)));
    }
  }, [count, limit]);

  useEffect(() => {
    setData(products);
  }, [products]);

  const transport = (row) => {
    console.log("row :", row);
    setCurrentId(row.id);
    setOpenEdit(true);
    setNameHy(row.nameHy);
    setNameRu(row.nameRu);
    setNameEn(row.nameEn);
    setDescripHy(row.descriptionHy);
    setDescripRu(row.descriptionRu);
    setDescripEn(row.descriptionEn);
    setPrice(row.price);
    setImage(row.image);
    setCategory(row.category_id);
  };

  const handleDelete = () => {
    axios
      .post(
        `${baseUrl}/products/delete`,
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
          setOpenDelete(false);
          setTimeout(() => {
            window.location.reload(false);
          }, 500);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleEdit = () => {
    axios
      .post(
        `${baseUrl}/products/edit`,
        {
          id: currentId,
          nameHy,
          nameRu,
          nameEn,
          descriptionHy,
          descriptionRu,
          descriptionEn,
          price,
          image,
          category_id: category,
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
          setOpenEdit(false);
          setTimeout(() => {
            window.location.reload(false);
          }, 500);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddItem = () => {
    axios
      .post(
        `${baseUrl}/products`,
        {
          id: currentId,
          nameHy,
          nameRu,
          nameEn,
          descriptionHy,
          descriptionRu,
          descriptionEn,
          price,
          image,
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
          setOpenEdit(false);
          setTimeout(() => {
            window.location.reload(false);
          }, 500);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box m={3}>
      <h2 mt={3} mb={3}>
        Products
      </h2>
      <Box m={2}>
        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Name Hy</TableCell>
                <TableCell align="left">Name Ru</TableCell>
                <TableCell align="left">Name En</TableCell>
                <TableCell align="left">Description Hy</TableCell>
                <TableCell align="left">Description Ru</TableCell>
                <TableCell align="left">Description En</TableCell>
                <TableCell align="left">Price (֏)</TableCell>
                <TableCell align="left">Model</TableCell>
                <TableCell align="left">Created/Updated</TableCell>
                <TableCell align="left">Edit</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <img
                        src={row.image}
                        alt="image"
                        width={150}
                        height={80}
                      />
                    </TableCell>
                    <TableCell align="left">{row.nameHy}</TableCell>
                    <TableCell align="left">{row.nameRu}</TableCell>
                    <TableCell align="left">{row.nameEn}</TableCell>
                    <TableCell align="left">{row.descriptionHy}</TableCell>
                    <TableCell align="left">{row.descriptionRu}</TableCell>
                    <TableCell align="left">{row.descriptionEn}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.model}</TableCell>
                    <TableCell align="left">
                      {row.createdAt.substr(0, 10)}
                    </TableCell>
                    <TableCell align="left">
                      <EditIcon onClick={() => transport(row)} />
                    </TableCell>
                    <TableCell align="left">
                      <DeleteIcon
                        onClick={() => {
                          setOpenDelete(true);
                          setCurrentId(row.id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
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

        {/* edit */}
        <Modal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Hy" {...a11yProps(0)} />
                  <Tab label="Ru" {...a11yProps(1)} />
                  <Tab label="En" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <h4>Name</h4>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={nameHy}
                  onChange={(e) => setNameHy(e.target.value)}
                />
                <h4>Description</h4>
                <textarea
                  id="w3review"
                  name="textHy"
                  rows="4"
                  maxlength="400"
                  cols="50"
                  className="textareaText"
                  value={descriptionHy}
                  onChange={(e) => setDescripHy(e.target.value)}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <h4>Name</h4>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={nameRu}
                  onChange={(e) => setNameRu(e.target.value)}
                />
                <h4>Description</h4>
                <textarea
                  id="w3review"
                  name="textHy"
                  rows="4"
                  maxlength="400"
                  cols="50"
                  className="textareaText"
                  value={descriptionRu}
                  onChange={(e) => setDescripRu(e.target.value)}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <h4>Name</h4>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                />
                <h4>Description</h4>
                <textarea
                  id="w3review"
                  name="textHy"
                  rows="4"
                  maxlength="400"
                  cols="50"
                  className="textareaText"
                  value={descriptionEn}
                  onChange={(e) => setDescripEn(e.target.value)}
                />
              </TabPanel>
            </Box>
            <Box ml={2}>
              <h3>Price</h3>
              <TextField
                id="outlined-basic"
                variant="outlined"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Box>
            <Box m={2}>
              <Button variant="contained" onClick={handleEdit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* del */}

        <Modal
          open={openDel}
          onClose={() => setOpenDelete(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete
            </Typography>
            <DialogActions>
              <Button variant="contained" onClick={() => setOpenDelete(false)}>
                No
              </Button>
              <Button variant="contained" onClick={handleDelete}>
                Yes
              </Button>
            </DialogActions>
          </Box>
        </Modal>

        {/* add */}

        <Modal
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Product
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={addValue}
                  onChange={handleChangeAdd}
                  aria-label="basic tabs example"
                >
                  <Tab label="Hy" {...a11yProps(0)} />
                  <Tab label="Ru" {...a11yProps(1)} />
                  <Tab label="En" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <h4>Name</h4>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  value={nameNewHy}
                  onChange={(e) => setNameNewHy(e.target.value)}
                />
                <h4>Description</h4>
                <textarea
                  id="w3review"
                  name="textHy"
                  rows="4"
                  maxlength="400"
                  cols="58"
                  className="textareaText"
                  value={descriptionNewHy}
                  onChange={(e) => setDescripNewHy(e.target.value)}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <h4>Name</h4>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  value={nameNewRu}
                  onChange={(e) => setNameNewRu(e.target.value)}
                />
                <h4>Description</h4>
                <textarea
                  id="w3review"
                  name="textHy"
                  rows="4"
                  maxlength="400"
                  cols="58"
                  className="textareaText"
                  value={descriptionNewRu}
                  onChange={(e) => setDescripNewRu(e.target.value)}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <h4>Name</h4>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  value={nameNewEn}
                  onChange={(e) => setNameNewEn(e.target.value)}
                />
                <h4>Description</h4>
                <textarea
                  id="w3review"
                  name="textHy"
                  rows="4"
                  maxlength="400"
                  cols="58"
                  className="textareaText"
                  value={descriptionNewEn}
                  onChange={(e) => setDescripNewEn(e.target.value)}
                />
              </TabPanel>
            </Box>
            <Box m={2}>
              <h4>Price</h4>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Price"
                value={priceNew}
                onChange={(e) => setPriceNew(e.target.value)}
              />
            </Box>
            <Box>
              <h4>Category</h4>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"> choose</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={currentCategory}
                  label="Age"
                  onChange={(e) => setCurrentCategory(e.target.value)}
                >
                  {categories &&
                    categories.map((i) => {
                      return (
                        <MenuItem key={i.id} value={i.id}>
                          {i.nameHy}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Button> Upload</Button>
            </Box>
            <DialogActions>
              <Button variant="contained">Add</Button>
            </DialogActions>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Products;
