import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import NewMessageForm from './NewMessageForm';

const СhatMessages = ({ activeChannel }) => {
  const { t } = useTranslation();
  const messages = useSelector((state) => state.chat.messages);
  const channels = useSelector((state) => state.chat.channels);

  const getMsgsByChannel = (msgByChannel, channel) => msgByChannel
    .filter((msg) => msg.channelId === channel);

  const findChannelNameById = (allChannels, id) => {
    const channelById = allChannels.find((c) => c.id === id);
    return channelById ? channelById.name : 'Channel not found';
  };

  const activeChannelMessages = getMsgsByChannel(messages, activeChannel);
  const activeChannelName = findChannelNameById(channels, activeChannel);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannelName}
            </b>
          </p>
          <span className="text-muted">
            {t('message', { count: activeChannelMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {activeChannelMessages.map((msg) => (
            <div key={msg.id} className="text-break mb-2">
              <b>{msg.username}</b>
              {': '}
              {msg.body}
            </div>
          ))}
        </div>
        <NewMessageForm activeChannel={activeChannel} />
      </div>
    </div>
  );
};

export default СhatMessages;
