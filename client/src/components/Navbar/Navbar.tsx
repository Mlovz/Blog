import React from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Search from "./Search";

const Navbar = () => {
  return (
    <div className="fixed__navbar">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light py-0">
          <div className="w-100 px-0 d-flex align-items-center justify-content-between">
            <Link to="/" className="navbar-brand text-light" href="#">
              Poly
            </Link>
            <Search />
            <Menu />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
