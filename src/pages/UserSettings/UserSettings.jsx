import React from 'react';
import { MessageBox } from 'pages/Messages';
import Button from 'components/Button';
import { GiExitDoor } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { removeLocalStorage, getLocalStorage } from '@/Utils';
import { toastInfo } from '@/Utils';

const UserSettings = () => {
  const navigate = useNavigate();

  // Get current user data from local storage, or redirect to login if not available
  const currentUser = getLocalStorage('currentUser') || navigate('/login');
  const userName = currentUser ? currentUser.email.split('@') : null;

  // Function to handle user logout
  const handleLogout = () => {
    // Remove user data from local storage
    removeLocalStorage('headerData');
    removeLocalStorage('currentUser');

    // Display logout message and navigate to login page
    toastInfo('Successful Logout');
    navigate('/login');
  };

  // JSX structure for user settings page
  return (
    <>
      <div className="nav-extension">
        <div className="settings-container">
          <div className="user-container">
            {/* Display a greeting message with the user's name */}
            <h1>Hello, {currentUser ? userName[0] : []}</h1>
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
