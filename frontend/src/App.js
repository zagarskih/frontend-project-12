import React, { useEffect, useState, useMemo } from 'react';
// import { useDispatch } from 'react-redux';
import {
  Navigate,
  useLocation,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { Provider as ReduxProvider, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import AuthContext from './tokenContext.js';
import store from './store.js';
import ErrorPage from './components/pages/ErrorPage.js';
import Login from './components/pages/LogIn.js';
import SignUp from './components/pages/SignUp.js';
import ChatPage from './components/pages/ChatPage.js';
import {
  addMessage,
  addChannel,
  deleteChannel,
  editChannel,
} from './chatSlice.js';
import 'react-toastify/dist/ReactToastify.css';

const socket = io();

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(
    currentUser ? { username: currentUser.username } : null,
  );

  const logIn = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const authValue = useMemo(
    () => ({
      logIn,
      logOut,
      user,
    }),
    [logIn, logOut, user]
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log(!!token);
  const location = useLocation();
  return token ? ( //delete !!
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(deleteChannel(payload));
      // dispatch(deleteChannelMessages(channel));
    });

    socket.on('renameChannel', (payload) => {
      dispatch(editChannel(payload));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch]);

  const rollbarConfig = {
    accessToken: '3a0fbeb3dce14e78b4ff4ed823304ddb',
    environment: 'testenv',
  };

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <AuthProvider>
            <ToastContainer />
            <RouterProvider router={router} />
          </AuthProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
