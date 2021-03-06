import axios from "axios";
import { baseUrl } from "../../api/userApi";
import { GET_CATEGORY } from "../types";

export const getCategoryThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/category`);
    dispatch({
      type: GET_CATEGORY,
      payload: response.data,
    });
  };
};
