import { useState, useEffect } from "react";
import Logo from "../../Resources/logoSample.png";
import "./navbarStyle.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

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
              <Button
                colorScheme="#ffcc80"
                variant="link"
                color="black"
                onClick={() => navigate("/")}
              >
                Home
              </Button>
            </li>

            {token != null && (
              <li className="services">
                <Button colorScheme="#ffcc80" variant="link" color="black">
                  Services
                </Button>
                <ul className="dropdown">
                  <li>
                    <Button
                      colorScheme="#ffcc80"
                      variant="link"
                      color="black"
                      onClick={() => navigate("/financialtracker")}
                    >
                      Transaction Page
                    </Button>
                    <Button
                      mt="5px"
                      colorScheme="#ffcc80"
                      variant="link"
                      color="black"
                      onClick={() => navigate("/stocksoverview")}
                    >
                      Stocks Overview
                    </Button>
                  </li>
                </ul>
              </li>
            )}

            {token != null && (
              <li>
                <Button
                  colorScheme="#ffcc80"
                  variant="link"
                  color="black"
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
                </Button>
              </li>
            )}

            {token == null && (
              <li>
                <Button
                  colorScheme="#ffcc80"
                  variant="link"
                  color="black"
                  onClick={() => (window.location = "/login")}
                >
                  Login
                </Button>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
