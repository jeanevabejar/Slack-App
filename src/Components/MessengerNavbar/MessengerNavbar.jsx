import React from 'react';
import Button from 'components/Button';
import { GoPersonAdd } from 'react-icons/go';
import { BiSolidCommentAdd } from 'react-icons/bi';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const MessengerNavbar = () => {
  // Use the useNavigate hook from react-router-dom for navigation
  const navigate = useNavigate();

  return (
    <div className="messenger-nav-container">
      <div className="messenger-navbar">
        {/* Button for navigating to the "search" page */}
        <Button
          onClick={() => {
            navigate('search');
          }}
          className="add-icon"
          text={<GoPersonAdd size={25} data-tooltip-id="adduser" />}
        />
        {/* Button for navigating to the "message" page */}
        <Button
          onClick={() => {
            navigate('message');
          }}
          className="dm-icon"
          text={
            <BiSolidCommentAdd
              size={25}
              data-tooltip-id="directmessage"
            />
          }
        />
        {/* Button for navigating to the "channels" page */}
        <Button
          onClick={() => {
            navigate('channels');
          }}
          className="channels-icon"
          text={
            <AiOutlineUsergroupAdd
              size={25}
              data-tooltip-id="channels"
            />
          }
        />
      </div>
    </div>
  );
};

export default MessengerNavbar;
