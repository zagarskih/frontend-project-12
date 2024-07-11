import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ToastContainer } from "react-toastify";
import AuthContext from "./tokenContext.js";
import { Provider, ErrorBoundary } from "@rollbar/react";
import { io } from "socket.io-client";
import store from "./store.js";
import ErrorPage from "./error-page.js";
import Login from "./routes/login/LogIn.js";
import ChatPage from "./routes/chat/ChatPage.js";
// import ProtectedRoute from "./routes/protectRoute.js";
import SignUp from "./routes/signUp/SignUp.js";
import {
  addMessage,
  addChannel,
  deleteChannel,
  editChannel,
} from "./routes/chat/chatSlice.js";
import "react-toastify/dist/ReactToastify.css";

const socket = io();

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(
    currentUser ? { username: currentUser.username } : null
  );

  const logIn = (userData) => {
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("newMessage", (payload) => {
      dispatch(addMessage(payload));
    });
  
    socket.on("newChannel", (payload) => {
      dispatch(addChannel(payload));
    });
  
    socket.on("removeChannel", (payload) => {
      dispatch(deleteChannel(payload));
      // dispatch(deleteChannelMessages(channel));
    });
  
    socket.on("renameChannel", (payload) => {
      dispatch(editChannel(payload));
    });

    return () => {
      socket.off("newMessage");
      socket.off("newChannel");
      socket.off("removeChannel");
      socket.off("renameChannel");
    };
  }, [dispatch]);

  const rollbarConfig = {
    accessToken: "3a0fbeb3dce14e78b4ff4ed823304ddb",
    environment: "testenv",
  };

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <ReduxProvider store={store}>
          <AuthProvider>
            <ToastContainer />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<ProtectedRoute element={<ChatPage />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
