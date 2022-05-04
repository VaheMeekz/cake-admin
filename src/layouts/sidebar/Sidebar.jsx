import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAuthPages } from "../../utils/routing/routes";

const Sidebar = () => {
  const isAuth = useSelector((state) => state.isAuthReducer.isAuth);

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Dashboard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {isAuth
            ? isAuthPages.map(({ id, path, name }) => {
                return (
                  <Link to={path} style={{ textDecoration: "none" }} key={id}>
                    <li>
                    <DashboardIcon className="icon" />
                      <span>{name}</span>
                    </li>
                  </Link>
                );
              })
            : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                    <li>
                      <PersonOutlineIcon className="icon" />
                      <span>Login</span>
                    </li>
                  </Link>
            )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
