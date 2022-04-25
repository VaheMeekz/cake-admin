import { Box } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Pages from "../Pages/Pages";
import Sidebar from "../sidebar/Sidebar";
import "./home.scss";

const Home = () => {
  const [close, setClose] = useState(false);
  return (
    <div className="home">
      {close ? <Sidebar /> : null}
      <div className="homeContainer">
        <Navbar close={close} setClose={setClose} />
        <Box>
          <Pages />
        </Box>
      </div>
    </div>
  );
};

export default Home;
