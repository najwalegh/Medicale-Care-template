import { createContext, useContext, useState } from "react";

const authContext = createContext();

export function useTokenContext() {
  return useContext(authContext);
}

const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return (
    <authContext.Provider value={{ token, setToken: saveToken }}>
      {children}
    </authContext.Provider>
  );
}
