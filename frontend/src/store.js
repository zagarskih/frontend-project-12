import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./routes/chat/chatSlice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
