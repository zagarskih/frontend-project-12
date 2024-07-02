import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page.jsx";
import Login from "./routes/login/LogIn.jsx";
import ChatPage from "./routes/chat/ChatPage.js";
import ProtectedRoute from "./routes/protectRoute.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import SignUp from "./routes/signUp/signup.jsx";

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
      <RouterProvider router={router} />
    </Provider>
  )
};

export default App;
