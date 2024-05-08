'use client'

import React from 'react'
import UserItem from './UserItem'
import { AlignJustify, List } from 'lucide-react'
import SidebarButton from './SidebarButton'

const Header = () => {
  return (
    <div className='flex justify-between bg-white text-black p-4 rounded-[8px]'>
      {/* <SidebarButton /> */}
      <div className='block sm:hidden md:hidden lg:inline xl:inline'></div>
        <div className=''>
           <UserItem />
        </div>
    </div>





    // <div className=''>     
    //   <h2 className=''></h2>
    //   {/* <div className=''>
    //     <UserItem />
    //   </div> */}
    // </div>
    // <div className="bg-white absolute h-20 w-full flex justify-between p-4 border rounded-[8px]">
    //   <p>hello</p>
    //   <p>admin</p>
    // </div>
  )
}

export default Header
