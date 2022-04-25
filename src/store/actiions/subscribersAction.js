import axios from "axios";
import { baseUrl, token } from "../../api/userApi";
import { GET_SUBSCRIBERS } from "../types";

export const getSubscribersThunk = (offset, limit) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/subscribers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        offset,
        limit,
      },
    });
    dispatch({
      type: GET_SUBSCRIBERS,
      payload: response.data,
    });
  };
};
