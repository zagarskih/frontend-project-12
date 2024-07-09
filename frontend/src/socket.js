import io from "socket.io-client";
import store from "./store";
import { addMessage, addChannel, deleteChannel, editChannel } from "./routes/chat/chatSlice";

const { dispatch } = store;

export const initSocket = () => {
  const socket = io();

  socket.on('newMessage', (newMessage) => {
    dispatch(addMessage({ message: newMessage }));
  });

  socket.on("newChannel", (payload) => {
    dispatch(addChannel({ channel: payload }));
  });

  socket.on('deleteChannel', (payload) => {
    dispatch(deleteChannel({ channelId: payload.channelId }));
  });

  socket.on('editChannel', (payload) => {
    dispatch(editChannel({ channelId: payload.channelId, newName: payload.newName }));
  });

  socket.on('disconnect', () => {
    console.warn('Disconnected from socket server');
  });

  return socket;
}

// let socket;

// export const initSocket = () => {
//   if (!socket) {
//     socket = io("http://localhost:5001");

//     socket.on("newMessage", (newMessage) => {
//       console.log("Received new message from socket:", newMessage);
//       dispatch(addMessage({ message: newMessage }));
//     });

//     socket.on("newChannel", (newChannel) => {
//       console.log("Received new channel from socket:", newChannel);
//       dispatch(addChannel({ channel: newChannel }));
//     });

//     socket.on('channelDeleted', (channelId) => {
//       dispatch(deleteChannel(channelId));
//     });

//     socket.on('editCahnnel', (channelId, newName) => {
//       dispatch(editChannel(channelId, newName));
//     })
//   }
// };

// export const disconnectSocket = () => {
//   if (socket) {
//     console.log("Disconnecting socket...");
//     socket.disconnect();
//     socket = null;
//   }
// };
