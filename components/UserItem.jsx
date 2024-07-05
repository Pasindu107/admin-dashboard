'use client';

import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import LogOut from './LogOut';





const UserItem = () => {
  return (
    <div className='flex items-center gap-2 '>
        {/* <div className=''>
            <p className='text-[16px] font-bold'>Pasindu Bhanuka</p>
            <p className='text-[12px] text-neutral-500'>abcdef@gmail.com</p>
        </div> */}

        <DropdownMenu>
          <DropdownMenuTrigger>
          <div className='avatar rounded-full min-h-10 min-w-10 bg-black text-white font-[700]
            flex items-center justify-center'>
            <p>PB</p>
          </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer hover:bg-slate-100'><Link href={'/profile'}>Profile</Link></DropdownMenuItem>
            <Link href={'/login'}><DropdownMenuItem  className='cursor-pointer hover:bg-slate-100'><LogOut /></DropdownMenuItem></Link>
 
          </DropdownMenuContent>
        </DropdownMenu>





      
    </div>
  )
}

export default UserItem
