import React from "react";
import { MessageBox } from "pages/Messages";
import Button from "Components/Button";
import { GiExitDoor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { removeLocalStorage, getLocalStorage } from "@/Utils";
import { toastInfo } from "@/Utils";
import { useSelectedUsers } from "Components/CustomHook";
import img from 'assets/logout.gif'

const UserSettings = () => {
  const navigate = useNavigate();

  const [selectedUsers, updateSelectedUsers] = useSelectedUsers();
  // Get current user data from local storage, or redirect to login if not available
  const currentUser = getLocalStorage("currentUser") || navigate("/login");
  const userName = currentUser ? currentUser.email.split("@") : null;

  // Function to handle user logout
  const handleLogout = () => {
    // Remove user data from local storage
    removeLocalStorage("headerData");
    removeLocalStorage("currentUser");
    updateSelectedUsers("");
    // Display logout message and navigate to login page
    toastInfo("Successful Logout");
    navigate("/login");
  };

  // JSX structure for user settings page
  return (
    <>
      <div className="nav-extension">
        <div className="settings-container">
          <div className="user-container">
            {/* Display a greeting message with the user's name */}
            <h1>Hello, {currentUser ? userName[0] : []}</h1>
            <p>We're sad to see you go. </p>
            <p>Are you sure?</p>
            <img src={img} alt="logout.gif" />
          </div>
          <div className="logout-container">
            {/* Button to trigger the logout function */}
            <Button className="logout-btn" onClick={handleLogout}>
              <GiExitDoor size={30} />
              Logout
            </Button>
          </div>
        </div>
      </div>
      {/* Display the MessageBox component */}
      <MessageBox />
    </>
  );
};

export default UserSettings;
