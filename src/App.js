import "./style/dark.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Home from "./layouts/Home/Home";
import {useDispatch} from "react-redux"
import { token } from "./config/config";
import { thchangeAuAC } from "./store/actions/authAction";
import {useLocation} from "react-router-dom";

function App() {
  const dispatch = useDispatch()
  const { darkMode } = useContext(DarkModeContext);
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(()=>{
      window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
    },100)
  }, [pathname]);

  useEffect(()=>{
    token !== null && dispatch(thchangeAuAC(true));
  },[])

  return (
    <div className={darkMode ? "app dark" : "app"}>
     <Home/>
    </div>
  );
}

export default App;
