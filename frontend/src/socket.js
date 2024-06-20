import io from "socket.io-client";
import store from "./store";
import { addMessage } from "./routes/chat/chatSlice";

const { dispatch } = store;

let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5001");

    socket.on("newMessage", (newMessage) => {
      console.log("Received new message from socket:", newMessage);
      dispatch(addMessage({ message: newMessage }));
    });
  }
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("Disconnecting socket...");
    socket.disconnect();
    socket = null;
  }
};
