import React, { useEffect, useState } from "react";
import ChatLeftSide from "./chatLeftside";
import ChatRightside from "./chatRightside";
import { getChatsAPI } from "../../api/chatApi";
import { useSelector } from "react-redux";
import Conversation from "./conversation";
import ChatBox from "./chatBox";

const Chat = () => {
  const { user } = useSelector((state: any) => state.userAuth);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat]= useState(null)

  const getChats = async () => {
    const data = await getChatsAPI(user._id);
    setChats(data);
  };
  useEffect(() => {
    getChats();
  }, []);
  return (

    <div className="Chat w-full flex">
      <div className="Left-side-chat w-2/6">
        {/* search logo */}
        <div className="p-2 m-2 bg-green-300">
          <h2>Chats</h2>
          <div className="Chat-list">
            { chats.length ==0 ? 'no chats' :
                chats.map((chat)=>(
                    <div onClick={()=> setCurrentChat(chat)}>
                        <Conversation currentUserId={user._id} data={chat}/>
                    </div>
                ))
            }
          </div>
        </div>
      </div>

      <div className="Right-side-chat w-4/6 bg-red-400">
        <ChatBox chat={currentChat} currentUserId={user._id}/>
      </div>
    </div>
  );
};

export default Chat;

    // <div className="w-full flex">
    //   <div className="md:w-2/6 h-screen w-full bg-gray-400">
    //     <ChatLeftSide />
    //   </div>
    //   <div className="md:block w-4/6 hidden h-screen">
    //     <ChatRightside />

    //   </div>
    // </div>