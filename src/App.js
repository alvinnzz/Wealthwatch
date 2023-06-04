import NavBar from "./Pages/navbar/NavBar";
import FinanceTrackerPage from "./Pages/TransactionsPage/FinanceTrackerPage";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/LoginPage/RegisterPage";
import HomePage from "./Pages/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import DonutGraph from "./Pages/ExpenseTracker/DonutGraph";
// import useUserId from "./Components/useUserId";

// function setUserId(userId) {
//   sessionStorage.setItem("userId", JSON.stringify(userId));
// }

// function getUserId() {}

function App(props) {
  const [loggedin, setLoggedin] = useState(false);
  // const [userId, setUserId] = useState(null);
  // const { userId, setUserId } = useUserId();
  // const userId = getUserId();

  // `  if (!userId) {
  //     return (
  //       <ChakraProvider>
  //         <Router>
  //           <LoginPage setLoggedin={setLoggedin} setUserId={setUserId} />
  //         </Router>
  //       </ChakraProvider>
  //     );
  //   }`

  return (
    <ChakraProvider>
      <Router>
        <NavBar loggedin={loggedin} setLoggedin={setLoggedin} userId={userId} />
        <HomePage userId={userId} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/login"
            element={
              <LoginPage setLoggedin={setLoggedin} setUserId={setUserId} />
            }
          />
          <Route path="/financialtracker" element={<DonutGraph />} />
          {/* <Route path="/financialtracker" element={<FinanceTrackerPage />} /> */}
        </Routes>
      </Router>
      {/* <DonutGraph /> */}
    </ChakraProvider>
  );
}

export default App;
