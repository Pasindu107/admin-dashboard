
'use client'

import React, { useState, useEffect, useRef } from 'react';
import UserItem from './UserItem';
import SidebarButton from './SidebarButton';
import Pagename from './Pagename';
import Sidebar from './Sidebar';
import Link from 'next/link';
import { BarChart, HomeIcon, ListChecks } from 'lucide-react';
import MobileSidebar from './MobileSidebar';

const Header = (props) => {
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
        <Pagename page={props.page}/>
      </div>
      <div>
        <UserItem />
      </div>
      
    </div>
    
  );
};

export default Header;
