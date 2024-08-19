// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [estAuthentifie, setEstAuthentifie] = useState(false);

  useEffect(() => {
    // Restaurer l'état d'authentification à partir de localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setEstAuthentifie(true);
    }
  }, []);

  const login = () => {
    setEstAuthentifie(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setEstAuthentifie(false);
  };

  return (
    <AuthContext.Provider value={{ estAuthentifie, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
