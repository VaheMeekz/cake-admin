import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryThunk} from "../../store/actions/categoryAction";
import {Button} from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "../aboutUs/aboutUs.scss";
import axios from "axios";
import Swal from "sweetalert2";
import {baseUrl, token} from "../../config/config";
import {TextField} from "@mui/material";
import CategoryAddModal from "./CategoryAddModal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const Category = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state?.categoryReducer.category);
    const [categorys, setCategorys] = useState();
    const [open, setOpen] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const handleClose = () => setOpen(false);
    const handleCloseDelete = () => setOpenDelete(false);
    const handleCloseAdd = () => setOpenAdd(false);
    const [nameEditHy, setNameEditHy] = useState("");
    const [nameEditRu, setNameEditRu] = useState("");
    const [nameEditEn, setNameEditEn] = useState("");

    useEffect(() => {
        dispatch(getCategoryThunk());
    }, []);

    useEffect(() => {
        setCategorys(data);
    }, [data]);

    const handelDelete = () => {
        axios
            .post(
                `${baseUrl}/category/delete`,
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
                    setOpenDelete(false);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Succses",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setCategorys(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleEdit = () => {
        axios
            .post(
                `${baseUrl}/category/edit`,
                {
                    id: currentId,
                    nameHy: nameEditHy,
                    nameRu: nameEditRu,
                    nameEn: nameEditEn,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(function (response) {
                if (!response.data.error) {
                    setOpen(false);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Succses",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setCategorys(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    return (
        <Box m={3} className="boxHeigth">
            <h2 mt={3} mb={3}>
                Category Settings
            </h2>
            <Box m={2}>
                <Button color="secondary" variant="contained" onClick={() => setOpenAdd(true)}>
                    Add
                </Button>
            </Box>
            <Box>
                {categorys &&
                    categorys.map((i) => {
                        return (
                            <div key={i.id}>
                                <Box m={2} className="inputBoxs">
                                    <ul>
                                        <li>
                                            <p>Hy</p>
                                            <h4>{i.nameHy}</h4>
                                        </li>
                                        <li>
                                            <p>Ru</p>
                                            <h4>{i.nameRu}</h4>
                                        </li>
                                        <li>
                                            <p>En</p>
                                            <h4>{i.nameEn}</h4>
                                        </li>
                                    </ul>
                                    <div className="btnsBox">
                                        <div m={2}>
                                            {" "}
                                            <Button color="secondary"
                                                variant="contained"
                                                onClick={() => {
                                                    setCurrentId(i.id);
                                                    setOpen(true);
                                                    setNameEditHy(i.nameHy);
                                                    setNameEditRu(i.nameRu);
                                                    setNameEditEn(i.nameEn);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                        <div m={2}>
                                            {" "}
                                            <Button color="secondary"
                                                variant="contained"
                                                onClick={() => {
                                                    setOpenDelete(true);
                                                    setCurrentId(i.id);
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </Box>
                                <hr/>
                            </div>
                        );
                    })}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <h3>Edit</h3>
                            <TextField
                                id="filled-basic"
                                label="Hy"
                                variant="filled"
                                className="addInp"
                                value={nameEditHy}
                                onChange={(e) => setNameEditHy(e.target.value)}
                            />
                            <TextField
                                id="filled-basic"
                                label="Ru"
                                variant="filled"
                                className="addInp"
                                value={nameEditRu}
                                onChange={(e) => setNameEditRu(e.target.value)}
                            />
                            <TextField
                                id="filled-basic"
                                label="En"
                                variant="filled"
                                className="addInp"
                                value={nameEditEn}
                                onChange={(e) => setNameEditEn(e.target.value)}
                            />
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            <Button  color="secondary" variant="contained" onClick={handleEdit}>Submit</Button>
                        </Typography>
                    </Box>
                </Modal>

                <Modal
                    open={openDelete}
                    onClose={handleCloseDelete}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Delete ?
                        </Typography>
                        <Typography
                            className="btnsBox"
                            id="modal-modal-description"
                            sx={{mt: 2}}
                        >
                            <div>
                                <Button  color="secondary" variant="contained" onClick={handleCloseDelete}>
                                    No
                                </Button>
                            </div>
                            <div>
                                {" "}
                                <Button color="secondary" variant="contained" onClick={handelDelete}>
                                    Yes
                                </Button>
                            </div>
                        </Typography>
                    </Box>
                </Modal>
                <CategoryAddModal openAdd={openAdd} handleCloseAdd={handleCloseAdd} style={style}
                                  setOpenAdd={setOpenAdd} setCategorys={setCategorys}
                />
            </Box>
        </Box>
    );
};

export default Category;
