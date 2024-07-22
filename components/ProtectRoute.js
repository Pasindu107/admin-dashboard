// "use client"

// // components/ProtectedRoute.js

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const ProtectedRoute = ({ children }) => {
//   const router = useRouter();


//   useEffect(() => {
//     const SupCode = localStorage.getItem('SupCode');

//     if (!SupCode) {
//       router.replace('/login');
//     }
 
//   });



//   return <>{children}</>;
// };

// export default ProtectedRoute;


"use client";

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { fetchAuth } from "@/src/app/api/dashAuthApi";
import DashAuthPopup from './DashAuthPopup';

const sidebarItems = [
  { id: 1, href: "/" },
  { id: 2, href: "/items" },
  { id: 3, href: "/supplier" },
  { id: 7, href: "/uploadpurchase" },
  { id: 10, href: "/reimsummery" },
  { id: 13, href: "/profile" },
];

const ProtectedRoute = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [redirectPath, setRedirectPath] = useState('');
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const checkAuthorization = async () => {
      const SupCode = localStorage.getItem('SupCode');
      const roleId = localStorage.getItem('UserRole');
      const currentPath = pathname || '/';

      if (currentPath === '/login') {
        setLoading(false); // No need to check authorization for login
        return;
      }

      if (currentPath === '/signup') {
        setLoading(false); // No need to check authorization for login
        return;
      }

      if (!SupCode || !roleId) {
        router.replace('/login');
        return;
      }

      const normalizedPath = currentPath.split('?')[0];
      const currentSidebarItem = sidebarItems.find(item => item.href === normalizedPath);
      const profId = currentSidebarItem ? currentSidebarItem.id : 1;

      try {
        const response = await fetchAuth(roleId, profId);

        if (Array.isArray(response) && response.length > 0) {
          const newData = response[0];
          setAuthData(newData);

          if (newData.Is_Active === false) {
            setMessage('You are not Authorized!');
            setOpenPopup(true)
            setTimeout(() => {
              setMessage(''); // Clear message after showing
              router.replace('/'); // Redirect to the home or any page
            }, 2000); // Adjust timeout as needed
          } else {
            setMessage('');
          }
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching auth data:', error);
        setMessage('An error occurred. Please try again.');
        setRedirectPath('/'); // Redirect to home or another page
      } finally {
        setLoading(false);
      }
    };

    checkAuthorization();
  }, [pathname, router]);

  useEffect(() => {
    if (!loading && !message && redirectPath) {
      router.replace(redirectPath);
    }
  }, [message, loading, redirectPath, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>
              <DashAuthPopup openPopup={openPopup} closePopup={setOpenPopup} data={message} />
              {/* {message} */}
          </div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
