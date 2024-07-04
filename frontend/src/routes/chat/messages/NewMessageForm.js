import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../chatSlice";
import { sendMessageApi } from "../../../api";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import AuthContext from "../../../tokenContext";
import filter from 'leo-profanity';

const NewMessageForm = ({ activeChannel }) => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [newMessage, setNewMessage] = useState("");
  const [isSubmiting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Токен отсутствует.");
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
      setNewMessage("");
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
        novalidate
        className="py-1 border rounded-2"
        onSubmit={handleSendMessage}
      >
        <div className="input-group">
          <input
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            value={newMessage}
            onChange={handleInputChange}
          ></input>
          <button
            type="submit"
            disabled={isSubmiting}
            className="btn btn-group-vertical"
          >
            {t("interface.send")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMessageForm;
