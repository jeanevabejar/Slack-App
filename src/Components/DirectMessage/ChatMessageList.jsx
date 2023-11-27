import React from "react";
import { getLocalStorage, extractUsername } from "@/Utils";
import Button from "Components/Button";
import profile from "assets/profile.png";
import { useSelectedUsers } from 'Components/CustomHook';

const ChatMessageList = () => {
  // Retrieve friend list from local storage or default to an empty array
  const friends = getLocalStorage("friendList") || [];

  // Use the custom hook to get the selected users and the function to update them
  const [selectedUsers, updateSelectedUsers] = useSelectedUsers();

  // Handle click event for selecting a friend
  const handleClick = (friend) => { 
    // Update the selected users with the clicked friend
    console.log(friend)
    updateSelectedUsers(friend);
  };


  return (
    <div className="friend-list-container">
      <h1>Friend List</h1>
      <ul className="friend-list-section">
        {friends && friends.length >= 0 && friends.map((friend, index) => (
          <li key={index}>
            {/* Button component with a click handler to select a friend */}
            <Button onClick={() => handleClick(friend)}>
              {/* Display friend's profile image and username */}
              <img src={profile} alt="profile.jpg" />
              @{extractUsername(friend.label)}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessageList;
