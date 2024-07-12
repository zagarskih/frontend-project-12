import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChatData = createAsyncThunk(
  "chat/fetchChannelsAndMessages",
  async (token, { rejectWithValue }) => {
    try {
      const channelsResponse = await axios.get("/api/v1/channels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(channelsResponse.data); // => [{ id: '1', name: 'general', removable: false }, ...]

      const messagesResponse = await axios.get("/api/v1/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(messagesResponse.data); // => [{ id: '1', body: 'text message', channelId: '1', username: 'admin }, ...]

      return {
        channels: channelsResponse.data,
        messages: messagesResponse.data,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    channels: [],
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    deleteChannel: (state, action) => {
      const { id } = action.payload;
      console.log(id)
      state.channels = state.channels.filter((channel) => channel.id !== id);
    },
    editChannel: (state, action) => {
      const { id, name } = action.payload;
      const channelIndex = state.channels.findIndex(
        (channel) => channel.id === id
      );
      if (channelIndex !== -1) {
        state.channels[channelIndex].name = name;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatData.fulfilled, (state, action) => {
        state.channels = action.payload.channels;
        state.messages = action.payload.messages;
        state.loading = false;
      })
      .addCase(fetchChatData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addMessage, addChannel, deleteChannel, editChannel } =
  chatSlice.actions;

export default chatSlice.reducer;