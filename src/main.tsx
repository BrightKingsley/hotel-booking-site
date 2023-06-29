import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Providers
import {
  AuthContextProvider,
  HotelContextProvider,
  ModalContextProvider,
  NotificationContextProvider,
  ThemeContextProvider,
} from "./context";

// routes
import {
  Home,
  Hotels,
  Error,
  App,
  HotelDetails,
  Root,
  MyLearning,
} from "./routes";

//style
import "./index.css";
import { Auth, Login, Signup } from "./routes/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        // errorElement: <Error />,
      },
      {
        path: "/app",
        element: <App />,
        // errorElement: <Error />,
        children: [
          {
            path: "hotels",
            element: <Hotels />,
          },

          {
            path: "hotels/:id",
            element: <HotelDetails />,
          },
          {
            path: "my-learning",
            element: <MyLearning />,
          },
        ],
      },
      {
        path: "/auth",
        element: <Auth />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NotificationContextProvider>
      <ModalContextProvider>
        <AuthContextProvider>
          <HotelContextProvider>
            <RouterProvider router={router} />
          </HotelContextProvider>
        </AuthContextProvider>
      </ModalContextProvider>
    </NotificationContextProvider>
  </React.StrictMode>
);
