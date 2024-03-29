import React, { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import Input from "Components/Input";
import Button from "Components/Button";
import { getLocalStorage, toastError, toastSuccess } from "@/Utils";
import { useFetch } from "Components/CustomHook";

const Dropdown = ({setCreateDropdownVisible}) => {
  const friends = getLocalStorage("friendList") || [];

  const [selectedFriendIds, setSelectedFriendIds] = useState([]);
  const [input, setInput] = useState({
    channelName: "",
    ids: selectedFriendIds,
  });

  const { data, loading, error, fetchData } = useFetch();

  // Handle checkbox change
  const handleCheckboxChange = (friend) => {
    const value = friend.value;
    setSelectedFriendIds((prevIds) => {
      if (prevIds.includes(value)) {
        return prevIds.filter((id) => id !== value);
      } else {
        return [...prevIds, value];
      }
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = getLocalStorage("headerData");

    const url = "http://206.189.91.54/api/v1/channels";
    const config = {
      method: "POST",
      headers: { ...userData },
      body: {
        user_ids: selectedFriendIds,
        name: input.channelName.toLowerCase(),
      },
    };

    fetchData(url, config);
  };

  // Handle success or error after data fetch
  useEffect(() => {
    if (!loading && !error &&  !data.errors) {
      toastSuccess("Successfully Created Channel");
      setCreateDropdownVisible(false)
    } else if (data && data.errors) {
      toastError(data.errors[0]);
    }
  }, [loading, error, data, selectedFriendIds]);

  return (
    <>
      <div className="friends-dropdown">
        <h1>Select Friends</h1>
        <Form className="channel-form" onSubmit={handleSubmit}>
          {/* Input for channel name */}
          <Input
            name="channelName"
            className="input-form"
            type="text"
            placeholder="channel name.."
            value={input.channelName}
            onChange={handleChange}
            required
          />
          
          {/* Dropdown for selecting friends */}
          <div className="user-dropdown">
            {friends &&
              friends.length > 0 &&
              friends.map((friend, index) => (
                <div
                  className={
                    selectedFriendIds.includes(friend.value) ? "highlight" : ""
                  }
                  key={index}
                >
                  <label>{friend.label}</label>
                  <Input
                    type="checkbox"
                    onChange={() => handleCheckboxChange(friend)}
                  />
                </div>
              ))}
          </div>
          
          {/* Button for creating the channel */}
          <Button text="Create" />
        </Form>
      </div>
    </>
  );
};

export default Dropdown;
