import axios from "axios";
import { baseUrl } from "../../api/userApi";
import { GET_ABOUT_US, GET_ABOUT_US_INFO } from "../types";

export const getAboutUsThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/aboutUs/`);
    dispatch({
      type: GET_ABOUT_US,
      payload: response.data[0],
    });
  };
};

export const getAboutUsInfoThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/aboutUsInfo/`);
    dispatch({
      type: GET_ABOUT_US_INFO,
      payload: response.data,
    });
  };
};
