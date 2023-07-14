import Logo from "../../Resources/logoSample.png";
import "./navbarStyle.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { toast } from 'react-toastify';

function NavBar({
  token,
  setToken,
  setTransactionHistory,
  transactionHistory,
  budget,
  setBudget
}) {
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const uid = sessionStorage.getItem("userId");
      const response = await fetch(
        "https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/transactions/user/" +
          uid,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      setTransactionHistory(responseData.transactions);
      console.log(transactionHistory);
      console.log(responseData.transactions);
    } catch (err) {
      console.log(err);
      alert("Receiving transaction failed!");
    }
  };

  const fetchBudget = async () => {
    try {
      const uid = sessionStorage.getItem("userId");
      const response = await fetch(
        "https://wealthwatchbackend-c341579f13b3.herokuapp.com/api/users/" +
          uid + "/getBudget",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      setBudget(responseData.monthlyBudget);
      console.log(responseData.monthlyBudget);
    } catch (err) {
      console.log(err);
      alert("Receiving budget failed!");
    }
  };

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
                      onClick={() => {
                        navigate("/budget");
                        fetchTransactions();
                        fetchBudget();
                      }}
                    >
                      Budget
                    </Button>
                    <Button
                      colorScheme="#ffcc80"
                      variant="link"
                      color="black"
                      onClick={() => {
                        navigate("/financialtracker");
                        fetchTransactions();
                        fetchBudget();
                      }}
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
                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("userId");
                    setToken();
                    navigate("/");
                    toast.success("Logout successfully!");
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
