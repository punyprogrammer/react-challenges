import React, { createContext, useContext, useState } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to track the authenticated user

  // Function to handle login
  const login = (username, password) => {
    // Simulate an API call to authenticate the user
    // Replace this with actual API logic
    if (username === 'test' && password === 'password') {
      setUser({ username }); // Set user details
      console.log('User logged in:', username);
      return true;
    } else {
      console.error('Invalid username or password');
      return false;
    }
  };

  // Function to handle logout
  const logout = () => {
    setUser(null); // Clear user details
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
