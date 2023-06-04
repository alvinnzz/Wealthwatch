import { useState, useEffect } from "react";
import Logo from "../../Resources/logoSample.png";
import "./navbarStyle.css";
import { useNavigate } from "react-router-dom";

function NavBar({ token, setToken }) {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <img className="logo" src={Logo} alt="WealthWatch" />

        {/* Navigation Menu */}
        <ul className="nav-links">
          <div className="menu">
            <li>
              <a onClick={() => navigate("/")}>Home</a>
            </li>

            {token != null && (
              <li className="services">
                <a>Services</a>
                <ul className="dropdown">
                  <li>
                    <a onClick={() => navigate("/financialtracker")}>
                      Log Transaction{" "}
                    </a>
                  </li>
                </ul>
              </li>
            )}

            {token != null && (
              <li>
                <a
                  onClick={() => {
                    // sessionStorage.setItem("token", null);
                    // sessionStorage.setItem("userId", null);
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("userId");
                    setToken();
                    navigate("/");
                  }}
                >
                  Logout
                </a>
              </li>
            )}

            {token == null && (
              <li>
                <a onClick={() => (window.location = "/login")}>Login</a>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
