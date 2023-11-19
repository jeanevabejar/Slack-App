import React from "react";
import { MessageBox } from "pages/Messages";
import Button from "components/Button";
import { GiExitDoor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import {removeLocalStorage } from '@/Utils';
import { toastInfo } from "@/Utils";

const UserSettings = () => {
const navigate = useNavigate()
  const handleLogout =()=>{
    removeLocalStorage("headerData")
    toastInfo("Successful Logout")
    console.log("you are logout")
    navigate("/login")
  }

  return (
    <>
      <div className="nav-extension">
        <div className="settings-container">
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
