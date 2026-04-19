import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Hardcoded admin credentials
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'egapure2025'
  };

  useEffect(() => {
    // Check authentication state on mount
    try {
      const authState = sessionStorage.getItem('egapure_auth');
      if (authState === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.warn('SessionStorage not available, using memory state');
    }
  }, []);

  const login = (username, password) => {
    console.log('Login attempt:', username, password);
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('egapure_auth', 'true');
      } catch (error) {
        console.warn('SessionStorage not available, using memory state');
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('egapure_auth');
    } catch (error) {
      console.warn('SessionStorage not available');
    }
  };

  const value = {
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
