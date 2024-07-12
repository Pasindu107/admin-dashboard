'use client'

// contexts/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');


  return (
    <AuthContext.Provider value={{ username, setUsername, email, setEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
