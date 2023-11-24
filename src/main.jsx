import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import App from "@/App";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { Dashboard, Home } from "@/pages/Dashboard";
import { MessagePanel } from "@/pages/Messages";
import { SearchBar } from "@/components/SearchBar";
import ChatMessageList from "@/components/DirectMessage";
import Channels from "@/components/Channels";
import UserSettings from "@/pages/UserSettings";
import PrivateRoute from "@/components/PrivateRoute";
import { UsersProvider } from "@/components/CustomHook";
import TooltipContainer from "@/components/Tooltip";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "messenger",
            element: <MessagePanel />,
            loader: PrivateRoute,
            children: [
              {
                path: "search",
                element: <SearchBar />,
                loader: PrivateRoute,
              },
              {
                path: "message",
                element: <ChatMessageList />,
                loader: PrivateRoute,
              },
              {
                path: "channels",
                element: <Channels />,
                loader: PrivateRoute,
               
              },
            ],
          },
          {
            path: "settings",
            element: <UserSettings />,
            loader: PrivateRoute,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UsersProvider>
      <RouterProvider router={router} />
    </UsersProvider>
    <ToastContainer />
    <TooltipContainer />
  </React.StrictMode>
);
