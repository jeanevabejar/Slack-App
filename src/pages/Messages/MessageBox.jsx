import { useEffect, useState } from "react";

import Input from "components/Input";
import Button from "components/Button";
import { BiSolidSend } from "react-icons/bi";
import { useFetch, useSelectedUsers } from "components/CustomHook";
import { getLocalStorage, toastSuccess } from "@/Utils";
import profile from "assets/profile.png";

const MessageBox = () => {
  const [input, setInput] = useState({ message: "" });
  const { data, loading, error, fetchData } = useFetch();
  const [selectedUsers] = useSelectedUsers();
  const [key, setKey] = useState();
  const [userData, setUserData] = useState();
  const [receiverClass, setReceiverClass]= useState();

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const userData = getLocalStorage("headerData");

    const url = "http://206.189.91.54/api/v1/messages";
    const config = {
      method: "POST",
      headers: { ...userData },
      body: {
        receiver_id: key,
        receiver_class: receiverClass,
        body : input.message,
      },
    };

    fetchData(url, config);
    console.log("sel", selectedUsers);
    console.log(key);
  };

  useEffect(() => {
    console.log("mes", data);
    setUserData(data);
    setInput({ message: "" });
    setKey(selectedUsers.value);
    setReceiverClass(selectedUsers.class)
    console.log(selectedUsers.class);
  }, [data, selectedUsers]);

  useEffect(() => {
    if (!loading && !error && data) {
      toastSuccess("Message Sent");
    }
  }, [loading, error]);

  return (
    <div className="message-box">
      <div className="chatname">
        {selectedUsers ? (
          <h3>
            <img src={profile} alt="profile.jpg" />@
            {selectedUsers.label ? selectedUsers.label.split("@")[0] : ""}
          </h3>
        ) : (
          <h3>
            <img src={profile} alt="default-profile.jpg" />
            @User
          </h3>
        )}
      </div>
      <ConversationPanel selectedUsers={selectedUsers} userData={userData} />
      <div className="input-message-container">
        <div>
          <Input
            type="text"
            className="message-input"
            placeholder="Start typing your message..."
            name="message"
            value={input.message}
            onChange={handleChange}
          />
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

const ConversationPanel = ({ selectedUsers, userData }) => {
  const { data, loading, error, fetchData } = useFetch();
  const [conversation, setConversation] = useState();
  const currentUser = getLocalStorage("currentUser");
  const [received, setReceived] = useState();

  const fetchMessage = async () => {
    const userId = selectedUsers.value || [];
    const key_id = userId || [];
    const userData = getLocalStorage("headerData") || [];
    const selectedClass = selectedUsers.class;

    const keyId = key_id;
    const url = `http://206.189.91.54/api/v1/messages?receiver_id=${keyId}&receiver_class=${selectedClass}`;
    const config = {
      method: "GET",
      headers: { ...userData },
    };

    fetchData(url, config);
    console.log("raw",data);
    setReceived(data)
  };

  useEffect(() => {
    fetchMessage();
  }, [selectedUsers, userData, received]);

  useEffect(() => {
    if (!loading && !error && data && data.data) {
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

      console.log("sort", sortMessages);
      console.log(data)
      setConversation(sortMessages);
    }
  }, [data, loading, error]);

  return (
    <>
      <div className="conversation-box">
        {conversation && conversation.length > 0 ? (
          conversation.map((message, index) => (
            <p
              key={index}
              className={
                message.sender === currentUser.email 
                  ? "message-item"
                  : "received-item"
              }
            >
              {message.body}
            </p>
          ))
        ) : (
          <p>No messages available</p>
        )}
      </div>
    </>
  );
};

export default MessageBox;
