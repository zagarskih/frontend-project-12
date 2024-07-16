import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';

import initI18next from './initi18next';
import initLeoprofanity from './initLeoProf.js';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  await initI18next();
  initLeoprofanity();

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

app();
