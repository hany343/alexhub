import React from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Home/Home'
import Contact from './Contact/Contact'
import Layout from './Layout/Layout'
import Login from './Login/Login'
import Register from './Register/Register'
import Tasks from './Tasks/Tasks'
import Dashboard from './Dashboard/Dashboard'


import './App.css';
import AuthContextProvider, { AuthContext } from './Contexts/AuthContext'
import { useContext } from 'react'

function App() {
  //let {UserIsLogedIn}=useContext(AuthContext);

  let routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { path: '/', element: <Dashboard  /> },
        { path: '/home', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'tasks', element: <Tasks /> },
        { path: 'Contact', element: <Contact /> },
        { path: 'Dashboard', element: <Dashboard /> },

      ]
    }

  ])

  return (
    <AuthContextProvider>
      <RouterProvider router={routers}>
      </RouterProvider>
    </AuthContextProvider>
    
  );
}

export default App;
