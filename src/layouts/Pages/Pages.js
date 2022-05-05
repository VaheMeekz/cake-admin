import React from "react";
import { Route, Routes } from "react-router-dom";
import { isAuthPages, isntAuthPages } from "../../utils/routing/routes";
import {  useSelector } from 'react-redux'
import {NOTFOUND_PAGE} from "../../utils/routing/urls";
import NotFound from "../../components/404/404";

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
      {/*<Navigate replace to={NOTFOUND_PAGE} />*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
