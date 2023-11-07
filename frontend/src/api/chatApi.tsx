import axios from "axios";
const baseBackendUrl = import.meta.env.VITE_BACKEND_URL;

export const getChatsAPI = async (id) => {
  const response = await axios.get(`${baseBackendUrl}/chat/${id}`);
  return response.data.chats;
};

export const getUserDataAPI = async (userId)=>{
  const response = await axios.get(`${baseBackendUrl}/chat/`)
  return response.data.chats;
}

export const createChatAPI = async (userId, ownerId)=>{
  await axios.post(`${baseBackendUrl}/chat`, {userId, ownerId});
}