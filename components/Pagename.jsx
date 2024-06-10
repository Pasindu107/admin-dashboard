// 'use client'

// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';

// const getPageTitle = (pathname) => {
//   switch (pathname) {
//     case '/':
//       return 'Dashboard';
//     case '/items':
//       return 'Items';
//     case '/sales':
//       return 'Sales';
//     case '/supplier':
//       return 'Supplier';
//     default:
//       return 'Next.js App';
//   }
// };

// const Pagename = () => {
//   const [pageTitle, setPageTitle] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     if (router) {
//       setPageTitle(getPageTitle(router.pathname));
//     }
//   }, [router]);

//   return (
//     <div>
//       <header>
//         <h1>{pageTitle}</h1>
//       </header>
//     </div>
//   );
// };

// export default Pagename;

import React from 'react'

const Pagename = (props) => {
  return (
    <div>
      {props.page}
    </div>
  )
}

export default Pagename


