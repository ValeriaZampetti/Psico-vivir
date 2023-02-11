import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../docs/assets/Logotipo.png";

export const NavLog = () => {
  const navigate = useNavigate();
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark "
      style={{ backgroundColor: "#211224" }}
    >
      <div className="container-fluid">
        <div className="d-flex">
          <img src={logo} style={{ height: "80px", width: "110px" }} />
        </div>
        <div>
          <Link to="/">
            <button className="btn btn-light m-3 px-5 py-2">{"Volver"}</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};