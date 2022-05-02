import {
    Box, DialogActions, FormControl, InputLabel, MenuItem, Select, TextField,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeArray} from "../../helpers/makeArray";
import {getProductsThunk} from "../../store/actiions/productAction";
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
import {baseUrl, token} from "../../api/userApi";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {getCategoryThunk} from "../../store/actiions/categoryAction";
import AddIcon from "@mui/icons-material/Add";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../aboutUs/aboutUs.scss";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 700,
    overflow: "scroll",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (<div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && (<Box sx={{p: 3}}>
            <Typography>{children}</Typography>
        </Box>)}
    </div>);
}

TabPanel.propTypes = {
    children: PropTypes.node, index: PropTypes.number.isRequired, value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`, "aria-controls": `simple-tabpanel-${index}`,
    };
}

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productReducer.products);
    const count = useSelector((state) => state.productReducer.count);
    const categories = useSelector((state) => state?.categoryReducer.category);
    const [openEdit, setOpenEdit] = useState(false);
    const [openLong, setOpenLong] = useState(0);
    const [openDel, setOpenDelete] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [additionInfo, setAdditionInfo] = useState(0);
    const [valueAdition, setValueAdition] = React.useState(0);
    const [openAdition, setOpenAdition] = useState(false);
    const [cake, setCake] = useState(false);
    const limit = 5;
    const [currentId, setCurrentId] = useState(null);
    const [cuurentAddition, setCurrentAddition] = useState(null)
    const [data, setData] = useState(null);
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState([]);
    const [value, setValue] = useState(0);
    const [addValue, seAddValue] = useState(0);
    const [thisImg, setThisImg] = useState([]);
    const [additionEddit, setAdditionEdit] = useState(false)
    const [cake_count, setCakeCount] = useState();
    const [cake_price, setCakePrice] = useState();
    const [cuurentEditImage, setCuurentEditImage] = useState(null)

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
    const [cakeCountNew, setCakeCountNew] = useState()
    const [cakePrceNew, setCakePriceNew] = useState()
    const [londDescHy, setLongDescHy] = useState()
    const [londDescRu, setLongDescRu] = useState()
    const [londDescEn, setLongDescEn] = useState()
    const [adition_info_hyNew, setAditionInfoHyNew] = useState();
    const [adition_info_ruNew, setAditionInfoRuNew] = useState();
    const [adition_info_enNew, setAditionInfoEnNew] = useState();
    const [cake_addition_name_hyNew, setCakeAditionNameHyNew] = useState();
    const [cake_addition_name_ruNew, setCakeAditionNameRuNew] = useState();
    const [cake_addition_name_enNew, setCakeAditionNameEnNew] = useState();
    const [cake_addition_priceNew, setCakeAditionPriceNew] = useState();
    const [editImage, setEditImage] = useState(null)
    //end
    const [nameNewHy, setNameNewHy] = useState("");
    const [nameNewRu, setNameNewRu] = useState("");
    const [nameNewEn, setNameNewEn] = useState("");
    const [descriptionNewHy, setDescripNewHy] = useState();
    const [descriptionNewRu, setDescripNewRu] = useState();
    const [descriptionNewEn, setDescripNewEn] = useState();
    const [priceNew, setPriceNew] = useState();
    const [currentCategory, setCurrentCategory] = useState();
    const [cake_addition_name_hy, setCakeAditionNameHy] = useState();
    const [cake_addition_name_ru, setCakeAditionNameRu] = useState();
    const [cake_addition_name_en, setCakeAditionNameEn] = useState();
    const [cake_addition_price, setCakeAditionPrice] = useState();
    const [long_description_hy, setLongDescriotionHy] = useState();
    const [long_description_ey, setLongDescriotionRu] = useState();
    const [long_description_en, setLongDescriotionEn] = useState();
    const [adition_info_hy, setAditionInfoHy] = useState();
    const [adition_info_ru, setAditionInfoRu] = useState();
    const [adition_info_en, setAditionInfoEn] = useState();

    //ktorner xoracum start
    const [inputFields, setInputFields] = useState([{id: Math.random(), firstName: "", price: ""},]);

    const handleSubmitXor = (e) => {
        e.preventDefault();
    };

    const handleOpenLong = (event, newValue) => {
        setOpenLong(newValue);
    };

    const handleAdditionInfo = (event, newValue) => {
        setAdditionInfo(newValue);
    };

    const handleChangeAdition = (event, newValue) => {
        setValueAdition(newValue);
    };
    const handleChangeInput = (id, event) => {
        const newInputFields = inputFields.map((i) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value;
            }
            return i;
        });

        setInputFields(newInputFields.filter((i) => i.firstName !== ""));
    };

    const handleAddFields = () => {
        setInputFields([...inputFields, {id: Math.random(), firstName: "", price: ""},]);
    };

    const handleRemoveFields = (id) => {
        const values = [...inputFields];
        values.splice(values.findIndex((value) => value.id === id));
        setInputFields(values);
    };

    useEffect(() => {
        let cakeCount = inputFields.map(function (item) {
            return item["firstName"];
        });

        let cakePrice = inputFields.map(function (item) {
            return item["price"];
        });
        setCakeCount(cakeCount.toString());
        setCakePrice(cakePrice.toString());
    }, [inputFields]);

    //ktorner xoracum end

    // addition xoracum hayeren start

    const [additionHy, setAdditionHy] = useState([{id: Math.random(), nameHy: "", price: ""},]);

    const handleSubmitXorHy = (e) => {
        e.preventDefault();
    };

    const handleChangeInputHy = (id, event) => {
        const newInputFieldsHy = additionHy.map((i) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value;
            }
            return i;
        });
        setAdditionHy(newInputFieldsHy.filter((i) => i.nameHy !== ""));
    };

    const handleAddFieldsHy = () => {
        setAdditionHy([...additionHy, {id: Math.random(), nameHy: "", price: ""},]);
    };

    const handleRemoveFieldsHy = (id) => {
        const values = [...additionHy];
        values.splice(values.findIndex((value) => value.id === id));
        setAdditionHy(values);
    };
    // addition xoracum hayeren end

    // addition xoracum ruseren start
    const [additionRu, setAdditionRu] = useState([{id: Math.random(), nameRu: ""},]);

    const handleSubmitXorRu = (e) => {
        e.preventDefault();
    };

    const handleChangeInputRu = (id, event) => {
        const newInputFieldsRu = additionRu.map((i) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value;
            }
            return i;
        });
        setAdditionRu(newInputFieldsRu.filter((i) => i.nameRu !== ""));
    };

    const handleAddFieldsRu = () => {
        setAdditionRu([...additionRu, {id: Math.random(), nameRu: ""}]);
    };

    const handleRemoveFieldsRu = (id) => {
        const values = [...additionRu];
        values.splice(values.findIndex((value) => value.id === id));
        setAdditionRu(values);
    };
    // addition xoracum ruseren end

    // addition xoracum angleren start
    const [additionEn, setAdditionEn] = useState([{id: Math.random(), nameEn: ""},]);

    const handleSubmitXorEn = (e) => {
        e.preventDefault();
    };

    const handleChangeInputEn = (id, event) => {
        const newInputFieldsEn = additionEn.map((i) => {
            if (id === i.id) {
                i[event.target.name] = event.target.value;
            }
            return i;
        });
        setAdditionRu(newInputFieldsEn.filter((i) => i.nameEn !== ""));
    };

    const handleAddFieldsEn = () => {
        setAdditionEn([...additionEn, {id: Math.random(), nameRu: ""}]);
    };

    const handleRemoveFieldsEn = (id) => {
        const values = [...additionEn];
        values.splice(values.findIndex((value) => value.id === id));
        setAdditionEn(values);
    };
    // addition xoracum angleren end

    useEffect(() => {
        let condidatHy = additionHy.map(function (item) {
            return item["nameHy"];
        });
        let condidatRu = additionRu.map(function (item) {
            return item["nameRu"];
        });
        let condidatEn = additionRu.map(function (item) {
            return item["nameEn"];
        });
        let condidatPrice = additionHy.map(function (item) {
            return item["price"];
        });

        setCakeAditionNameHy(condidatHy.toString());
        setCakeAditionNameRu(condidatRu.toString());
        setCakeAditionNameEn(condidatEn.toString());
        setCakeAditionPrice(condidatPrice.toString());
    }, [additionHy, additionRu, additionEn]);

    useEffect(() => {
        if (thisImg.length >= 5) {
            Swal.fire({
                icon: "error", title: "Oops...", text: "Images is mutch!( նկարները 5֊ից ոչ շատ)",
            });
        }
    }, [thisImg]);
    //file upload start
    const handleFile = (e) => {
        let files = [];
        Object.keys(e.target.files).map((f) => {
            if (f === "Length") return;
            files.push(e.target.files[0]);
        });
        uploadImage(files);
    };

    let arrOfImages = [];
    const uploadImage = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "armcodingImage");
        formData.append("cloud_name", "armcoding");
        axios
            .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
            .then((res) => {
                arrOfImages.push(res.data.url);
                setThisImg([...thisImg, ","]);
                setThisImg([...thisImg, res.data.url]);
            });
    };
    //file upload end

    const handleFileEdit = (e) => {
        // setCuurentEditImage(index)
        let files = [];
        Object.keys(e.target.files).map((f) => {
            if (f === "Length") return;
            files.push(e.target.files[0]);
        });
        uploadImageEdit(files);
    };

    let arrOfImagesEdit = [];
    const uploadImageEdit = (files) => {
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "armcodingImage");
        formData.append("cloud_name", "armcoding");
        axios
            .post(`https://api.cloudinary.com/v1_1/armcoding/image/upload`, formData)
            .then((res) => {
                arrOfImagesEdit.push(res.data.url);
                // setEditImage([...editImage, ","]);
                setEditImage(res.data.url);
                // editImage,setEditImage
            });
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeCake = (event) => {
        setCake(event.target.checked);
    };

    const handleChangeAddition = (event) => {
        setOpenAdition(event.target.checked);
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
        console.log(row);
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
        setCakeCountNew(row.cake_count)
        setCakePriceNew(row.cake_price)
        setLongDescHy(row.long_description_hy)
        setLongDescRu(row.long_description_ey)
        setLongDescEn(row.long_description_en)
        setAditionInfoHyNew(row.adition_info_hy)
        setAditionInfoRuNew(row.adition_info_ru)
        setAditionInfoEnNew(row.adition_info_en)
        setCakeAditionNameHyNew(row.cake_addition_name_hy)
        setCakeAditionNameRuNew(row.cake_addition_name_ru)
        setCakeAditionNameEnNew(row.cake_addition_name_en)
        setCakeAditionPriceNew(row.cake_addition_price)
    };

    const handleDelete = () => {
        axios
            .post(`${baseUrl}/products/delete`, {
                id: currentId,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Deleted", showConfirmButton: false, timer: 1500,
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
            .post(`${baseUrl}/products/edit`, {
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
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Deleted", showConfirmButton: false, timer: 1500,
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

    const handleAddProduct = () => {
        axios
            .post(`${baseUrl}/products`, {
                nameHy: nameNewHy,
                nameRu: nameNewRu,
                nameEn: nameNewEn,
                descriptionHy: descriptionNewHy,
                descriptionRu: descriptionNewRu,
                descriptionEn: descriptionNewEn,
                price: priceNew,
                image: thisImg.toString(),
                category_id: currentCategory,
                cake_count,
                cake_price,
                cake_addition_name_hy,
                cake_addition_name_ru,
                cake_addition_name_en,
                cake_addition_price,
                long_description_hy,
                long_description_ey,
                long_description_en,
                adition_info_hy,
                adition_info_ru,
                adition_info_en,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Deleted", showConfirmButton: false, timer: 1500,
                    });
                    setOpenAdd(false)
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const handleAddition = (e, index) => {
        // setCakeAditionNameHyNew(cake_addition_name_hyNew.split(",")[index] = e.target.value)
    }

    const handleEditImage = (index) => {
        axios
            .post(`${baseUrl}/products/editImage`, {
                id: currentId,
                image: editImage,
                imageId: index
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Success", showConfirmButton: false, timer: 1500,
                    });
                    setOpenEdit(false);
                    setEditImage(null)
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 500);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (<Box m={3}>
        <h2 mt={3} mb={3}>
            Products
        </h2>
        <Box m={2}>
            <Button variant="contained" onClick={() => setOpenAdd(true)}>
                <AddIcon/>
            </Button>
        </Box>
        <Box>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {/* <TableCell align="left">#</TableCell> */}
                            <TableCell align="left">Image</TableCell>
                            <TableCell align="left">Name Hy</TableCell>
                            <TableCell align="left">Name Ru</TableCell>
                            <TableCell align="left">Name En</TableCell>
                            <TableCell align="left">Category</TableCell>
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
                        {data && data.map((row, index) => (<TableRow
                            key={row.id}
                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                        >
                            {/* <TableCell align="left">{row.id}</TableCell> */}

                            <TableCell align="left">
                                <img
                                    src={row.image.split(",")[0]}
                                    alt="image"
                                    width={150}
                                    height={80}
                                />
                            </TableCell>
                            <TableCell align="left">{row.nameHy}</TableCell>
                            <TableCell align="left">{row.nameRu}</TableCell>
                            <TableCell align="left">{row.nameEn}</TableCell>
                            <TableCell align="left">{row.Category?.nameHy}</TableCell>
                            <TableCell align="left">{row.descriptionHy}</TableCell>
                            <TableCell align="left">{row.descriptionRu}</TableCell>
                            <TableCell align="left">{row.descriptionEn}</TableCell>
                            <TableCell align="left">{row.price}</TableCell>
                            <TableCell align="left">{row.model}</TableCell>
                            <TableCell align="left">
                                {row.createdAt.substr(0, 10)}
                            </TableCell>
                            <TableCell align="left">
                                <EditIcon onClick={() => transport(row)}/>
                            </TableCell>
                            <TableCell align="left">
                                <DeleteIcon
                                    onClick={() => {
                                        setOpenDelete(true);
                                        setCurrentId(row.id);
                                    }}
                                />
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        <Box>
            <div className="pagBox">
                <div>
                    {pages.length - 1 == page ? (<ArrowBackIcon
                        onClick={() => {
                            setPage(page - 1);
                        }}
                    />) : null}
                </div>
                {pages.length > 1 && pages.map((s) => {
                    return (<div
                        className={page === s ? "ActivePagItem" : "pagItem"}
                        key={s}
                        onClick={() => {
                            setPage(s);
                        }}
                    >
                        {s + 1}
                    </div>);
                })}
                <div>
                    {pages.length - 1 == page ? null : (<ArrowForwardIcon
                        onClick={() => {
                            setPage(page + 1);
                        }}
                    />)}
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
                    <Box sx={{width: "100%"}}>
                        <Box sx={{borderBottom: 1, borderColor: "divider"}}>
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
                            <h4>Long Description</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="4"
                                cols="50"
                                className="textareaText"
                                value={londDescHy}
                                onChange={(e) => setLongDescHy(e.target.value)}
                            />
                            <h4>Addition Info</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="4"
                                cols="50"
                                className="textareaText"
                                value={adition_info_hyNew}
                                onChange={(e) => setAditionInfoHyNew(e.target.value)}
                            />
                            {cake_addition_name_hyNew !== "" && <h4>Addition</h4>}

                            {cake_addition_name_hyNew && cake_addition_name_hyNew.split(",").map((i, index) => {
                                return (<div style={{margin: "10px"}} key={index}>
                                    <p>{i}</p>
                                    <Button onClick={() => {
                                        setAdditionEdit(true);
                                        setCurrentAddition(index)
                                    }}>Edit</Button>
                                    {additionEddit && cake_addition_name_hyNew.split(",").filter((i, index) => index == cuurentAddition ?
                                        <TextField variant="outlined"
                                                   value={cake_addition_name_hyNew.split(",")[cuurentAddition]}
                                                   onChange={(e) => {
                                                       handleAddition(e, cuurentAddition)
                                                   }}/> : null)}

                                </div>)
                            })}
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
                            <h4>Long Description</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="4"
                                cols="50"
                                className="textareaText"
                                value={londDescRu}
                                onChange={(e) => setLongDescRu(e.target.value)}
                            />
                            <h4>Addition Info</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="4"
                                cols="50"
                                className="textareaText"
                                value={adition_info_ruNew}
                                onChange={(e) => setAditionInfoRuNew(e.target.value)}
                            />
                            {cake_addition_name_ruNew !== "" && <h4>Addition</h4>}

                            {cake_addition_name_ruNew && cake_addition_name_ruNew.split(",").map((i, index) => {
                                return (<div style={{margin: "10px"}} key={index}>
                                    <TextField variant="outlined" value={i} onChange={(e) => {
                                        let newValue = e.target.value;
                                        cake_addition_name_ruNew.split(",")[index] = newValue
                                        setCakeAditionNameRuNew(cake_addition_name_ruNew)
                                    }}/></div>)
                            })}
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
                            <h4>Long Description</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="4"
                                cols="50"
                                className="textareaText"
                                value={londDescEn}
                                onChange={(e) => setLongDescEn(e.target.value)}
                            />
                            <h4>Addition Info</h4>
                            <textarea
                                id="w3review"
                                name="textHy"
                                rows="4"
                                cols="50"
                                className="textareaText"
                                value={adition_info_enNew}
                                onChange={(e) => setAditionInfoEnNew(e.target.value)}
                            />
                            {cake_addition_name_enNew !== "" && <h4>Addition</h4>}

                            {cake_addition_name_enNew && cake_addition_name_enNew.split(",").map((i, index) => {
                                return (<div style={{margin: "10px"}} key={index}>
                                    <TextField variant="outlined" value={i} onChange={(e) => {
                                        let newValue = e.target.value;
                                        cake_addition_name_enNew.split(",")[index] = newValue
                                        setCakeAditionNameEnNew(cake_addition_name_enNew)
                                    }}/></div>)
                            })}
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
                    <Box>
                        <div>
                            {editImage !== null &&
                                <img
                                    src={editImage}
                                    alt="newImage"
                                    width={100}
                                    height={100}
                                    style={{margin: "10px"}}
                                />
                            }

                        </div>
                        {image && image.split(",").map((i, index) => {

                            return (<div key={index}>
                                <img src={i} alt={"image"} width={200} style={{margin: "20px"}}/>
                                <Box>

                                    <div className="uploadBtns">
                                        <Button component="label">
                                            Upload
                                            <input type="file" hidden multiple onChange={handleFileEdit}/>
                                        </Button>
                                    </div>
                                    {
                                        editImage !== null &&
                                        <Button onClick={() => handleEditImage(index)}
                                                variant="contained">Edit</Button>
                                    }
                                </Box>
                            </div>)
                        })}
                    </Box>
                    {/*<Box m={2}>*/}
                    {/*    <Button variant="contained" onClick={handleEdit}>*/}
                    {/*        Submit*/}
                    {/*    </Button>*/}
                    {/*</Box>*/}
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
                    <Box sx={{width: "100%"}}>
                        <Box sx={{borderBottom: 1, borderColor: "divider"}}>
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
                        <TabPanel value={addValue} index={0}>
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
                        <TabPanel value={addValue} index={1}>
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
                        <TabPanel value={addValue} index={2}>
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
                                {categories && categories.map((i) => {
                                    return (<MenuItem key={i.id} value={i.id}>
                                        {i.nameHy}
                                    </MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box m={2}>
                        <FormControlLabel
                            label="Cake"
                            control={<Checkbox
                                checked={cake}
                                onChange={handleChangeCake}
                                inputProps={{"aria-label": "controlled"}}
                            />}
                        />
                        {cake ? (<div>
                            <form onSubmit={handleSubmitXor}>
                                {inputFields.map((inputField, index) => (<div key={inputField.id}>
                                    <TextField
                                        name="firstName"
                                        label="Count"
                                        maxlength="50"
                                        value={inputField.firstName}
                                        onChange={(event) => {
                                            if (event.target.name !== "") {
                                                handleChangeInput(inputField.id, event);
                                            }
                                        }}
                                        className="xorINputs"
                                    />
                                    <br/>
                                    <TextField
                                        name="price"
                                        label="Price"
                                        maxlength="50"
                                        value={inputField.price}
                                        onChange={(event) => {
                                            if (event.target.name !== "") {
                                                handleChangeInput(inputField.id, event);
                                            }
                                        }}
                                        className="xorINputs"
                                    />
                                    <br/>
                                    <div className="xorBtns">
                                        <Button
                                            disabled={index === 0 && true}
                                            onClick={() => handleRemoveFields(inputField.id)}
                                            variant="outlined"
                                            color="error"
                                        >
                                            <i class="fa-solid fa-minus">Delete</i>
                                        </Button>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddFields();
                                            }}
                                            variant="outlined"
                                        >
                                            <i class="fa-solid fa-plus">Add</i>
                                        </Button>
                                    </div>
                                    <hr className="hr"/>
                                </div>))}
                            </form>
                        </div>) : null}
                    </Box>

                    <Box m={2}>
                        <FormControlLabel
                            label="Addition"
                            control={<Checkbox
                                checked={openAdition}
                                onChange={handleChangeAddition}
                                inputProps={{"aria-label": "controlled"}}
                            />}
                        />
                        {openAdition ? (<div>
                            <Box sx={{width: "100%"}}>
                                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                    <Tabs
                                        value={valueAdition}
                                        onChange={handleChangeAdition}
                                        aria-label="basic tabs example"
                                    >
                                        <Tab label="Hy" {...a11yProps(0)} />
                                        <Tab label="Ru" {...a11yProps(1)} />
                                        <Tab label="En" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={valueAdition} index={0}>
                                    <form onSubmit={handleSubmitXorHy}>
                                        {additionHy.map((inputField, index) => (<div key={inputField.id}>
                                            <TextField
                                                name="nameHy"
                                                label="Name"
                                                maxlength="50"
                                                value={inputField.nameHy}
                                                onChange={(event) => {
                                                    if (event.target.name !== "") {
                                                        handleChangeInputHy(inputField.id, event);
                                                    }
                                                }}
                                                className="xorINputs"
                                            />{" "}
                                            <br/>
                                            <TextField
                                                name="price"
                                                label="Price"
                                                maxlength="50"
                                                value={inputField.price}
                                                onChange={(event) => {
                                                    if (event.target.price !== "") {
                                                        handleChangeInputHy(inputField.id, event);
                                                    }
                                                }}
                                                className="xorINputs"
                                            />
                                            <div className="xorBtns">
                                                <Button
                                                    disabled={index === 0 && true}
                                                    onClick={() => handleRemoveFieldsHy(inputField.id)}
                                                    variant="outlined"
                                                    color="error"
                                                >
                                                    <i class="fa-solid fa-minus">Delete</i>
                                                </Button>
                                                <Button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleAddFieldsHy();
                                                    }}
                                                    variant="outlined"
                                                >
                                                    <i class="fa-solid fa-plus">Add</i>
                                                </Button>
                                            </div>
                                            <hr className="hr"/>
                                        </div>))}
                                    </form>
                                </TabPanel>
                                <TabPanel value={valueAdition} index={1}>
                                    <form onSubmit={handleSubmitXorRu}>
                                        {additionRu.map((inputField, index) => (<div key={inputField.id}>
                                            <TextField
                                                name="nameRu"
                                                label="Name"
                                                maxlength="50"
                                                value={inputField.nameRu}
                                                onChange={(event) => {
                                                    if (event.target.name !== "") {
                                                        handleChangeInputRu(inputField.id, event);
                                                    }
                                                }}
                                                className="xorINputs"
                                            />
                                            <div className="xorBtns">
                                                <Button
                                                    disabled={index === 0 && true}
                                                    onClick={() => handleRemoveFieldsRu(inputField.id)}
                                                    variant="outlined"
                                                    color="error"
                                                >
                                                    <i class="fa-solid fa-minus">Delete</i>
                                                </Button>
                                                <Button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleAddFieldsRu();
                                                    }}
                                                    variant="outlined"
                                                >
                                                    <i class="fa-solid fa-plus">Add</i>
                                                </Button>
                                            </div>
                                            <hr className="hr"/>
                                        </div>))}
                                    </form>
                                </TabPanel>
                                <TabPanel value={valueAdition} index={2}>
                                    <form onSubmit={handleSubmitXorEn}>
                                        {additionEn.map((inputField, index) => (<div key={inputField.id}>
                                            <TextField
                                                name="nameEn"
                                                label="Name"
                                                maxlength="50"
                                                value={inputField.nameEn}
                                                onChange={(event) => {
                                                    if (event.target.name !== "") {
                                                        handleChangeInputEn(inputField.id, event);
                                                    }
                                                }}
                                                className="xorINputs"
                                            />
                                            <div className="xorBtns">
                                                <Button
                                                    disabled={index === 0 && true}
                                                    onClick={() => handleRemoveFieldsEn(inputField.id)}
                                                    variant="outlined"
                                                    color="error"
                                                >
                                                    <i class="fa-solid fa-minus">Delete</i>
                                                </Button>
                                                <Button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleAddFieldsEn();
                                                    }}
                                                    variant="outlined"
                                                >
                                                    <i class="fa-solid fa-plus">Add</i>
                                                </Button>
                                            </div>
                                            <hr className="hr"/>
                                        </div>))}
                                    </form>
                                </TabPanel>
                            </Box>
                        </div>) : null}
                    </Box>
                    <Box m={2}>
                        <h3>Long Description</h3>
                        <Box sx={{width: "100%"}}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <Tabs
                                    value={openLong}
                                    onChange={handleOpenLong}
                                    aria-label="basic tabs example"
                                >
                                    <Tab label="Hy" {...a11yProps(0)} />
                                    <Tab label="Ru" {...a11yProps(1)} />
                                    <Tab label="En" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={openLong} index={0}>
                  <textarea
                      id="w3review"
                      name="textHy"
                      rows="8"
                      value={long_description_hy}
                      onChange={(e) => setLongDescriotionHy(e.target.value)}
                      maxlength="600"
                      cols="50"
                      className="textareaText"
                  />
                            </TabPanel>
                            <TabPanel value={openLong} index={1}>
                  <textarea
                      id="w3review"
                      name="textHy"
                      rows="8"
                      value={long_description_ey}
                      onChange={(e) => setLongDescriotionRu(e.target.value)}
                      maxlength="600"
                      cols="50"
                      className="textareaText"
                  />
                            </TabPanel>
                            <TabPanel value={openLong} index={2}>
                  <textarea
                      id="w3review"
                      name="textHy"
                      rows="8"
                      value={long_description_en}
                      onChange={(e) => setLongDescriotionEn(e.target.value)}
                      maxlength="600"
                      cols="50"
                      className="textareaText"
                  />
                            </TabPanel>
                        </Box>
                    </Box>
                    <Box m={2}>
                        <h3>Addition Description</h3>
                        <Box sx={{width: "100%"}}>
                            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                                <Tabs
                                    value={additionInfo}
                                    onChange={handleAdditionInfo}
                                    aria-label="basic tabs example"
                                >
                                    <Tab label="Hy" {...a11yProps(0)} />
                                    <Tab label="Ru" {...a11yProps(1)} />
                                    <Tab label="En" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={additionInfo} index={0}>
                  <textarea
                      id="w3review"
                      name="textHy"
                      rows="8"
                      value={adition_info_hy}
                      onChange={(e) => setAditionInfoHy(e.target.value)}
                      maxlength="600"
                      cols="50"
                      className="textareaText"
                  />
                            </TabPanel>
                            <TabPanel value={additionInfo} index={1}>
                  <textarea
                      id="w3review"
                      name="textHy"
                      rows="8"
                      value={adition_info_ru}
                      onChange={(e) => setAditionInfoRu(e.target.value)}
                      maxlength="600"
                      cols="50"
                      className="textareaText"
                  />
                            </TabPanel>
                            <TabPanel value={additionInfo} index={2}>
                  <textarea
                      id="w3review"
                      name="textHy"
                      rows="8"
                      value={adition_info_en}
                      onChange={(e) => setAditionInfoEn(e.target.value)}
                      maxlength="600"
                      cols="50"
                      className="textareaText"
                  />
                            </TabPanel>
                        </Box>
                    </Box>
                    <Box>
                        <div className="uploadBtns">
                            <Button variant="contained" component="label">
                                Upload
                                <input type="file" hidden multiple onChange={handleFile}/>
                            </Button>
                        </div>
                        <div>
                            {thisImg.length && thisImg.map((i) => {
                                return (<img
                                    key={i.toString()}
                                    src={i}
                                    alt="newImage"
                                    width={100}
                                    height={100}
                                    style={{margin: "10px"}}
                                />);
                            })}
                            {thisImg.length >= 5 && (<h3 className="errorText">Նկարները շատ են 5֊ից</h3>)}
                        </div>
                    </Box>
                    <DialogActions>
                        <Button variant="contained" onClick={handleAddProduct}>
                            Add Product
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>
        </Box>
    </Box>);
};

export default Products;
