import axios from "axios";
import { baseUrl } from "../../api/userApi";
import { GET_CHOOSE } from "../types";

export const getChooseThunk = () => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/choose`);
        dispatch({
            type: GET_CHOOSE,
            payload: response.data,
        });
    };
};
