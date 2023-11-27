import React, { useEffect, useState } from "react";
import { useFetch } from "Components/CustomHook";
import Button from "Components/Button";
import { MdGroupAdd } from "react-icons/md";
import Dropdown from "./Dropdown";
import AddMemberDropdown from "./AddMemberDropdown";
import ChannelList from "./ChannelList";
import { useSelectedUsers } from "Components/CustomHook";
import { getLocalStorage } from "@/Utils";

const Channels = () => {
  // State to manage visibility of create and add member dropdowns
  const [createDropdownVisible, setCreateDropdownVisible] = useState(false);
  const [addDropdownVisible, setAddDropdownVisible] = useState(false);
  const {
    data: channelDetail,
    error,
    loading,
    fetchData: fetchChannelDetail,
  } = useFetch();
  const [selectedUsers, updateSelectedUsers] = useSelectedUsers();
  const [existingMember, setExistingMember]= useState()

  // Toggle function for create dropdown
  const toggleCreateDropdown = () => {
    // Toggle visibility of create dropdown
    setCreateDropdownVisible(!createDropdownVisible);
    // Close add member dropdown
    setAddDropdownVisible(false);
  };

  // Toggle function for add member dropdown
  const toggleAddDropdown = () => {
    // Toggle visibility of add member dropdown
    setAddDropdownVisible(!addDropdownVisible);
    // Close create dropdown
    setCreateDropdownVisible(false);
  };

  const fetchChannelInfo = async () => {
    const userData = getLocalStorage("headerData") || [];

    const url = `http://206.189.91.54/api/v1/channels/${selectedUsers.value}`;
    const config = {
      method: "GET",
      headers: { ...userData },
    };

    fetchChannelDetail(url, config);
  };

  useEffect(() => {
    fetchChannelInfo();
  }, []);

  useEffect(() => {
    if (!loading && !error && channelDetail && channelDetail.data) {
      const flatMappedData = channelDetail.data.channel_members.map(member => member.user_id);
      console.log("detail", flatMappedData);
      console.log("channel", selectedUsers);
      setExistingMember(flatMappedData)
    }
  }, [channelDetail, loading, error, selectedUsers, addDropdownVisible]);

  return (
    <div className="channels-container">
      {/* Button to toggle create dropdown */}
      <Button className="dropdown-btn" onClick={toggleCreateDropdown}>
        <MdGroupAdd size={15} />
        Create Channel
      </Button>
      {/* Render create dropdown if visible */}
      {createDropdownVisible && (
        <Dropdown setCreateDropdownVisible={setCreateDropdownVisible} />
      )}

      {/* Button to toggle add member dropdown */}
      <Button className="dropdown-btn" onClick={toggleAddDropdown}>
        <MdGroupAdd size={15} />
        Add Member
      </Button>
      {/* Render add member dropdown if visible */}
      {addDropdownVisible && (
        <AddMemberDropdown setAddDropdownVisible={setAddDropdownVisible} 
        existingMember={existingMember}/>
      )}

      {/* Component to display channel list */}
      <ChannelList />
    </div>
  );
};

export default Channels;
