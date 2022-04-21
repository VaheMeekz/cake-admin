import { Box } from "@mui/material";
import React from "react";
import Navbar from "../navbar/Navbar";
import Pages from "../Pages/Pages";
import Sidebar from "../sidebar/Sidebar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <Box>
          <Pages />
        </Box>
      </div>
    </div>
  );
};

export default Home;
