import React, { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import Input from "components/Input";
import Button from "components/Button";
import { getLocalStorage, toastError, toastSuccess } from "@/Utils";
import { useFetch } from "components/CustomHook";
import AsynchSelect from "react-select/async";
import { useSelectedUsers } from "components/CustomHook";

const AddMemberDropdown = ({setAddDropdownVisible, existingMember}) => {
  const friends = getLocalStorage("friendList") || [];
  const [selectedChannelId, setSelectedChannelId] = useState([]);
  const [options, setOptions] = useState();
  const [selectedUserId, setSelectedUserId] = useState();
  const [selectedUsers, updateSelectedUsers] = useSelectedUsers();
  
  const { data, loading, error, fetchData } = useFetch();
  const {
    data: searchData,
    fetchData: searchFetch,
    loading: searchLoading,
    error: searchError,
  } = useFetch();

  // Effect to fetch channel data on component mount
  const fetchChannel = async () => {
    const userData = getLocalStorage("headerData");
    const url = "http://206.189.91.54/api/v1/channels";
    const config = {
      method: "GET",
      headers: { ...userData },
    };

    searchFetch(url, config);
  };

  useEffect(() => {
    fetchChannel();
  }, []);

  // Effect to update options when search data changes
  useEffect(() => {
    if (searchData && searchData.data) {
      setOptions(
        searchData.data.flatMap((users) => [
          { value: users.id, label: users.name },
        ])
      );
    }
  }, [searchData]);

  // Handle changes in the selected option
  const handleChange = (selectedOption) => {
    console.log("changes", selectedOption);
    setSelectedChannelId(selectedOption.value);
    updateSelectedUsers(selectedOption)
    console.log("existing",existingMember)
  };

  // Load options for the search input
  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      callback(filtered);
    }, 2000);
  };

  // Handle checkbox change
  const handleCheckboxChange = (friend) => {
    const value = friend.value;
    
    // Check if the value is already in existingMemberUserIds
    const isUserAlreadyMember = existingMember.some(member => member === value);

    if (isUserAlreadyMember) {
      // Handle the condition where the user is already a member
      console.log("User is already a member");
      toastError("User is already a member")
      // You can show a message, disable the checkbox, etc.
    } else {
      // User is not a member, proceed with setting the selectedUserId
      setSelectedUserId(value);
    }
  };
  
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = getLocalStorage("headerData");

    const url = "http://206.189.91.54/api/v1/channel/add_member";
    const config = {
      method: "POST",
      headers: { ...userData },
      body: {
        id: selectedChannelId,
        member_id: selectedUserId,
      },
    };

    fetchData(url, config);
  };

  // Handle success or error after data fetch
  useEffect(() => {
    if (!loading && !error && data) {
      toastSuccess("Successfully Added Member");
      setAddDropdownVisible(false)
    } else if (error) {
      toastError(error);
      console.log("error");
    }
  }, [loading, error, data]);

  return (
    <>
      <div className="friends-dropdown">
        <h1>Add Member</h1>
        <Form className="channel-form" onSubmit={handleSubmit}>
          <AsynchSelect
            className="input-form"
            loadOptions={loadOptions}
            onChange={handleChange}
            placeholder="search..."
          />
          <div className="user-dropdown">
            {friends &&
              friends.length > 0 &&
              friends.map((friend, index) => (
                <div
                  className={selectedUserId === friend.value ? "highlight" : ""}
                  key={index}
                >
                  <label>{friend.label}</label>
                  <Input
                    type="checkbox"
                    checked={selectedUserId === friend.value}
                    onChange={() => handleCheckboxChange(friend)}
                  />
                </div>
              ))}
          </div>
          <Button text="Add" />
        </Form>
      </div>
    </>
  );
};

export default AddMemberDropdown;
