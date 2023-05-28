import Logo from "../../Resources/logoSample.png";
import "./navbarStyle.css";

function NavBar({ loggedin }) {
  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <img className="logo" src={Logo} alt="WealthWatch" />

        {/* Navigation Menu */}
        <ul className="nav-links">
          <div className="menu">
            <li>
              <a onClick={() => (window.location = "/")}>Home</a>
            </li>

            {loggedin ? (
              <li className="services">
                <a>Services</a>
                <ul className="dropdown">
                  <li>
                    <a onClick={() => (window.location = "/financialtracker")}>
                      Log Transaction{" "}
                    </a>
                  </li>
                </ul>
              </li>
            ) : (
              <div />
            )}

            {loggedin ? (
              <div />
            ) : (
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
