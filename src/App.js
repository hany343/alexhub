import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./Home/Home";
import Contact from "./Contact/Contact";
import Layout from "./Layout/Layout";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Tasks from "./Tasks/Tasks";
import Dashboard from "./Dashboard/Dashboard";
import Logout from "./Log Out/Logout.jsx";
import "./App.css";
import AuthContextProvider, { AuthContext } from "./Contexts/AuthContext";
import { useContext } from "react";
import NewTicket from "./NewTicket/NewTicket";
import AssignTicket from "./AssignTicket/AssignTicket.jsx";


function App() {
  //let {UserIsLogedIn}=useContext(AuthContext);

  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/home", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "logout", element: <Logout /> },
        { path: "register", element: <Register /> },
        { path: "tasks", element: <Tasks /> },
        { path: "Contact", element: <Contact /> },
        { path: "Dashboard", element: <Dashboard /> },
        { path: "/new-ticket", element: <NewTicket /> },
        { path: "/assign-ticket", element: <AssignTicket /> },

      ],
    },
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={routers}></RouterProvider>
    </AuthContextProvider>
  );
}

export default App;
