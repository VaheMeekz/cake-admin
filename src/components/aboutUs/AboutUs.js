import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";

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
  const [value, setValue] = React.useState(0);
  const [titleAm, setTitleAm] = useState();
  const [titleRu, setTitleRu] = useState();
  const [titleEn, setTitleEn] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <TextField id="standard-basic" label="Am" variant="standard" />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <h3 mt={3} mb={3}>
            Title
          </h3>
          <TextField id="standard-basic" label="Ru" variant="standard" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <h3 mt={3} mb={3}>
            Title
          </h3>
          <TextField id="standard-basic" label="En" variant="standard" />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default AboutUs;
