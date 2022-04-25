import axios from "axios";
import { baseUrl, token } from "../../api/userApi";
import { GET_USERS } from "../types";

export const getCountriesThunk = (offset, limit) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        offset,
        limit,
      },
    });
    dispatch({
      type: GET_USERS,
      payload: response.data,
    });
  };
};
