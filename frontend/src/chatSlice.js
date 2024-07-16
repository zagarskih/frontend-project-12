import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_ROUTES from './apiRoutes';

export const fetchChatData = createAsyncThunk(
  'chat/fetchChannelsAndMessages',
  async (token, { rejectWithValue }) => {
    try {
      const channelsResponse = await axios.get(API_ROUTES.channels.base(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const messagesResponse = await axios.get(API_ROUTES.messages.base(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        channels: channelsResponse.data,
        messages: messagesResponse.data,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const chatSlice = createSlice({
  name: 'chat',
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
      const updatedChannels = state.channels.filter((channel) => channel.id !== id);
      return {
        ...state,
        channels: updatedChannels,
      };
    },
    editChannel: (state, action) => {
      const { id, name } = action.payload;
      const channelIndex = state.channels.findIndex(
        (channel) => channel.id === id,
      );
      const updatedChannel = {
        ...state.channels[channelIndex],
        name,
      };
      const updatedChannels = [
        ...state.channels.slice(0, channelIndex),
        updatedChannel,
        ...state.channels.slice(channelIndex + 1),
      ];
      return {
        ...state,
        channels: updatedChannels,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(fetchChatData.fulfilled, (state, action) => ({
        ...state,
        channels: action.payload.channels,
        messages: action.payload.messages,
        loading: false,
        error: null,
      }))
      .addCase(fetchChatData.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }));
  },
});

export const {
  addMessage,
  addChannel,
  deleteChannel,
  editChannel
} = chatSlice.actions;
export default chatSlice.reducer;
