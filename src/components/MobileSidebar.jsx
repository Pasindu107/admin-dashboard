import { BarChart, HomeIcon, ListChecks } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const MobileSidebar = () => {
  return (
    <div className='flex flex-col'>
        <div className='p-4 text-[20px] '>
            MOBILE APP
        </div>
         <Link href={"/"}>
          <div className='gap-4 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
            <HomeIcon />
            <div className=''>
              Home
            </div>
               
          </div>          
        </Link>
        <Link href={"/sales"}>
          <div className='gap-4 px-2 py-3  hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer'>
            <BarChart /> 
            <div className=''>
              Sales
            </div>  
          </div> 
        </Link>
        <Link href={"/items"}>
          <div className='gap-4 px-2 py-3 grow hover:bg-gray-100 rounded-lg my-3 flex items-center cursor-pointer'>
            <ListChecks /> 
            <div className=''>
              Items
            </div>  
          </div> 
        </Link> 
        <Link href={"/#"}>
          <div className='gap-4 px-2 py-3  hover:bg-purple-200 rounded-lg my-3 p-2 flex items-center grow cursor-pointer'>
            <ListChecks /> 
            <div className=''>
              Log Out
            </div>  
          </div> 
        </Link> 
    </div>
  )
}

export default MobileSidebar
