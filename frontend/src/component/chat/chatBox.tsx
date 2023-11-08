import React, { useEffect, useState } from "react";
import { getMessageAPI, sendMessage } from "../../api/messageApi";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const PROFILE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1nXLwXy9EcTEeouOXhDl6Ma2ZaKs899xpHg&usqp=CAU";

const ChatBox = ({ chat, currentUserId, role }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const getMessage = async (chatId) => {
    const data = await getMessageAPI(chatId);
    setMessages([...data]);
  };

  useEffect(() => {
    if (chat) getMessage(chat?._id);
  }, [chat]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  const handelSendMessage = async () => {
    if (newMessage.length != 0) {
      const data = await sendMessage(chat._id, currentUserId, newMessage);
      setMessages([...messages, data]);
      setNewMessage("");
    }
  };
  const ownerProfilePicture = chat?.ownerId?.profilePicture;
  const userProfilePicture = chat?.userId?.profilePicture;
  const src =
    role === "user"
      ? ownerProfilePicture || PROFILE
      : userProfilePicture || PROFILE;
  const name =
    role === "user" ? chat?.ownerId?.firstName : chat?.userId?.firstName;

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-head bg-gray-100 p-4 flex items-center justify-between">
              <div className="follower">
                <div className="flex items-center p-2">
                  <img
                    src={src}
                    alt="User Avatar"
                    className="rounded-full w-12 h-12 p-2 mx-2"
                  />
                  <div>
                    <span className="text-lg font-semibold">{name}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* chat box message */}
            <div className="chat-body p-4 flex-row min-h-40 max-h-80 overflow-x-auto">
              {messages &&
                messages.map((message) => (
                  <div
                    key={message._id}
                    className={`message ${
                      message?.senderId === currentUserId
                        ? "own text-right"
                        : "other items-end"
                    } py-2`}
                  >
                    <span className="text-white bg-blue-500 rounded-md p-2 ">
                      {message?.text}
                    </span>
                    <p className="text-gray-400 mt-1">
                      {format(message?.createdAt)}
                    </p>
                  </div>
                ))}
            </div>
            <div className="chat-sender bg-gray-200 p-4 flex items-center">
              <div className="p-2 text-xl cursor-pointer">+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div
                onClick={handelSendMessage}
                className="send-button bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Send
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <span className=" text-lg font-semibold mb-4">
                Tap on a Chat to start Conversation
              </span>
              <img
                src="https://cdn.dribbble.com/users/1129235/screenshots/2628920/chat__2_.gif"
                alt=""
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatBox;
