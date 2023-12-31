import React, { useEffect, useState } from "react";
import { getChatsAPI } from "../../api/chatApi";
import { useSelector } from "react-redux";
import Conversation from "./conversation";
import ChatBox from "./chatBox";
import { io } from "socket.io-client";
import Loading from "../loading";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const socket = io(BACKEND_URL);

const Chat = ({ role }) => {
  const { carOwner } = useSelector((state: any) => state.carOwnerAuth);
  const { user } = useSelector((state: any) => state.userAuth);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const [load, setLoad] = useState(true);

  const getChats = async (id) => {
    const data = await getChatsAPI(id);
    setChats(data);
    setLoad(false);
  };

  useEffect(() => {
    if (role === "user") {
      getChats(user._id);
      setCurrentUserId(user._id);
    } else {
      getChats(carOwner._id);
      setCurrentUserId(carOwner._id);
    }
  }, []);

  const handleGetUsers = (users) => {
    setOnlineUsers(users);
  };

  useEffect(() => {
    if (currentUserId !== "") {
      socket.emit("new-user-add", currentUserId);
      socket.on("get-users", handleGetUsers);
    }

    return () => {
      socket.off("get-users", handleGetUsers);
    };
  }, [currentUserId]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);
  useEffect(() => {
    socket.on("receive-message", (data) => {
      setRecieveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember =
      chat?.userId?._id === currentUserId
        ? chat?.ownerId?._id
        : chat?.userId?._id;
    const online = onlineUsers.find((user) => user?.userId === chatMember);
    return !!online;
  };

  return load ? (
    <Loading />
  ) : (
    <div className="Chat w-full flex bg-gray-50">
      <div className="Left-side-chat w-2/6">
        {/* search logo */}
        <div className="p-2 m-2 bg-gray-100">
          <h2 className="text-center font-bold text-2xl p-3">Chats</h2>
          <div className="Chat-list max-h-80 overflow-x-auto">
            {chats && chats.length == 0 ? (
              <img
                src={
                  "https://i.pinimg.com/originals/ee/ca/de/eecaded3764dd35d75fbab79afbec91b.gif"
                }
                alt=""
              />
            ) : (
              chats &&
              chats.map((chat) => (
                <div key={chat?._id} onClick={() => setCurrentChat(chat)}>
                  <Conversation
                    role={role}
                    data={chat}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="Right-side-chat w-4/6 bg-white">
        <ChatBox
          recieveMessage={recieveMessage}
          role={role}
          chat={currentChat}
          currentUserId={currentUserId}
          setSendMessage={setSendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
