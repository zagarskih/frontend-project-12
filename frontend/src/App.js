import React, { useContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import Login from "./routes/login/LogIn.jsx";
import ChatPage from "./routes/chat/ChatPage.js";
import ProtectedRoute from "./routes/protectRoute.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import SignUp from "./routes/signUp/signup.jsx";
import { ToastContainer } from 'react-toastify';
import AuthContext from "./tokenContext.jsx";
import 'react-toastify/dist/ReactToastify.css';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('user');
    setUser(null);
  };

  // const getAuthHeader = () => {
  //   const userData = JSON.parse(localStorage.getItem('user'));
  //   return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  // };

  return (
    <AuthContext.Provider value={
        {
          logIn, logOut, user,
        }
    }
    >
      { children }
    </AuthContext.Provider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ChatPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  }
]);

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  )
};

export default App;
