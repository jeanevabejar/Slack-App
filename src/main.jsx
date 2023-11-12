import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import  Login  from './pages/Login/Login';
import Signup  from './pages/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Dashboard/Home';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/",
    element: <Dashboard/>,
    children:[
      {
        path: "/home",
        element: <Home/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  </React.StrictMode>,
)
