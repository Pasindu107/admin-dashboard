import { BarChart, HomeIcon, ListChecks } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const MobileSidebar = () => {
  return (
    <div className='flex flex-col'>
        <div className='flex-none p-4 text-[20px] '>
            MOBILE APP
        </div>
         <Link href={"/"}>
          <div className='flex-none gap-4 hover:bg-gray-100 hover:text-black rounded-lg my-3 p-2 flex items-center cursor-pointer'>
            <HomeIcon />
            <div className=''>
              Home
            </div>
               
          </div>          
        </Link>
        <Link href={"/sales"}>
          <div className='flex-none gap-4 px-2 py-3  hover:bg-gray-100 hover:text-black rounded-lg my-3 p-2 flex items-center cursor-pointer'>
            <BarChart /> 
            <div className=''>
              Sales
            </div>  
          </div> 
        </Link>
        <Link href={"/items"}>
          <div className='flex-none gap-4 px-2 py-3 grow hover:bg-gray-100 hover:text-black rounded-lg my-3 flex items-center cursor-pointer'>
            <ListChecks /> 
            <div className=''>
              Items
            </div>  
          </div> 
        </Link>
        <Link href={"/supplier"}>
          <div className='flex-none gap-4 px-2 py-3  hover:bg-gray-100 hover:text-black rounded-lg my-3 p-2 flex items-center grow cursor-pointer'>
            <ListChecks /> 
            <div className=''>
              Supplier
            </div>  
          </div> 
        </Link> 
        <div className='grow'>
            
        </div>
        <Link href={"/login"}>
          <div className='flex-none gap-4 px-2 py-3  hover:bg-gray-100 hover:text-black rounded-lg my-3 p-2 flex items-center grow cursor-pointer'>
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
