import React, { useEffect, useState } from "react";
import { useFetch } from "Components/CustomHook";
import { getLocalStorage } from "@/Utils";
import profile from "assets/profile.png";
import spinner2 from "assets/spinner2.gif";
import { useSelectedUsers } from "Components/CustomHook";

const ChannelList = () => {
      const userData = getLocalStorage("headerData") || [];
  // Fetch data hook
  const { data, loading, error, fetchData } = useFetch();

  // State to store channels
  const [channels, setChannels] = useState();
  // Custom hook for selected users
  const [selectedUsers, updateSelectedUsers] = useSelectedUsers();


  // Handle click on a channel
  const handleClick = (channel) => {
    console.log("target", channel);
    updateSelectedUsers(channel);
  };

  // Fetch channels function
  const fetchChannel = async () => {


    const url = "http://206.189.91.54/api/v1/channels";
    const config = {
      method: "GET",
      headers: { ...userData },
    };

    fetchData(url, config);
  };

 


  // Fetch channels on component mount
 useEffect(() => {
    fetchChannel();
  }, [selectedUsers]);
  // Update channels when data changes
  useEffect(() => {
    if (!loading && !error && data && data.data) {
      console.log(data);
      const channels = data.data.map((channel) => {
        return {
          value: channel.id,
          label: channel.name,
          createdAt: channel.created_at,
          class: "Channel",
        };
      });

      console.log(channels);
      const sortChannel = channels.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setChannels(sortChannel);
 
      console.log("sel", selectedUsers)
   
    } else if (error) {
      console.log(error);
    }
  }, [loading, error, data]);

  // Render component
  return (
    <>
      <div className="channel-list-container">
        <ul>
          {/* Display spinner while loading */}
          {loading && <img className="spinner2" src={spinner2} />}
          {/* Display error message if there's an error */}
          {error && <p>Error: {error.message}</p>}
          {/* Display channels if available */}
          {channels &&
            channels.length >= 0 &&
            channels.map((channel, index) => (
              <li
                key={index}
                onClick={() => handleClick(channel)}
                // Highlight selected channel
                className={selectedUsers.value === channel.value ? "highlight" : ""}
              >
                {/* Display profile image */}
                <img src={profile} alt="Profile" />
                {/* Display channel name */}
                {channel.label}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default ChannelList;
