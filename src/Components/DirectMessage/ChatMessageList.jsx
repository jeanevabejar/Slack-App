import React, { useEffect } from "react";
import { getLocalStorage } from "@/Utils";
import Button from "components/Button";
import profile from "assets/profile.png";
import { useSelectedUsers } from 'components/CustomHook';

const ChatMessageList = () => {
  const friends = getLocalStorage("friendList") || [];
  const [selectedUsers, updateSelectedUsers] = useSelectedUsers();

  const handleClick = (option)=>{
console.log("target",option );
updateSelectedUsers(option)

  }



  useEffect(() => {
   

  }, []);

  return (
    <>
      <div className="friend-list-container">
        <h1>Friend List</h1>
        <ul className="friend-list-section">
          {friends && friends.length >= 0 && friends.map((option, index) => (
            <li key={index}>
              <Button onClick={()=>handleClick(option)}>
                <img src={profile} alt="profile.jpg" />
                @{option.label.split("@")[0]}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChatMessageList;
