import axios from "axios";
import API_ROUTES from './apiRoutes';

export const sendMessageApi = async (token, newMessage, t) => {
  try {
    const response = await axios.post(API_ROUTES.messages.base(), newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(t('errorsApi.sending'), error);
    throw error;
  }
};

export const addChannelApi = async (token, newChannel, t) => {
  try {
    const response = await axios.post(API_ROUTES.channels.base(), newChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error(t('errorsApi.creatingChannel'), error);
    throw error;
  }
}

export const deleteChannelApi = async (token, channelId, t) => {
  try {
    const response = await axios.delete(API_ROUTES.channels.byId(channelId), {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error(t('errorsApi.deleting'), error);
    throw error;
  }
}

export const deleteMessagesByChannel = async (token, channelId, messages, t) => {
  try {
    const messagesIds = messages.filter((message) => message.channelId === channelId).map((message) => message.id);
    for (const id of messagesIds) {
      await axios.delete(API_ROUTES.messages.byId(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
    }
  } catch (error) {
    console.error(t('errorsApi.deletingMessages'), error);
    throw error;
  }
}

export const editChannelApi = async (token, newName, channelId, t) => {
  const editedChannel = { name: newName };
  try {
    await axios.patch(API_ROUTES.channels.byId(channelId), editedChannel, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  } catch (error) {
    console.error(t('errorsApi.editing'), error);
    throw error;
  }
}

export const sighUpApi = async (username, password, t) => {
  try {
    const response = await axios.post(API_ROUTES.auth.signup(), { username, password });
    return response.data;
  } catch (error) {
    console.error(t('errorsApi.signUp'), error);
    throw error;
  }
}

export const logInApi = async (username, password, t) => {
  try {
    const response = await axios.post(API_ROUTES.auth.login(), { username, password });
    return response.data;
  } catch (error) {
    console.error(t('errorsApi.signIn'), error);
    throw error;
  }
}
