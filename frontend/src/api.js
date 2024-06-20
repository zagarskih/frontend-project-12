import axios from "axios";

export const sendMessage = async (token, newMessage) => {
  try {
    console.log("Sending message:", newMessage);
    const response = await axios.post("/api/v1/messages", newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data); // => { id: '1', body: 'new message', channelId: '1', username: 'admin' }
    return response.data;
  } catch (error) {
    console.error("Не удалось отправить сообщение:", error);
    throw error;
  }
};
