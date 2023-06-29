import React, { createContext, useEffect, useState } from "react";

type NotificationContextType = {
  showNotification: boolean;
  triggerNotification: Function;
  notificationMessage: string;
};

const NotificationContext = createContext<NotificationContextType>({
  showNotification: !null,
  triggerNotification: () => {},
  notificationMessage: "",
});

export const NotificationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const triggerNotification = (message: string) => {
    console.log("SHOWING_NOTIFICATION");
    setShowNotification(true);
    setNotificationMessage(message);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [showNotification, setShowNotification]);

  return (
    <NotificationContext.Provider
      value={{ showNotification, triggerNotification, notificationMessage }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
