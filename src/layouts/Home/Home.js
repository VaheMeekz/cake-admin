import { Box } from "@mui/material";
import React, {useEffect, useState} from "react";
import Navbar from "../navbar/Navbar";
import Pages from "../Pages/Pages";
import Sidebar from "../sidebar/Sidebar";
import "./home.scss";
import {token} from "../../api/userApi";
import {thchangeAuAC} from "../../store/actiions/authAction";
import {useDispatch} from "react-redux";

const Home = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        token !== null && dispatch(thchangeAuAC(true));
    },[])
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
