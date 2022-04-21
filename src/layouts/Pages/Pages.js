import React from "react";
import { Route, Routes } from "react-router-dom";
import { isAuthPages, isntAuthPages } from "../../utils/routing/routes";
import {  useSelector } from 'react-redux'
const Pages = () => {

  const isAuth = useSelector(state => state.isAuthReducer.isAuth)
  return (
    <Routes>
      {isAuth
        ? isAuthPages.map((i) => {
            return <Route path={i.path} element={<i.Component />} key={i.id} />;
          })
        : isntAuthPages.map((i) => {
            return <Route path={i.path} element={<i.Component />} key={i.id} />;
          })}

    </Routes>
  );
};

export default Pages;
