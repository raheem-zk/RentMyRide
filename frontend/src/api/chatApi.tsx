import { chatAxios } from "../axios/axios";

export const getChatsAPI = async (id) => {
  try {
    const response = await chatAxios.get(`/${id}`);
    return response.data.chats;
  } catch (error) {}
};

export const createChatAPI = async (userId, ownerId) => {
  try {
    await chatAxios.post(`/`, { userId, ownerId });
  } catch (error) {}
};
