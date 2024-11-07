import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  // Initialize login state and user data from localStorage
  const [UserIsLogedIn, setUserIsLogedIn] = useState(false);
  const [UserData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const locs = JSON.parse(storedUser);
      const loginDate = locs.date;
      const currentDate = new Date().getTime();
      const oneDay =  60 * 1000; // 24 hours in milliseconds

      // Check if the session is still valid (within 24 hours)
      if (currentDate - loginDate < oneDay) {
        setUserIsLogedIn(true);
        setUserData(locs.usr); // Retrieve the user data from local storage
      } else {
        // If session expired, remove user data from localStorage
        localStorage.removeItem("user");
      }
    }
  }, []);

  // Update localStorage whenever user logs in
  const handleLogin = (userData) => {
    setUserIsLogedIn(true);
    setUserData(userData);
    const locs = {
      date: new Date().getTime(),
      usr: userData,
    };
    localStorage.setItem("user", JSON.stringify(locs));
  };

  // Clear localStorage and context state on logout
  const handleLogout = () => {
    setUserIsLogedIn(false);
    setUserData(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        UserIsLogedIn,
        setUserIsLogedIn,
        UserData,
        setUserData,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
