import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "./chatSlice";
import { sendMessage } from "../../api";

const NewMessageForm = ({ activeChannel }) => {
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState("");

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
      username: "Test",
      body: newMessage,
    };
    try {
      // dispatch(addMessage({ message }));
      await sendMessage(token, message);
      setNewMessage("");
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
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
          <button type="submit" className="btn btn-group-vertical">
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMessageForm;
