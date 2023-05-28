import { Button } from "@chakra-ui/react";
import Logo from "../../Resources/logoSample.png";
import "./navbarStyle.css";

function NavBar() {
  return (
    <>
      <body>
        <nav className="navbar">
          {/* Logo */}
          <img className="logo" src={Logo} alt="WealthWatch" />

          {/* Navigation Menu */}
          <ul className="nav-links">
            <div className="menu">
              <li>
                <a onClick={() => (window.location.href = "/")}>Home</a>
              </li>

              <li className="services">
                <a href="/">Services</a>

                <ul className="dropdown">
                  <li>
                    <a
                      onClick={() =>
                        (window.location.href = "/financialtracker")
                      }
                    >
                      Log Transaction{" "}
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a onClick={() => (window.location.href = "/login")}>Login</a>
              </li>
            </div>
          </ul>
        </nav>
      </body>
    </>
  );
}

export default NavBar;
