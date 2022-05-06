import React,{useState} from "react";
import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";
import Menu from '@mui/material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import {thchangeAuAC} from "../../store/actiions/authAction";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Navbar = ({ close, setClose }) => {
  const { dispatch } = useContext(DarkModeContext);
  const dis = useDispatch()
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    dis(thchangeAuAC(false));
    localStorage.removeItem("myToken")
    navigate('/')
  }
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {close ? (
            <CloseIcon onClick={() => setClose(!close)} />
          ) : (
            <ClearAllIcon onClick={() => setClose(!close)} />
          )}
        </div>
        <div className="items">
          <div className="item">
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="image"
              className="avatar"
              onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
            >
              <MenuItem onClick={handleLogOut}><LogoutIcon/>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
