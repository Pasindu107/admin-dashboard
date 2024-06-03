// 'use client'

// import React, { useState } from 'react'
// import UserItem from './UserItem'
// import { AlignJustify, List } from 'lucide-react'
// import SidebarButton from './SidebarButton'
// import Pagename from './Pagename'

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false)

//   const handleNav = () => {
//       setMenuOpen(!menuOpen);
//   }
  
//   return (
//     <div className='flex justify-between bg-white text-black p-4 rounded-[8px]'>
//       <div onClick={handleNav} className='md:hidden cursor-pointer pl-24'>
//         <SidebarButton />
//       </div>
//       <div className= {
//         menuOpen
//         ? "fixed left-0 top w-[65%] sm:hidden h-screen bg-white p-10 ease-in duration-500"
//         : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
//       }>
        
//       </div>

    
      
//       <div className='p-2 hidden sm:hidden md:block lg:block xl:block'><Pagename /></div>
//         <div className=''>
//            <UserItem />
//         </div>
//     </div>





//     // <div className=''>     
//     //   <h2 className=''></h2>
//     //   {/* <div className=''>
//     //     <UserItem />
//     //   </div> */}
//     // </div>
//     // <div className="bg-white absolute h-20 w-full flex justify-between p-4 border rounded-[8px]">
//     //   <p>hello</p>
//     //   <p>admin</p>
//     // </div>
//   )
// }

// export default Header

'use client'

import React, { useState, useEffect, useRef } from 'react';
import UserItem from './UserItem';
import SidebarButton from './SidebarButton';
import Pagename from './Pagename';
import Sidebar from './Sidebar';
import Link from 'next/link';
import { BarChart, HomeIcon, ListChecks } from 'lucide-react';
import MobileSidebar from './MobileSidebar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className='flex justify-between bg-white text-black p-4 rounded-[8px]'>
      <div onClick={handleNav} className='md:hidden cursor-pointer p-2'>
        <SidebarButton />
      </div>
      <div ref={sidebarRef} className={
        menuOpen
          ? "fixed  left-0 top-0 w-[65%] h-screen bg-blue-950 text-white p-4 ease-in-out duration-500"
          : "fixed left-[-100%] top-0 p-10 ease-in-out duration-500"
      }>

        <div onClick={handleNav} ><MobileSidebar /></div>
        
      </div>
        
      <div className='p-2 hidden md:block lg:block xl:block'>
        <Pagename />
      </div>
      <div>
        <UserItem />
      </div>
      
    </div>
    
  );
};

export default Header;
