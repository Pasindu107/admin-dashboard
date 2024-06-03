'use client'
import { BarChart, HomeIcon, ListChecks } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'


const Sidebar = () => {
  const router = useRouter()
  return (

    
    <div className='relative flex-col hidden sm:hidden md:block lg:block xl:block md:min-w-[200px] lg:min-w-[300px] xl:min-w-[300px] border-r min-h-full p-4 bg-white rounded-[10px]'>
        <div className='text-[25px] min-h-[  100px] p-4'>
          ADMIN PANEL
        </div>
        <Link href={"/"}>
          <button className='gap-2 px-2 py-3 bg-gray-50 hover:bg-slate-300 focus:bg-blue-950 focus:text-white active:bg-blue-950 rounded-lg my-3 p-2 grid  md:grid-cols-4 md:min-w-[20px] sm:grid-cols-3 lg:w-[275px] grid-cols-2 items-center justify-between cursor-pointer'>
            <HomeIcon />
            <div className=''>
              Home
            </div>
               
          </button>          
        </Link>
        <Link href={"/sales"}>
          <button className='gap-2 px-2 py-3 bg-gray-50 hover:bg-slate-300 focus:bg-blue-950 focus:text-white active:bg-blue-950 rounded-lg my-3 p-2 grid md:grid-cols-4 md:min-w-[20px] sm:grid-cols-3 lg:w-[275px] grid-cols-2 items-center justify-between cursor-pointer'>
            <BarChart /> 
            <div className=''>
              Sales
            </div>  
          </button> 
        </Link>
        <Link href={"/items"}>
          <button className='gap-2 px-2 py-3 bg-gray-50 hover:bg-slate-300 focus:bg-blue-950 focus:text-white active:bg-blue-950 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 lg:w-[275px] grid-cols-2 items-center justify-between cursor-pointer'>
            <ListChecks /> 
            <div className=''>
              Items
            </div>  
          </button> 
        </Link>
        <Link href={"/supplier"}>
          <button className='gap-2 px-2 py-3 bg-gray-50 hover:bg-slate-300 focus:bg-blue-950 focus:text-white active:bg-blue-950 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 lg:w-[275px] grid-cols-2 items-center justify-between cursor-pointer'>
            <ListChecks /> 
            <div className=''>
              Supplier
            </div>  
          </button> 
        </Link>    





    </div>

    //<div className='flex flex-col gap-10 w-[300px] min-w-[300px] border-r min-h-full p-4 h-screen'>sidebar</div>
  )
}
 
export default Sidebar 
