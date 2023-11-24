import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// pages
import App from "@/App";
import Login from "pages/Login/Login.jsx";
import Signup from "pages/Signup/Signup.jsx";
import { Dashboard, Home } from "pages/Dashboard/Dashboard.jsx";
import { MessagePanel } from "pages/Messages/Message.jsx";
import { SearchBar } from "components/SearchBar/SearchBar.jsx";
import ChatMessageList from "components/DirectMessage/ChatMessageList.jsx";
import Channels from "components/Channels/Channels.jsx";
import UserSettings from "pages/UserSettings/UserSettings.jsx";
import PrivateRoute from "components/PrivateRoute/PrivateRoute.jsx";
import { UsersProvider } from "components/CustomHook/UserProvider.jsx";
import TooltipContainer from "components/Tooltip/TooltipContainer.jsx";


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
