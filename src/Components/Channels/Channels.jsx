import React, { useState } from "react";
import Button from "components/Button";
import { MdGroupAdd } from "react-icons/md";
import Dropdown from "./Dropdown";
import AddMemberDropdown from "./AddMemberDropdown";
import ChannelList from "./ChannelList";

const Channels = () => {
  // State to manage visibility of create and add member dropdowns
  const [createDropdownVisible, setCreateDropdownVisible] = useState(false);
  const [addDropdownVisible, setAddDropdownVisible] = useState(false);

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

  return (
    <div className="channels-container">
      {/* Button to toggle create dropdown */}
      <Button className="dropdown-btn" onClick={toggleCreateDropdown}>
        <MdGroupAdd size={15} />
        Create Channel
      </Button>
      {/* Render create dropdown if visible */}
      {createDropdownVisible && <Dropdown />}
      
      {/* Button to toggle add member dropdown */}
      <Button className="dropdown-btn" onClick={toggleAddDropdown}>
        <MdGroupAdd size={15} />
        Add Member
      </Button>
      {/* Render add member dropdown if visible */}
      {addDropdownVisible && <AddMemberDropdown />}
      
      {/* Component to display channel list */}
      <ChannelList />
    </div>
  );
};

export default Channels;
