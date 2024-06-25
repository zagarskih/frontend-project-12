import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMessageForm from "./NewMessageForm";
import { addMessage } from "../chatSlice";
import { initSocket, disconnectSocket } from "../../../socket";

const СhatMessages = ({ activeChannel }) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const channels = useSelector((state) => state.chat.channels);

  useEffect(() => {
    console.log("Initializing socket...");
    initSocket();
  }, []);

  useEffect(() => {
    initSocket((message) => {
      dispatch(addMessage({ message }));
    });

    return () => {
      disconnectSocket();
    };
  }, [dispatch]);

  const getMessagesByChannel = (messages, channel) => {
    return messages.filter((msg) => {
      console.log("msg", msg);
      return msg.channelId === channel;
    });
  };

  const findChannelNameById = (channels, id) => {
    const channel = channels.find((channel) => channel.id === id);
    return channel ? channel.name : "Channel not found";
  };

  const activeChannelMessages = getMessagesByChannel(messages, activeChannel);
  const activeChannelName = findChannelNameById(channels, activeChannel);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {activeChannelName}</b>
          </p>
          <span className="text-muted">
            Сообщений: {activeChannelMessages.length}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {activeChannelMessages.map((msg) => (
            <div key={msg.id} className="text-break mb-2">
              <b>{msg.username}</b>: {msg.body}
            </div>
          ))}
        </div>
        <NewMessageForm activeChannel={activeChannel} />
      </div>
    </div>
  );
};

export default СhatMessages;
