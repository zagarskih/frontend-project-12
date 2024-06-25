import axios from "axios";

export const sendMessageApi = async (token, newMessage) => {
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

export const addChannelApi = async (token, newChannel) => {
  try {
    const response = await axios.post("/api/v1/channels", newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(response.data); // => { id: '3', name: 'new channel', removable: true }
    return response.data;
  } catch (error) {
    console.error("Не удалось добавить канал", error);
    throw error;
  }
}

export const deleteChannelApi = async (token, channelId) => {
  try {
    const response = await axios.delete(`/api/v1/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Не удалось удалить канал", error);
    throw error;
  }
}

export const deleteMessagesByChannel = async (token, channelId, messages) => {
  try {
    const messagesIds = messages.filter((message) => message.channelId === channelId).map((message) => message.id);
    for (const id of messagesIds) {
      await axios.delete(`/api/v1/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(`Deleted message with id ${id}`);
    }
  } catch (error) {
    console.error("Не удалось удалить сообщения", error);
    throw error;
  }
}

export const editChannelApi = async (token, newName, channelId) => {
  const editedChannel = { name: newName };
  try {
    await axios.patch(`/api/v1/channels/${channelId}`, editedChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(`Переименован канал ${channelId} ${newName}`)
  } catch (error) {
    console.error("Не удалось переименовать канал", error);
    throw error;
  }
}