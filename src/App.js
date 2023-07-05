import NavBar from "./Pages/navbar/NavBar";
import FinanceTrackerPage from "./Pages/ExpenseTracker/FinanceTrackerPage";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/LoginPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import StocksOverview from "./Pages/StocksPage/StocksOverview";
import StocksDetailedPage from "./Pages/StocksPage/StocksDetailedPage";
import BudgetPage from "./Pages/BudgetPage/BudgetPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(props) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [budget, setBudget] = useState(0);

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
                budget={budget}
              />
            }
          />
          <Route path="/stocksoverview" element={<StocksOverview />} />
          <Route
            path="/stockdetails/:symbol"
            element={<StocksDetailedPage />}
          />
          <Route
            path="/budget"
            element={
              <BudgetPage
                budget={budget}
                setBudget={setBudget}
                transactionHistory={transactionHistory}
              />
            }
          />
          {/* <Route path="/financialtracker" element={<FinanceTrackerPage />} /> */}
        </Routes>
      </Router>
      {/* <DonutGraph /> */}
      <ToastContainer
        theme="colored"
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ChakraProvider>
  );
}

export default App;
