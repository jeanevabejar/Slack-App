import React from "react";
import spinner from "assets/loader.gif";
import Button from "components/Button";
import { IoMdPersonAdd } from "react-icons/io";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { getLocalStorage, setLocalStorage, toastInfo, toastSuccess } from "@/Utils";


const SearchList = ({ users, loading, error, selectedOptions }) => {
  
  const handleClick = (option) => {
    console.log("Clicked on:", option);
    const friends = getLocalStorage("friendList") || [];
    console.log("Current Friends:", friends);
    const existingFriend = friends.some((friend) => friend.value === option.value);
    console.log("Existing Friend:", existingFriend);
  
    if (!existingFriend) {
      const updatedFriends = [...friends, option];
      toastSuccess("Successfully added to friends.");
      setLocalStorage("friendList", updatedFriends);
    } else if (existingFriend){
      toastInfo("This user is already in your friends list.");
    } else {
      setLocalStorage("friendList", option);
      toastSuccess("Successfully added to friends.");
    }
  };
  
  const removeFriend = (option) => {
    const friends = getLocalStorage("friendList") || [];
    const existingFriendIndex = friends.findIndex((friend) => friend.value === option.value);
  
    if (existingFriendIndex !== -1) {
      friends.splice(existingFriendIndex, 1);
      setLocalStorage("friendList", friends);
      toastSuccess("Successfully unfriended.");
    } else {
      toastInfo("This user is not in your friends list.");
    }
  };
  
  return (
    <>
      <div className="search-result-container">
        <div className="result-container">
          {loading && <img className="spinner" src={spinner} />}
          {error && <p>Error: {error.message}</p>}
          {selectedOptions && selectedOptions.length > 0 && (
            <>
              <h4>Selected Options:</h4>
              <ul className="selected-list">
                {selectedOptions.map((option, index) => (
                  <>
                    <li key={index}>{option.label}</li>{" "}
                    <Button
                      text={<IoMdPersonAdd size={20} />}
                      onClick={() => handleClick(option)}
                    />
                    <Button
                      text={<MdPersonRemoveAlt1 size={20} />}
                    onClick={()=> removeFriend(option)}
                    />
                  </>
                ))}
              </ul>
            </>
          )}
          {users.length > 0 && (
            <>
              <h4>Latest User:</h4>
              <ul className="latest-list">
                {users.map((item, index) => (
                  <li key={index}>{item.email}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchList;
