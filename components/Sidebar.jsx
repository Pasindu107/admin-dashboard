'use client'
import { BarChart, HomeIcon, ListChecks } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'


const Sidebar = () => {
  const router = useRouter()
  return (

    
    <div className='relative flex-col hidden sm:hidden md:block lg:block xl:block lg:min-w-[300px] xl:min-w-[300px] border-r min-h-full p-4 bg-white rounded-[10px]'>
        <div className='text-[25px] min-h-[100px] p-4'>
          ADMIN PANEL
        </div>
        <Link href={"/"}>
          <div className='gap-2 px-2 py-3 bg-gray-50 hover:bg-purple-200 rounded-lg my-3 p-2 grid  md:grid-cols-4 md:min-w-[20px] sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <HomeIcon />
            <div className=''>
              Home
            </div>
               
          </div>          
        </Link>
        <Link href={"/sales"}>
          <div className='gap-2 px-2 py-3 bg-gray-50 hover:bg-purple-200 rounded-lg my-3 p-2 grid md:grid-cols-4 md:min-w-[20px] sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <BarChart /> 
            <div className=''>
              Sales
            </div>  
          </div> 
        </Link>
        <Link href={"/items"}>
          <div className='gap-2 px-2 py-3 bg-gray-50 hover:bg-purple-200 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <ListChecks /> 
            <div className=''>
              Items
            </div>  
          </div> 
        </Link>
        <Link href={"/supplier"}>
          <div className='gap-2 px-2 py-3 bg-gray-50 hover:bg-purple-200 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <ListChecks /> 
            <div className=''>
              Supplier
            </div>  
          </div> 
        </Link>    





    </div>

    //<div className='flex flex-col gap-10 w-[300px] min-w-[300px] border-r min-h-full p-4 h-screen'>sidebar</div>
  )
}
 
export default Sidebar
