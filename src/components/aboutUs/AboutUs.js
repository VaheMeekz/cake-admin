import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getAboutUsInfoThunk,
  getAboutUsThunk,
} from "../../store/actiions/aboutUsAction";
import "./aboutUs.scss";
import { baseUrl, token } from "../../api/userApi";
import axios from "axios";
import Swal from "sweetalert2";
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

const AboutUs = () => {
  const dispatch = useDispatch();
  const aboutUsData = useSelector((state) => state?.aboutUsReducer.aboutUs);
  const aboutUsInfo = useSelector((state) => state.aboutUsReducer.aboutUsInfo);
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState({});
  const [subTitleValue, setSubtitleValue] = React.useState(0);
  const [infoOpen, setInfoOpen] = useState(0);
  const [infoData, setInfoData] = useState({});
  const [rend, setRend] = useState(false);
  //values
  const [titleHy, setTitleHy] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [subTitleHy, setSubTitleHy] = useState("");
  const [subTitleRu, setSubTitleRu] = useState("");
  const [subTitleEn, setSubTitleEn] = useState("");
  //
  useEffect(() => {
    dispatch(getAboutUsThunk());
    dispatch(getAboutUsInfoThunk());
  }, [rend]);

  useEffect(() => {
    setTitleHy(aboutUsData && aboutUsData.titleHy);
    setTitleRu(aboutUsData && aboutUsData.titleRu);
    setTitleEn(aboutUsData && aboutUsData.titleEn);
    setSubTitleHy(aboutUsData && aboutUsData.textHy);
    setSubTitleRu(aboutUsData && aboutUsData.textRu);
    setSubTitleEn(aboutUsData && aboutUsData.textEn);
  }, [aboutUsData, aboutUsInfo]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSubTitleTabs = (event, newValue) => {
    setSubtitleValue(newValue);
  };

  const handleOpenInfoTabs = (event, newValue) => {
    setInfoOpen(newValue);
  };

  const handleInfoChangeValues = (e) => {
    infoData[e.target.name] = e.target.value;
    setInfoData(infoData);
  };

  const handleSubmit = () => {
    axios
      .post(
        `${baseUrl}/aboutUs/edit`,
        {
          id: 1,
          titleHy,
          titleEn,
          titleRu,
          textHy: subTitleHy,
          textEn: subTitleEn,
          textRu: subTitleRu,
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
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
          setData(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAddInfo = () => {
    axios
      .post(`${baseUrl}/aboutUsInfo/`, infoData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        if (!response.data.error) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Succses",
            showConfirmButton: false,
            timer: 1500,
          });
          setRend(!rend);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box m={3}>
      <h2 mt={3} mb={3}>
        About Us Settings
      </h2>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Arm" {...a11yProps(0)} />
            <Tab label="Ru" {...a11yProps(1)} />
            <Tab label="En" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <h3 mt={3} mb={3}>
            Title
          </h3>
          <TextField
            id="standard-basic"
            value={titleHy}
            name="titleHy"
            defaultValue={aboutUsData.length == 0 ? null : aboutUsData.titleHy}
            onChange={(e) => setTitleHy(e.target.value)}
            label="Am"
            variant="standard"
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <h3 mt={3} mb={3}>
            Title
          </h3>
          <TextField
            id="standard-basic"
            value={titleRu}
            defaultValue={aboutUsData.length == 0 ? null : aboutUsData.titleRu}
            name="titleRu"
            onChange={(e) => setTitleRu(e.target.value)}
            label="Ru"
            variant="standard"
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h3 mt={3} mb={3}>
            Title
          </h3>
          <TextField
            id="standard-basic"
            value={titleEn}
            name="titleEn"
            defaultValue={aboutUsData.length == 0 ? null : aboutUsData.titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            label="En"
            variant="standard"
          />
        </TabPanel>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={subTitleValue}
            onChange={handleChangeSubTitleTabs}
            aria-label="basic tabs example"
          >
            <Tab label="Arm" {...a11yProps(0)} />
            <Tab label="Ru" {...a11yProps(1)} />
            <Tab label="En" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={subTitleValue} index={0}>
          <h3 mt={3} mb={3}>
            subTitle
          </h3>
          <textarea
            id="w3review"
            name="textHy"
            rows="8"
            value={subTitleHy}
            onChange={(e) => setSubTitleHy(e.target.value)}
            maxlength="600"
            cols="60"
            defaultValue={aboutUsData.length == 0 ? null : aboutUsData.textHy}
            className="textareaText"
          />
        </TabPanel>

        <TabPanel value={subTitleValue} index={1}>
          <h3 mt={3} mb={3}>
            subTitle
          </h3>
          <textarea
            id="w3review"
            name="textRu"
            rows="8"
            value={subTitleRu}
            onChange={(e) => setSubTitleRu(e.target.value)}
            maxlength="600"
            defaultValue={aboutUsData.length == 0 ? null : aboutUsData.textRu}
            cols="60"
            className="textareaText"
          />
        </TabPanel>
        <TabPanel value={subTitleValue} index={2}>
          <h3 mt={3} mb={3}>
            subTitle
          </h3>
          <textarea
            id="w3review"
            name="textEn"
            value={subTitleEn}
            onChange={(e) => setSubTitleEn(e.target.value)}
            rows="8"
            maxlength="600"
            defaultValue={aboutUsData.length == 0 ? null : aboutUsData.textEn}
            cols="60"
            className="textareaText"
          />
        </TabPanel>
      </Box>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      <Box m={3}>
        <h2 mt={3} mb={3}>
          About Us Info Settings
        </h2>
        <Box sx={{ width: "100%" }}>
          {aboutUsInfo.map((i, index) => {
            return (
              <div key={index}>
                <p>
                  <strong>{index + 1}</strong>
                </p>
                <hr className="hrLine" />
                <h3>{i.titleHy}</h3>
                <p>{i.textHy}</p>
                <h3>{i.titleRu}</h3>
                <p>{i.textRu}</p>
                <h3>{i.titleEn}</h3>
                <p>{i.textEn}</p>
                <hr />
              </div>
            );
          })}
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={infoOpen}
              onChange={handleOpenInfoTabs}
              aria-label="basic tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={infoOpen} index={0}>
            <TextField
              id="standard-basic"
              defaultValue={
                aboutUsInfo.length == 0 ? null : aboutUsInfo.titleHy
              }
              name="titleHy"
              onChange={handleInfoChangeValues}
              label="Hy"
              variant="standard"
            />
            <br />
            <textarea
              id="w3review"
              name="textHy"
              rows="8"
              onChange={handleInfoChangeValues}
              maxlength="600"
              cols="60"
              defaultValue={aboutUsInfo.length == 0 ? null : aboutUsInfo.textHy}
              className="textareaText"
            />
          </TabPanel>
          <TabPanel value={infoOpen} index={1}>
            <TextField
              id="standard-basic"
              defaultValue={
                aboutUsInfo.length == 0 ? null : aboutUsInfo.titleHy
              }
              name="titleRu"
              onChange={handleInfoChangeValues}
              label="Ru"
              variant="standard"
            />
            <br />
            <textarea
              id="w3review"
              name="textRu"
              rows="8"
              onChange={handleInfoChangeValues}
              maxlength="600"
              cols="60"
              defaultValue={aboutUsInfo.length == 0 ? null : aboutUsInfo.textHy}
              className="textareaText"
            />
          </TabPanel>
          <TabPanel value={infoOpen} index={2}>
            <TextField
              id="standard-basic"
              defaultValue={
                aboutUsInfo.length == 0 ? null : aboutUsInfo.titleRu
              }
              name="titleEn"
              onChange={handleInfoChangeValues}
              label="En"
              variant="standard"
            />
            <br />
            <textarea
              id="w3review"
              name="textEn"
              rows="8"
              onChange={handleInfoChangeValues}
              maxlength="600"
              cols="60"
              defaultValue={aboutUsInfo.length == 0 ? null : aboutUsInfo.textEn}
              className="textareaText"
            />
          </TabPanel>
        </Box>
        <Button variant="contained" onClick={handleAddInfo}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AboutUs;
