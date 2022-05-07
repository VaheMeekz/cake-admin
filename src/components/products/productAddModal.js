import React, {useEffect, useState} from 'react';
import Modal from "@mui/material/Modal";
import {Box, DialogActions, FormControl, MenuItem, Select, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import axios from "axios";
import {baseUrl, token} from "../../config/config";
import Swal from "sweetalert2";
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
const ProductAddModal = ({openAdd,setOpenAdd,categories}) => {
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
    const [cake_count, setCakeCount] = useState();
    const [cake_price, setCakePrice] = useState();
    const [thisImg, setThisImg] = useState([]);
    const [addValue, seAddValue] = useState(0);
    const [additionInfo, setAdditionInfo] = useState(0);
    const [valueAdition, setValueAdition] = React.useState(0);
    const [openAdition, setOpenAdition] = useState(false);
    const [cake, setCake] = useState(false);
    const [cake_addition_priceNew,setCakeAditionPriceNew] = useState("")
    //------------------------additions
    //-------hy start

    const [additionHy, setAdditionHy] = useState([{id: Math.random(), nameHy: "", price: ""},]);

    const handleSubmitXorHy = (e) => {
        e.preventDefault();
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
    //--------hy end
    //--------------ru start
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
    //--------------ru end
    //--------------en start
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
    //--------------en start

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

    //----------ktorner xoracum start
    const [inputFields, setInputFields] = useState([{id: Math.random(), firstName: "", price: ""},]);

    const handleSubmitXor = (e) => {
        e.preventDefault();
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

    //----------------upload start
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
    //----------------upload end

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
    //----------ktorner xoracum end

    const handleDeleteUploadedImage = (id) => {
        let newArr = thisImg.filter((word,index) => index !== id)
        setThisImg(newArr)
    }
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
                addition_info_value: cake_addition_priceNew
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
    return (
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
                            textColor="secondary"
                            indicatorColor="secondary"
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
                        <h3>Addition Description</h3>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="8"
                            value={adition_info_hy}
                            onChange={(e) => setAditionInfoHy(e.target.value)}
                            maxLength="600"
                            cols="50"
                            className="textareaText"
                        />
                        <h3>Long Description</h3>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="8"
                            value={long_description_hy}
                            onChange={(e) => setLongDescriotionHy(e.target.value)}
                            maxLength="600"
                            cols="50"
                            className="textareaText"
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
                        <h3>Addition Description</h3>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="8"
                            value={adition_info_ru}
                            onChange={(e) => setAditionInfoRu(e.target.value)}
                            maxLength="600"
                            cols="50"
                            className="textareaText"
                        />
                        <h3>Long Description</h3>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="8"
                            value={long_description_ey}
                            onChange={(e) => setLongDescriotionRu(e.target.value)}
                            maxLength="600"
                            cols="50"
                            className="textareaText"
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
                        <h3>Addition Description</h3>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="8"
                            value={adition_info_en}
                            onChange={(e) => setAditionInfoEn(e.target.value)}
                            maxLength="600"
                            cols="50"
                            className="textareaText"
                        />
                        <h3>Long Description</h3>
                        <textarea
                            id="w3review"
                            name="textHy"
                            rows="8"
                            value={long_description_en}
                            onChange={(e) => setLongDescriotionEn(e.target.value)}
                            maxLength="600"
                            cols="50"
                            className="textareaText"
                        />
                    </TabPanel>
                </Box>
                <Box m={2}>
                    <h4 style={{
                        marginBottom: "10px"
                    }}>Price</h4>
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
                    <h4 style={{
                        marginBottom: "10px"
                    }}>Category</h4>
                    <FormControl fullWidth>
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
                                                color="secondary"
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
                                                <i className="fa-solid fa-minus">Delete</i>
                                            </Button>
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleAddFieldsRu();
                                                }}
                                                variant="outlined"
                                                color="secondary"
                                            >
                                                <i className="fa-solid fa-plus">Add</i>
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
                                                color="secondary"
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
                <Box>
                    <div className="uploadBtns">
                        <Button color="secondary" variant="contained" component="label">
                            Upload Image
                            <input type="file" hidden multiple onChange={handleFile}/>
                        </Button>
                    </div>
                    <div>
                        {thisImg.length ? thisImg.map((i, index) => {
                            return (
                                <div>
                                    <img
                                        key={i.toString()}
                                        src={i}
                                        alt="newImage"
                                        width={100}
                                        height={100}
                                        style={{margin: "10px"}}
                                    />
                                    <Button variant="outlined" color="error"  color="secondary"
                                            onClick={() => handleDeleteUploadedImage(index)}>Delete This
                                        Image</Button>
                                </div>
                            );
                        }) : null}
                        {thisImg.length >= 5 && (<h3 className="errorText">Նկարները շատ են 5֊ից</h3>)}
                    </div>
                </Box>
                <DialogActions>
                    <Button color="secondary" variant="contained" onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </DialogActions>
            </Box>
        </Modal>
    );
};

export default ProductAddModal;