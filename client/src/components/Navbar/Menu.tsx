import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";
import { RootStore } from "../../utils/TypeScript";
import Avatar from "../global/Avatar";

const Menu = () => {
  const { auth } = useSelector((state: RootStore) => state);
  const beforeLinks = [
    { label: "Login", to: "/login", icon: "" },
    { label: "Register", to: "/register", icon: "" },
  ];
  const afterLinks = [
    { label: "Tasks", to: "/", icon: "fal fa-border-all" },
    { label: "Create", to: "/create", icon: "far fa-plus" },
  ];
  const { pathname } = useLocation();
  const isActive = (pn: string) => {
    if (pn === pathname) return "active";
  };

  const navArr = auth.token ? afterLinks : beforeLinks;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ul className="navbar-nav d-flex align-items-center">
      {navArr.map((item, index) => (
        <li key={index} className={`nav-item ${isActive(item.to)}`}>
          <Link
            to={item.to}
            className={`nav-link ${isActive(item.to)}`}
            aria-current="page"
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
      {auth.user?.role === "admin" && (
        <li className={`nav-item ${isActive("/category")}`}>
          <Link to="/category" className={`nav-link`} aria-current="page">
            {/* <i className={item.icon}></i> */}
            <span>Category</span>
          </Link>
        </li>
      )}
      {auth.user && (
        <li className="nav-item dropdown">
          <span
            className="nav-link dropdown-toggle d-flex align-items-center text-light"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Avatar src={auth.user.avatar} size="small_avatar" />
          </span>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link to={`/profile/${auth.user?._id}`} className="dropdown-item">
                Profile
              </Link>
            </li>
            <li>
              <Link to="#" className="dropdown-item">
                Create
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link to="#" className="dropdown-item" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </li>
      )}
    </ul>
  );
};

export default Menu;
