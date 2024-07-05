"use client"

// components/ProtectedRoute.js

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    const SupCode = localStorage.getItem('SupCode');

    if (!SupCode) {
      router.replace('/login');
    }
    //setLoading(false);
  });

  // if (loading) {
  //   return <div>Loading...</div>; // Optional: Add a loading spinner or placeholder
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
