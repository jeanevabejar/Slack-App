import React from "react";
import { MessageBox } from "pages/Messages";
import Button from "components/Button";
import { GiExitDoor } from "react-icons/gi";
import { useLoaderData, useNavigate } from "react-router-dom";
import { removeLocalStorage, getLocalStorage } from "@/Utils";
import { toastInfo } from "@/Utils";

const UserSettings = () => {
  const navigate = useNavigate();
  const currentUser = getLocalStorage("currentUser") || navigate("/login");
  const userName = currentUser ? currentUser.email.split("@") : null;
  const handleLogout = () => {
    removeLocalStorage("headerData");
    removeLocalStorage("currentUser");
    toastInfo("Successful Logout");
    console.log("you are logout");
    navigate("/login");
  };

  return (
    <>
      <div className="nav-extension">
        <div className="settings-container">
          <div className="user-container">
            <h1>Hello, {currentUser ? userName[0] : []}</h1>
          </div>
          <div className="logout-container">
            <Button className="logout-btn" onClick={handleLogout}>
              <GiExitDoor size={30} />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <MessageBox />
    </>
  );
};

export default UserSettings;
