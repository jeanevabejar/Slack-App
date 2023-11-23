import React, { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import Input from "components/Input";
import Button from "components/Button";
import { getLocalStorage, toastError, toastSuccess } from "@/Utils";
import { useFetch } from "components/CustomHook";
import AsynchSelect from "react-select/async";

const AddMemberDropdown = () => {
  const friends = getLocalStorage("friendList") || [];
  const [selectedChannelId, setSelectedChannelId] = useState([]);
  const [options, setOptions] = useState();
  const [selectedUserId, setSelectedUserId] = useState();

  const { data, loading, error, fetchData } = useFetch();
  const {
    data: searchData,
    fetchData: searchFetch,
    loading: searchLoading,
    error: searchError,
  } = useFetch();

  // Effect to fetch channel data on component mount
  useEffect(() => {
    const fetchChannel = async () => {
      const userData = getLocalStorage("headerData");
      const url = "http://206.189.91.54/api/v1/channels";
      const config = {
        method: "GET",
        headers: { ...userData },
      };

      searchFetch(url, config);
    };

    fetchChannel();
  }, [searchFetch]);

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
    setSelectedUserId(selectedOption.value);
  };

  // Load options for the search input
  const loadOptions = (searchValue, callback) => {
    setTimeout(() => {
      const filtered = options.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
      console.log("loadoptions", searchValue, filtered);
      callback(filtered);
    }, 2000);
  };

  // Handle checkbox change
  const handleCheckboxChange = (friend) => {
    const value = friend.value;
    setSelectedChannelId(value);
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
        id: selectedUserId,
        member_id: selectedChannelId,
      },
    };

    fetchData(url, config);
  };

  // Handle success or error after data fetch
  useEffect(() => {
    if (!loading && !error && data) {
      toastSuccess("Successfully Added Member");
    } else if (error) {
      toastError(error.message);
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
                  className={
                    selectedUserId === friend.value ? "highlight" : ""
                  }
                  key={index}
                >
                  <label>@{friend.label.split("@")[0]}</label>
                  <Input
                    type="checkbox"
                    checked={selectedChannelId === friend.value}
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
