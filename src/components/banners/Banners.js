import { Box } from "@mui/material";
import React from "react";
import AboutBanner from "../bannerComponents/AboutUsBanner";
import HomeBanner from "../bannerComponents/HomeBanner";

const Banners = () => {
  return (
    <Box m={3}>
      <h1 mt={3} mb={3}>
        Banners Settings
      </h1>
      <HomeBanner />
      <hr />
      <AboutBanner />
    </Box>
  );
};

export default Banners;
