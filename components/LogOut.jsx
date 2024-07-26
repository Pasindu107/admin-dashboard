'use client'

import React from 'react';
import { useRouter } from 'next/navigation';

const LogOut = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear id and token from localStorage
    localStorage.removeItem('UserRole');
    localStorage.removeItem('token');

    // Redirect to login page after logout
    // window.location.reload();  
    router.push('/login');

  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogOut;
