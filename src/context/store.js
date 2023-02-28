import React, { createContext, useState } from "react";

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [uloga, setUloga] = useState(null);
  return (
    <StoreContext.Provider
      value={{ user, setUser, isLogedIn, setIsLogedIn, uloga, setUloga }}
    >
      {children}
    </StoreContext.Provider>
  );
};
