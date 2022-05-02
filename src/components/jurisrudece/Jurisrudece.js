import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {jurisReducer} from "../../store/reducers/jurisReducer";
import {getDeleveryDataThunk, getTermsDataThunk} from "../../store/actiions/jurisAction";
import Terms from "../jurispridenceComponents/Terms";
import Delevery from "../jurispridenceComponents/Delevery";

const Jurisrudece = () => {
    const dispatch = useDispatch()
    const terms = useSelector(state => state?.jurisReducer.terms)
    const delevery = useSelector(state => state?.jurisReducer.delevery)
    useEffect(() => {
        dispatch(getTermsDataThunk())
        dispatch(getDeleveryDataThunk())
    }, [])
    return (
        <Box m={2}>
            <h2 mt={3} mb={3}>Jurisrudece</h2>
            <Box m={2}>
                <Terms data={terms}/>
                <hr/>
                <Delevery data={delevery}/>
            </Box>
        </Box>
    );
};

export default Jurisrudece;