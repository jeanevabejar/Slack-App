import React, { useEffect, useState } from "react";
import { useFetch } from "Components/CustomHook";
import { getLocalStorage } from "@/Utils";
import profile from "assets/profile.png";
import spinner2 from "assets/spinner2.gif";
import { useSelectedUsers } from "Components/CustomHook";
import { RiArrowDropDownLine } from "react-icons/ri";

const ChannelList = ({ channelDetail, existingMember }) => {
  const userData = getLocalStorage("headerData") || [];
  const { data, loading, error, fetchData } = useFetch();
  const [channels, setChannels] = useState();
  const [selectedUsers, updateSelectedUsers] = useSelectedUsers();
  const [openChannelId, setOpenChannelId] = useState(null);

  const handleClick = (channel) => {
    updateSelectedUsers(channel);
    setOpenChannelId((prevId) =>
      prevId === channel.value ? null : channel.value
    );
  };

  const fetchChannel = async () => {
    const url = "http://206.189.91.54/api/v1/channels";
    const config = {
      method: "GET",
      headers: { ...userData },
    };

    fetchData(url, config);
  };

  useEffect(() => {
    fetchChannel();
  }, [selectedUsers]);

  useEffect(() => {
    if (!loading && !error && data && data.data) {
      const channels = data.data.map((channel) => {
        return {
          value: channel.id,
          label: channel.name,
          createdAt: channel.created_at,
          class: "Channel",
        };
      });

      const sortChannel = channels.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setChannels(sortChannel);
    } else if (error) {
      console.log(error.message);
    }
  }, [loading, error, data]);

  return (
    <>
      <div className="channel-list-container">
        <ul>
          {loading && <img className="spinner2" src={spinner2} />}
          {error && <p>Error: {error.message}</p>}
          {channels &&
            channels.length >= 0 &&
            channels.map((channel, index) => (
              <>
                <li
                  key={index}
                  onClick={() => handleClick(channel)}
                  className={
                    selectedUsers.value === channel.value ? "highlight" : ""
                  }
                >
                  <img src={profile} alt="Profile" />
                  {channel.label}
                  <RiArrowDropDownLine
                    size={25}
                    onClick={() => setOpenChannelId(channel.value)}
                  />
                </li>
                {openChannelId === channel.value && (
                  <MemberList
                    channelDetail={channelDetail}
                    selectedUsers={selectedUsers}
                    existingMember={existingMember}
                  />
                )}
              </>
            ))}
        </ul>
      </div>
    </>
  );
};

const MemberList = ({ channelDetail, selectedUsers, existingMember }) => {
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [members, setMembers] = useState([]);
  const { data, fetchData, loading, error } = useFetch();

  const userHandler = async () => {
    const userData = getLocalStorage("headerData");
    const url = "http://206.189.91.54/api/v1/users";
    const config = {
      method: "GET",
      headers: { ...userData },
    };
    fetchData(url, config);
  };

  useEffect(() => {
    if (!isDataLoaded) {
      userHandler();
    }
  }, [isDataLoaded]);

  useEffect(() => {
    console.log("All User Data:", data);

    if (!loading && !error && data.data) {
      const userDetail = data.data.flatMap((user) => ({
        value: user.id,
        label: user.email,
      }));

      // Save the userDetail for mapping
      setSavedData(userDetail);
      setDataLoaded(true);
    }
  }, [data, error, loading, selectedUsers]);

  useEffect(() => {
    console.log("Existing Member:", existingMember);

    if (isDataLoaded && savedData.length > 0) {
      // Get the list of user IDs from channelDetail
      const channelUserIds = channelDetail.data.channel_members.map((user) => user.user_id) || [];

      // Filter the users based on the user IDs in channelDetail
      const filteredUser = savedData.filter((user) =>
        channelUserIds.includes(user.value)
      );

      // Update the members state with the filtered data
      setMembers(filteredUser);
    }
  }, [channelDetail, existingMember, isDataLoaded, savedData]);


  return (
    <>
      
      <div className="dropdown-member-list">
        {loading && <p>Please wait...</p>}
        {error && <p>Unable to fetch...</p>}
        <ul>
          {members.map((member, index) => (
            <li key={index}>{member.label}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChannelList;
