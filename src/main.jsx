import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import App from "@/App";
import Login from "pages/Login";
import Signup from "pages/Signup";
import { Dashboard, Home } from "pages/Dashboard";
import { MessagePanel } from "./pages/Messages";
import { SearchBar } from "components/SearchBar";
import ChatMessageList from "components/DirectMessage";
import Channels from "components/Channels";
import UserSettings from "pages/UserSettings";
import PrivateRoute from "./Components/PrivateRoute";
import { SelectedOptionsProvider } from 'components/CustomHook';

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
            children: [
              {
                path: "search",
                element: <SearchBar />,
              },
              {
                path: "message",
                element: <ChatMessageList />,
              },
              {
                path: "channels",
                element: <Channels />,
              },
            ],
          },
          {
            path: "settings",
            element: <UserSettings />,
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
    <SelectedOptionsProvider>
          <RouterProvider router={router} />
    </SelectedOptionsProvider>
    <ToastContainer />
  </React.StrictMode>
);
