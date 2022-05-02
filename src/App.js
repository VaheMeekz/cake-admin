import "./style/dark.scss";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Home from "./layouts/Home/Home";
import {useDispatch} from "react-redux"
import { token } from "./api/userApi";
import { thchangeAuAC } from "./store/actiions/authAction";
function App() {
  const dispatch = useDispatch()
  const { darkMode } = useContext(DarkModeContext);

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
