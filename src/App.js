import NavBar from "./Pages/navbar/NavBar";
import FinanceTrackerPage from "./Pages/TransactionsPage/FinanceTrackerPage";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/LoginPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App(props) {
  const [loggedin, setLoggedin] = useState(false);
  return (
    <ChakraProvider>
      <Router>
        <NavBar loggedin={loggedin} setLoggedin={setLoggedin} />
        <HomePage />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/login"
            element={<LoginPage setLoggedin={setLoggedin} />}
          />
          <Route path="/financialtracker" element={<FinanceTrackerPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
