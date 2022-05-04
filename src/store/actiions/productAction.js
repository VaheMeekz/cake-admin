import axios from "axios";
import { baseUrl } from "../../api/userApi";
import { GET_PRODUCTS } from "../types";

export const getProductsThunk = (offset, limit,search) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/products/all`, {
      params: {
        offset,
        limit,
        search
      },
    });
    dispatch({
      type: GET_PRODUCTS,
      payload: response.data,
    });
  };
};
