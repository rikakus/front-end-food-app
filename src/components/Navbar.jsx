import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-inverse">
      <ul className="nav navbar-nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/new">Add Recipe</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
