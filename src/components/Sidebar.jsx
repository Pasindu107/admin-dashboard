'use client'
import { BarChart, HomeIcon, ListChecks } from 'lucide-react'
import Link from 'next/link'
import React from 'react'



const Sidebar = () => {

  return (

    
    <div className='relative flex-col  min-w-[10px] hidden sm:block md:min-w-[250px] lg:min-w-[300px] xl:min-w-[300px] border-r min-h-full p-4 bg-white rounded-[10px]'>
        <div className='hidden sm:hidden md:block lg:block xl:block text-[30px] min-h-[100px] p-4'>
          MOBILE APP
        </div>
        <div className="flex items-center gap-2 px-2 py-3 ">
          <HomeIcon />
        <div className='hidden sm:hidden md:block lg:block xl:block'><Link href={"/"}>Home</Link></div>
        </div>
        <div className="flex items-center gap-2 px-2 py-3">
          <BarChart />        
          <div className='hidden sm:hidden md:block lg:block xl:block'><Link href={"/sales"}>Sales</Link></div>
        </div>
        <div className='flex items-center gap-2 px-2 py-3'>
          <ListChecks />
        <div className='hidden sm:hidden md:block lg:block xl:block'><Link href={"/items"}>Items</Link></div>
        </div>


    
    </div>
    //<div className='flex flex-col gap-10 w-[300px] min-w-[300px] border-r min-h-full p-4 h-screen'>sidebar</div>
  )
}
 
export default Sidebar
