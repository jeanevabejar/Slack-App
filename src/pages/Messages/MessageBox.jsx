import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import Input from "components/Input";
import Button from "components/Button";
import { BiSolidSend } from "react-icons/bi";
import { useFetch, useSelectedOptions } from "components/CustomHook";
import { getLocalStorage, toastSuccess } from "@/Utils";

const MessageBox = () => {
  const [input, setInput] = useState({ message: "" });
  const { data, loading, error, fetchData } = useFetch();
  const [selectedOptions] = useSelectedOptions();
  const [key, setKey] = useState();

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const userData = getLocalStorage("headerData");
    const key_id = key;

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
    console.log(key_id);
     console.log("sel",selectedOptions)
  };

  useEffect(() => {
    if (!loading && !error && data && selectedOptions) {
      toastSuccess("Message Sent");
      console.log("mes", data.data);
      const userId = selectedOptions.flatMap((items) => [items.value]);
    setKey(userId[0])
      setInput({ message: "" });
    }
  }, [data, loading, error, selectedOptions]); 


  return (
    <div className="message-box">
      <div className="chatname">
        <HiOutlineUserCircle size={35} />
        {selectedOptions.map((names)=>{
          <h3>{names.label}</h3>
        })}
      </div>
      <ConversationPanel selectedOptions={selectedOptions} />
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

const ConversationPanel = ({ selectedOptions }) => {
  const { data, loading, error, fetchData } = useFetch();


  const fetchMessage = async () => {
    const userId = selectedOptions.flatMap((items) => [items.value]) || [];
    const key_id = userId[0] || [];
    const userData = getLocalStorage("headerData");

    const keyId = key_id;
    const url = `http://206.189.91.54/api/v1/messages?receiver_id=${keyId}&receiver_class=User`;
    const config = {
      method: "GET",
      headers: { ...userData },
    };

    fetchData(url, config);
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  useEffect(() => {
    if (!loading && !error && data) {
    
      console.log("res", data.data);
  
    }
  }, [data, loading, error]);

  return (
    <>
      <div className="conversation-box">
        {data && data.data && data.data.length > 0 ? (
          data.data.map((message, index) => (
            <p key={index} className="message-item">
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
