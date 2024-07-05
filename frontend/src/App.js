import React, { useContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.js";
import Login from "./routes/login/Login.js";
import ChatPage from "./routes/chat/ChatPage.js";
import ProtectedRoute from "./routes/protectRoute.js";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store.js";
import SignUp from "./routes/signUp/SignUp.js";
import { ToastContainer } from "react-toastify";
import AuthContext from "./tokenContext.js";
import { Provider, ErrorBoundary } from "@rollbar/react";
import "react-toastify/dist/ReactToastify.css";

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(
    currentUser ? { username: currentUser.username } : null
  );

  const logIn = (userData) => {
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
  },
]);

// const TestError = () => {
//   const a = null;
//   return a.hello();
// };

const App = () => {
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
            <RouterProvider router={router} />
            {/* <TestError /> */}
          </AuthProvider>
        </ReduxProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
