import React, { useEffect, useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import { BiSolidSend } from 'react-icons/bi';
import { useFetch, useSelectedUsers } from 'components/CustomHook';
import { getLocalStorage, toastSuccess } from '@/Utils';
import profile from 'assets/profile.png';

// Component for the message box
const MessageBox = () => {
  // State for message input, user data, and selected user
  const [input, setInput] = useState({ message: '' });
  const { data, loading, error, fetchData } = useFetch();
  const [selectedUsers] = useSelectedUsers();
  const [key, setKey] = useState();
  const [userData, setUserData] = useState();
  const [receiverClass, setReceiverClass] = useState();

  // Handle change in the message input
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle message submission
  const handleSubmit = async () => {
    const userData = getLocalStorage('headerData');

    const url = 'http://206.189.91.54/api/v1/messages';
    const config = {
      method: 'POST',
      headers: { ...userData },
      body: {
        receiver_id: key,
        receiver_class: receiverClass,
        body: input.message,
      },
    };

    fetchData(url, config);
  };

  // Effect to update user data and input on changes
  useEffect(() => {
    setUserData(data);
    setInput({ message: '' });
    setKey(selectedUsers.value);
    setReceiverClass(selectedUsers.class);
  }, [data, selectedUsers]);

  // Effect to show success message after message is sent
  useEffect(() => {
    if (!loading && !error && data) {
      toastSuccess('Message Sent');
    }
  }, [loading, error]);

  // JSX structure for the message box
  return (
    <div className="message-box">
      <div className="chatname">
        {/* Display selected user's profile image and username */}
        <h3>
          <img src={profile} alt="profile.jpg" />
          @{selectedUsers ? selectedUsers.label?.split('@')[0] : 'User'}
        </h3>
      </div>
      {/* Display conversation panel and input message container */}
      <ConversationPanel selectedUsers={selectedUsers} userData={userData} />
      <div className="input-message-container">
        <div>
          {/* Input field for typing the message */}
          <Input
            type="text"
            className="message-input"
            placeholder="Start typing your message..."
            name="message"
            value={input.message}
            onChange={handleChange}
          />
          {/* Button to send the message */}
          <Button
            text={<BiSolidSend size={50} />}
            className="send-btn"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

// Component for displaying the conversation panel
const ConversationPanel = ({ selectedUsers, userData }) => {
  const { data, loading, error, fetchData } = useFetch();
  const [conversation, setConversation] = useState();
  const currentUser = getLocalStorage('currentUser');
  const [received, setReceived] = useState();

  // Fetch messages for the selected user
  const fetchMessage = async () => {
    const userId = selectedUsers.value || [];
    const key_id = userId || [];
    const userData = getLocalStorage('headerData') || [];
    const selectedClass = selectedUsers.class;

    const keyId = key_id;
    const url = `http://206.189.91.54/api/v1/messages?receiver_id=${keyId}&receiver_class=${selectedClass}`;
    const config = {
      method: 'GET',
      headers: { ...userData },
    };

    fetchData(url, config);
    setReceived(data);
  };

  // Effect to fetch messages when selected user or user data changes
  useEffect(() => {
    fetchMessage();
  }, [selectedUsers, userData, received]);

  // Effect to update conversation on changes in fetched data
  useEffect(() => {
    if (!loading && !error && data && data.data) {
      // Flatten and sort messages by date
      const flatData = data.data.map((message) => ({
        receiver: message.receiver.email,
        channel: message.receiver.name,
        body: message.body,
        created_at: message.created_at,
        sender: message.sender.uid,
      }));

      const sortMessages = flatData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      // Update conversation state
      setConversation(sortMessages);
    }
  }, [data, loading, error]);

  // JSX structure for the conversation panel
  return (
    <>
      <div className="conversation-box">
        {conversation && conversation.length > 0 ? (
          // Display messages in conversation box
          conversation.map((message, index) => (
            <p
              key={index}
              className={
                message.sender === currentUser.email
                  ? 'message-item'
                  : 'received-item'
              }
            >
              {message.body}
            </p>
          ))
        ) : (
          // Display message if no messages available
          <p>No messages available</p>
        )}
      </div>
    </>
  );
};

export default MessageBox;
