import io from 'socket.io-client';
import store from './store';
import {
  addMessage,
  addChannel,
  deleteChannel,
  editChannel,
} from './routes/chat/chatSlice';

const { dispatch } = store;

export const initSocket = () => {
  const socket = io();

  socket.on('newMessage', (newMessage) => {
    dispatch(addMessage({ message: newMessage }));
  });

  socket.on('newChannel', (payload) => {
    dispatch(addChannel({ channel: payload }));
  });

  socket.on('deleteChannel', (payload) => {
    dispatch(deleteChannel({ channelId: payload.channelId }));
  });

  socket.on('editChannel', (payload) => {
    dispatch(
      editChannel({ channelId: payload.channelId, newName: payload.newName })
    );
  });

  socket.on('disconnect', () => {
    console.warn('Disconnected from socket server');
  });

  return socket;
};
