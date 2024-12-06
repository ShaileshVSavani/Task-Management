
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage for user data on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse stored user data
    }
  }, []);

  const login = (userData) => {
    setUser(userData); // Set user in state
    localStorage.setItem('user', JSON.stringify(userData)); // Save user to localStorage
  };

  const logout = () => {
    setUser(null); // Remove user from state
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
