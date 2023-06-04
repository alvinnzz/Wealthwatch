import NavBar from "./Pages/navbar/NavBar";
import FinanceTrackerPage from "./Pages/TransactionsPage/FinanceTrackerPage";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/LoginPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DonutGraph from "./Pages/ExpenseTracker/DonutGraph";
import { useState } from "react";

function App(props) {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  return (
    <ChakraProvider>
      <Router>
        <NavBar token={token} setToken={setToken} />
        <HomePage />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setToken={setToken} />} />
          <Route path="/financialtracker" element={<DonutGraph />} />
          {/* <Route path="/financialtracker" element={<FinanceTrackerPage />} /> */}
        </Routes>
      </Router>
      {/* <DonutGraph /> */}
    </ChakraProvider>
  );
}

export default App;
