// 'use client'

// // components/HeaderTitle.jsx
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';


// const HeaderTitle = () => {
//   const [title, setTitle] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     if (router.pathname) {
//       switch (router.pathname) {
//         case '/':
//           setTitle('Home');
//           break;
//         case '/items':
//           setTitle('Items');
//           break;
//         case '/sales':
//           setTitle('Sales');
//           break;
//         case '/supplier':
//           setTitle('Supplier');
//           break;
//         case '/uploadpurchase':
//           setTitle('Upload Purchase');
//           break;
//         case '/uploadreimsummery':
//           setTitle('Upload Summary');
//           break;
//         default:
//           setTitle('Page');
//       }
//     }
//   }, [router.pathname]);

//   return <h1>{title}</h1>;
// };

// export default HeaderTitle;

import React from 'react'

const HeaderTitle = () => {
  return (
    <div>
      
    </div>
  )
}

export default HeaderTitle
