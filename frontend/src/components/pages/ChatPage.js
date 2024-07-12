import React, { useState } from "react";
import ChannelsList from "../elements/channels/ChannelsList";
import ChatMessages from "../elements/messages/ChatMessages"
import ChatHeader from "../elements/HeaderChat";

const ChatPage = () => {
  const [activeChannel, setActiveChannel] = useState("1");
  const handleActiveChannel = (channel) => {
    setActiveChannel(channel);
  };

  return (
    <div className="d-flex flex-column h-100">
      <ChatHeader />
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <ChannelsList
              activeChannel={activeChannel}
              setActiveChannel={setActiveChannel}
              onChannelClick={handleActiveChannel}
            />
          </div>
          <ChatMessages activeChannel={activeChannel} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
