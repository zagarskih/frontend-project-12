import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChannelsList from '../elements/channels/ChannelsList';
import ChatMessages from '../elements/messages/ChatMessages';
import ChatHeader from '../elements/HeaderChat';
import { fetchChatData } from '../../chatSlice';

const ChatPage = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);

  const [activeChannel, setActiveChannel] = useState('1');

  const handleActiveChannel = (channel) => {
    setActiveChannel(channel);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchChatData(token));
    }
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='d-flex flex-column h-100'>
      <ChatHeader />
      <div className='container h-100 my-4 overflow-hidden rounded shadow'>
        <div className='row h-100 bg-white flex-md-row'>
          <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
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
