import React, {useEffect, useState} from 'react';
import Modal from "@mui/material/Modal";
import {Box, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import ProductAddImage from "../productEditImage/productAddImage";
import ProductEditImage from "../productEditImage/productEditImage";
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

const ProductEditModal = ({openEdit, setOpenEdit, currentId, row}) => {
    //-------states
    const [cuurentEditImage, setCuurentEditImage] = useState(null)
    const [editImage, setEditImage] = useState(null)
    const [nameHy, setNameHy] = useState();
    const [nameRu, setNameRu] = useState();
    const [nameEn, setNameEn] = useState();
    const [descriptionHy, setDescripHy] = useState();
    const [descriptionRu, setDescripRu] = useState();
    const [descriptionEn, setDescripEn] = useState();
    const [image, setImage] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [londDescHy, setLongDescHy] = useState()
    const [londDescRu, setLongDescRu] = useState()
    const [londDescEn, setLongDescEn] = useState()
    const [value, setValue] = useState(0);
    //-------states end

    useEffect(() => {
        openEdit && setNameHy(row.nameHy);
        openEdit && setNameRu(row.nameRu);
        openEdit && setNameEn(row.nameEn);
        openEdit && setDescripHy(row.descriptionHy);
        openEdit && setDescripRu(row.descriptionRu);
        openEdit && setDescripEn(row.descriptionEn);
        openEdit && setPrice(row.price);
        openEdit && setImage(row.image);
        openEdit && setCategory(row.category_id);
        openEdit && setLongDescHy(row.long_description_hy)
        openEdit && setLongDescRu(row.long_description_ey)
        openEdit && setLongDescEn(row.long_description_en)

    }, [row])

    const handleFileEdit = (e, index) => {

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
                setEditImage(res.data.url);
            });
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
                longDescriptionHy: londDescHy,
                longDescriptionRu: londDescRu,
                longDescriptionEn: londDescEn,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(function (response) {
                if (!response.data.error) {
                    Swal.fire({
                        position: "center", icon: "success", title: "Succsess!", showConfirmButton: false, timer: 1500,
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
    return (
        <div>
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
                                textColor="secondary"
                                indicatorColor="secondary"
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
                        </TabPanel>
                    </Box>
                    <Box ml={2}>
                        <h3>Price</h3>
                        <TextField
                            id="outlined-basic"
                            variant="standard"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Box>
                    <Box m={2}>
                        <Button color="secondary" variant="contained" onClick={handleEdit}>
                            Submit
                        </Button>
                    </Box>
                    <hr/>
                    <Box>
                        <h4>
                            Add new Image
                        </h4>
                        <ProductAddImage setOpenEdit={setOpenEdit} currentId={currentId}/>
                    </Box>
                    <hr/>
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
                                <ProductEditImage editImage={editImage ? true : false}
                                                  image={i} index={index}
                                                  handleEditImage={handleEditImage}
                                                  cuurentEditImage={cuurentEditImage}
                                                  currentId={currentId}
                                                  setOpenEdit={setOpenEdit}
                                />

                                <Box>
                                    <div className="uploadBtns">
                                        <Button color="secondary" component="label" variant="contained">
                                            Upload edited image
                                            <input type="file" hidden multiple onChange={(e) => {
                                                handleFileEdit(e)
                                                setCuurentEditImage(index)
                                            }}/>
                                        </Button>
                                    </div>
                                </Box>
                            </div>)
                        })}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default ProductEditModal;