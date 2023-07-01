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
  Chat,
  Bookings,
} from "./routes";

//style
import "./index.css";
import { Auth, Login, Signup } from "./routes/auth";
import { UserContextProvider } from "./context/userContext";

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
            path: "hotels/bookings/:id",
            element: <Bookings />,
          },
          {
            path: "hotels/chat/:id",
            element: <Chat />,
          },

          {
            path: "hotels/:id",
            element: <HotelDetails />,
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
          <UserContextProvider>
            <HotelContextProvider>
              <RouterProvider router={router} />
            </HotelContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </ModalContextProvider>
    </NotificationContextProvider>
  </React.StrictMode>
);

// document.getElementById("root")!.style.height = "100%";
