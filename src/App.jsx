import NavBar from "./Pages/navbar/NavBar";
import FinanceTrackerPage from "./Pages/TransactionsPage/FinanceTrackerPage";
import MainPage from "./Pages/LoginPage/LogInPage";
import { ChakraProvider } from "@chakra-ui/react";

function App(props) {
  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <div className="App">
        <ChakraProvider>
          <NavBar />
          <MainPage />
        </ChakraProvider>
      </div>
    </>
  );
}

export default App;
