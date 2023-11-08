import axios from "axios";
import { messageAxios } from "../axios/axios";

export const getMessageAPI = async (chatId) => {
  try {
    const response = await messageAxios.get(`/${chatId}`);
    return response.data?.result;
  } catch (error) {}
};

export const sendMessage = async (chatId, senderId, text) => {
  try {
    const response = await messageAxios.post("/", { chatId, senderId, text });
    return response.data.result;
  } catch (error) {}
};
