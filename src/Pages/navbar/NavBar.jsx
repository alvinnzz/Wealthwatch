import Logo from "../../Resources/logoSample.png";
import "./navbarStyle.css";
import { useNavigate } from "react-router-dom";

function NavBar({ setLoggedin, loggedin }) {
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

            {loggedin && (
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

            {loggedin && (
              <li>
                <a
                  onClick={() => {
                    setLoggedin(false);
                    navigate("/");
                  }}
                >
                  Logout
                </a>
              </li>
            )}

            {!loggedin && (
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
