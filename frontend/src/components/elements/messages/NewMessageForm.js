import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import { sendMessageApi } from '../../../api';
import AuthContext from '../../../tokenContext';

const socket = io();

const NewMessageForm = ({ activeChannel }) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState('');
  const [isSubmiting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Токен отсутствует.');
      return;
    }

    const message = {
      id: Date.now(),
      channelId: activeChannel,
      username: user.username,
      body: filter.clean(newMessage),
    };

    try {
      setSubmitting(true);
      await sendMessageApi(token, message, t);
      socket.emit('newMessage', message);
      setNewMessage('');
    } catch (error) {
      console.error(t('errors.sending'), error);
      toast.error(t('networkError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-auto px-5 py-3">
      <form
        noValidate
        className="py-1 border rounded-2"
        onSubmit={handleSendMessage}
      >
        <div className="input-group">
          <input
            name="body"
            aria-label={t('interface.writeNewMessage')}
            placeholder={t('interface.writeMessagePlaceholder')}
            className="border-0 p-0 ps-2 form-control"
            value={newMessage}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            disabled={isSubmiting}
            className="btn btn-group-vertical"
          >
            {t('interface.send')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMessageForm;
