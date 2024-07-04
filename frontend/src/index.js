import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import initI18next from './initi18next';
import initLeoprofanity from "./initLeoProf.js";

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  await initI18next();
  initLeoprofanity();

  // const socket = initSocket(init18next);

  // const socketApi = {
  //   sendMsg: (message) => socket.timeout(3000).emitWithAck('newMessage', message),
  //   addChannel: (channel) => socket.timeout(3000).emitWithAck('newChannel', channel),
  //   deleteChannel: (channel) => socket.timeout(3000).emitWithAck('removeChannel', channel),
  //   changeNameChannel: (channel) => socket.timeout(3000).emitWithAck('renameChannel', channel),
  // };

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

app();