import { createContext, useState, useEffect } from "react";
import {
  getIdToken,
  getAuth,
  onAuthStateChanged,
  Auth,
  User,
} from "firebase/auth";
//@ts-ignore
export const AppContext = createContext<IAppContext>({});

export type TabType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const AppProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>();
  const [userEmail, setUserEmail] = useState<string | null>("");
  const [uid, setUid] = useState<string>("");
  const [token, setToken] = useState<string>();

  const auth = getAuth();
  useEffect(() => {
    auth.currentUser?.getIdToken().then((_token) => setToken(_token));
  }, [user]);

  onAuthStateChanged(auth, (_user) => {
    if (_user) {
      setUser(_user);
    } else {
      setUser(null);
    }
  });

  return (
    <AppContext.Provider
      value={{
        auth,
        user,
        token,
        setUserEmail,
        userEmail,

        uid,
        setUid,
        setUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

interface IAppContext {
  auth?: Auth;
  token?: string;
  user?: User | null;
  userEmail?: string | null;
  setUserEmail: (value: string | null) => void;
  uid: string;
  setUid: (value: string) => void;
  setUser: (value: User | null) => void;
}
