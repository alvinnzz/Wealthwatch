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
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/">About</a>
              </li>

              <li className="services">
                <a href="/">Services</a>

                <ul className="dropdown">
                  <li>
                    <a href="/">Log Transaction </a>
                  </li>
                  <li>
                    <a href="/">Stock Price</a>
                  </li>
                </ul>
              </li>

              <li>
                <a href="/">Login</a>
              </li>
            </div>
          </ul>
        </nav>
      </body>
    </>
  );
}

export default NavBar;
