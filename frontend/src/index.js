import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './error-page.jsx';
import Login from './routes/login/login.jsx';
import RootPage from "./routes/root.jsx";
import ProtectedRoute from "./routes/protectRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><RootPage /></ProtectedRoute>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
