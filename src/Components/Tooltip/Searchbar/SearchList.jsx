import React from 'react';
import loader from 'assets/loader.gif';
import Button from 'Components/Button';
import { IoMdPersonAdd } from 'react-icons/io';
import { MdPersonRemoveAlt1 } from 'react-icons/md';
import { getLocalStorage, setLocalStorage, toastInfo, toastSuccess } from '@/Utils';

const SearchList = ({ users, loading, error, selectedOptions }) => {
  // Handle click to add friend
  const handleClick = (selectedOptions) => {
    console.log('Clicked on:', selectedOptions);
    const friends = getLocalStorage('friendList') || [];
    console.log('Current Friends:', friends);
    const existingFriend = friends.some((friend) => friend.value === selectedOptions.value);
    console.log('Existing Friend:', existingFriend);

    if (!existingFriend) {
      // Add to friends list
      const updatedFriends = [...friends, selectedOptions];
      toastSuccess('Successfully added to friends.');
      setLocalStorage('friendList', updatedFriends);
    } else {
      // User is already in friends list
      toastInfo('This user is already in your friends list.');
    }
  };

  // Handle click to remove friend
  const removeFriend = (selectedOptions) => {
    const friends = getLocalStorage('friendList') || [];
    const existingFriendIndex = friends.findIndex((friend) => friend.value === selectedOptions.value);

    if (existingFriendIndex !== -1) {
      // Remove from friends list
      friends.splice(existingFriendIndex, 1);
      setLocalStorage('friendList', friends);
      toastSuccess('Successfully unfriended.');
    } else {
      // User is not in friends list
      toastInfo('This user is not in your friends list.');
    }
  };

  return (
    <>
      <div className="search-result-container">
        <div className="result-container">
          {loading && <img className="spinner" src={loader} />}
          {error && <p>Error: {error.message}</p>}
          {selectedOptions && (
            <>
              <h4>Selected Options:</h4>
              <ul className="selected-list">
                <li>{selectedOptions.label}</li>
                {/* Button to add friend */}
                <Button
                  text={<IoMdPersonAdd size={20} />}
                  onClick={() => handleClick(selectedOptions)}
                />
                {/* Button to remove friend */}
                <Button
                  text={<MdPersonRemoveAlt1 size={20} />}
                  onClick={() => removeFriend(selectedOptions)}
                />
              </ul>
            </>
          )}
          {users.length > 0 && (
            <>
              <h4>Latest User:</h4>
              <ul className="latest-list">
                {/* Display latest users */}
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
