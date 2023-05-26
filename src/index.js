import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import HomePage from "./Pages/HomePage/HomePage";
import NavBar from "./Pages/navbar/NavBar";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <NavBar />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/Pages/HomePage/HomePage",
//     element: <HomePage />,
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
