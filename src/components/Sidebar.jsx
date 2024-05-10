'use client'
import { BarChart, HomeIcon, ListChecks } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'


const Sidebar = () => {
  const router = useRouter()
  return (

    
    <div className='relative flex-col  min-w-[10px] hidden sm:block md:min-w-[250px] lg:min-w-[300px] xl:min-w-[300px] border-r min-h-full p-4 bg-white rounded-[10px]'>
        <div className='hidden sm:hidden md:block lg:block xl:block text-[25px] min-h-[100px] p-4'>
          ADMIN PANEL
        </div>
        <Link href={"/"}>
          <div className='gap-2 px-2 py-3 bg-gray-50 hover:bg-purple-200 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <HomeIcon />
            <div className='hidden sm:hidden md:block lg:block xl:block'>
              Home
            </div>
               
          </div>          
        </Link>
        <Link href={"/sales"}>
          <div className='gap-2 px-2 py-3 bg-gray-50 hover:bg-purple-200 rounded-lg my-3 p-2 grid md:grid-cols-4 md:min-w-[20px] sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <BarChart /> 
            <div className='hidden sm:hidden md:block lg:block xl:block'>
              Sales
            </div>  
          </div> 
        </Link>
        <Link href={"/items"}>
          <div className='gap-2 px-2 py-3 bg-gray-50 hover:bg-purple-200 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
            <ListChecks /> 
            <div className='hidden sm:hidden md:block lg:block xl:block'>
              Items
            </div>  
          </div> 
        </Link>   
    </div>
    //<div className='flex flex-col gap-10 w-[300px] min-w-[300px] border-r min-h-full p-4 h-screen'>sidebar</div>
  )
}
 
export default Sidebar
