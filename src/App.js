import NavBar from "./navbar/NavBar";
import FinanceTrackerPage from "./Pages/FinanceTrackerPage";

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
        <body>
          <NavBar />
          <FinanceTrackerPage />
        </body>
      </div>
    </>
  );
}

export default App;
