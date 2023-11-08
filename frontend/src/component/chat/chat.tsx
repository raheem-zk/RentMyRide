import React, { useEffect, useState } from "react";
import { getChatsAPI } from "../../api/chatApi";
import { useSelector } from "react-redux";
import Conversation from "./conversation";
import ChatBox from "./chatBox";

const Chat = ({ role }) => {
  const { carOwner } = useSelector((state: any) => state.carOwnerAuth);
  const { user } = useSelector((state: any) => state.userAuth);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUserId, setCurrentUserId] = useState("");
  const getChats = async (id) => {
    const data = await getChatsAPI(id);
    setChats(data);
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

  return (
    <div className="Chat w-full flex bg-gray-50">
      <div className="Left-side-chat w-2/6">
        {/* search logo */}
        <div className="p-2 m-2 bg-gray-100">
          <h2 className="text-center font-bold text-2xl p-3">Chats</h2>
          <div className="Chat-list max-h-80 overflow-x-auto">
            {chats.length == 0 ? (
              <img
                src={
                  "https://i.pinimg.com/originals/ee/ca/de/eecaded3764dd35d75fbab79afbec91b.gif"
                }
                alt=""
              />
            ) : (
              chats.map((chat) => (
                <div key={chat?._id} onClick={() => setCurrentChat(chat)}>
                  <Conversation role={role} data={chat} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="Right-side-chat w-4/6 bg-white">
        <ChatBox role={role} chat={currentChat} currentUserId={currentUserId} />
      </div>
    </div>
  );
};

export default Chat;
