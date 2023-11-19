import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import Input from "components/Input";
import Button from "components/Button";
import { BiSolidSend } from "react-icons/bi";
import useFetch from "components/CustomHook";
import { getLocalStorage } from "@/Utils";

const MessageBox = () => {
  const [input, setInput] = useState({ message: "" });
  const [messages, setMessages] = useState([]);
  const { data, loading, error, fetchData } = useFetch();

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const userData = getLocalStorage("headerData");
    const key_id = 4472;

    const url = "http://206.189.91.54/api/v1/messages";
    const config = {
      method: "POST",
      headers: { ...userData },
      body: {
        receiver_id: key_id,
        receiver_class: "User",
        body: input.message,
      },
    };

    fetchData(url, config);
  };

  useEffect(() => {
    
    if (!loading && !error && data) {
      console.log("Message Sent");
      console.log(data.data);

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: data.data.id, body: data.data.body }
      ]);

      setInput({ message: "" });
    }
  }, [data, loading, error]);

  return (
    <div className="message-box">
      <div className="chatname">
        <HiOutlineUserCircle size={35} />
        <h2>Jane Doe</h2>
      </div>
      <div className="conversation-box">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <p key={index} className="message-item">
              {message.body}
            </p>
          ))
        ) : (
          <p>No messages available</p>
        )}
      </div>
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

export default MessageBox;
