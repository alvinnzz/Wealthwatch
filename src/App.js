import NavBar from "./Pages/navbar/NavBar";
import FinanceTrackerPage from "./Pages/ExpenseTracker/FinanceTrackerPage";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/LoginPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import TipGenerator from "./Pages/TipGenerator";
import StocksOverview from "./Pages/StocksPage/StocksOverview";
import StocksDetailedPage from "./Pages/StocksPage/StocksDetailedPage";

function App(props) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [transactionHistory, setTransactionHistory] = useState([]);

  return (
    <ChakraProvider>
      <Router>
        <NavBar
          token={token}
          setToken={setToken}
          setTransactionHistory={setTransactionHistory}
          transactionHistory={transactionHistory}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route
            path="/financialtracker"
            element={
              <FinanceTrackerPage
                transactionHistory={transactionHistory}
                setTransactionHistory={setTransactionHistory}
              />
            }
          />
          <Route path="/stocksoverview" element={<StocksOverview />} />
          <Route
            path="/stockdetails/:symbol"
            element={<StocksDetailedPage />}
          />
          {/* <Route path="/financialtracker" element={<FinanceTrackerPage />} /> */}
        </Routes>
      </Router>
      {/* <DonutGraph /> */}
    </ChakraProvider>
  );
}

export default App;
