import { createContext, useEffect, useState, useContext } from "react";
import NotificationContext from "./notificationContext";
import AuthContext from "./authContext";
import { getItemFromLocalStorage, getUser } from "@/utils";

type UserContextType = {
  error: string;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  loading: false,
  error: "",
});

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { triggerNotification } = useContext(NotificationContext);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const savedUserID: string | null = getItemFromLocalStorage("uid");
    if (!savedUserID) {
      setUser(null);
      return;
    }

    (async () => {
      try {
        const userDocument = await getUser(savedUserID);
        if (!userDocument) return;
        console.log("");

        return setUser(userDocument);
        //NOTE comeback to this
      } catch (error: any) {
        return setError(error);
      }
    })();

    // const user =
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
