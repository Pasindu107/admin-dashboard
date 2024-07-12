'use client';

import React, { useContext, useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from 'next/link';
import LogOut from './LogOut';
import { AuthContext } from '@/context/AuthContext';

const UserItem = () => {
  const { username, email } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');

    if (storedUsername && storedEmail) {
      console.log('Using username and email from local storage');
      setUserName(storedUsername);
      setUserEmail(storedEmail);
    } else {
      console.log('Using username and email from context');
      setUserName(username);
      setUserEmail(email);
    }
  }, [username, email]);

  useEffect(() => {
    console.log('Current username:', username);
    console.log('Current email:', email);
  }, [username, email]);

  return (
    <div className='flex items-center gap-2'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='flex gap-3'>
            <div className='flex flex-col content-center'>
              <div className='text-gray-700 content-center text-[14px] text-right hidden sm:block md:block'>{userName}</div>
              <div className='text-gray-500 content-center text-[10px] text-right hidden sm:block md:block'>{userEmail}</div>
            </div>
            <div className='avatar rounded-full min-h-10 min-w-10 bg-black text-white font-[700] flex items-center justify-center'>
              <p>{userName ? userName.charAt(0).toUpperCase() : ''}</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='cursor-pointer hover:bg-slate-100'><Link href={'/profile'}>Profile</Link></DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer hover:bg-slate-100'><LogOut /></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserItem;
