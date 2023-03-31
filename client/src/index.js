import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Map from "./Pages/Map";
import Logout from "./Pages/Logout";
import Account from "./Pages/Account";
import Tips from "./Pages/Tips";
import Spending from "./Pages/Spending";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "home",
    element: <Home />,
  },
  {
    path: "register",
    element: <Register />,
  },

  {
    path: "login",
    element: <Login />,
  },
  {
    path: "Map",
    element: <Map />,
  },

  {
    path: "logout",
    element: <Logout />,
  },

  {
    path: "myaccount",
    element: <Account />,
  },
  {
    path: "tips",
    element: <Tips />,
  },
  {
    path: "spending",
    element: <Spending />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
