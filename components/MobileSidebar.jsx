import { BarChart, HomeIcon, ListChecks } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {sidebarItems} from "@/utils/properties"

const MobileSidebar = () => {
  const router = useRouter()
  const [activeLink, setActiveLink] = useState(router.pathname);

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };


  return (
    <div className='flex flex-col'>
        <div className='flex-none p-4 text-[20px] '>
            MOBILE APP
        </div>
        <ul className="sidebar">
        {sidebarItems.map(({ name, href, icon: Icon }) => (
          <li className="sidebar__item mb-2" key={name}>
            <Link href={href} passHref>
              <div
                className={`flex items-center p-3 transition-colors duration-200 rounded-lg hover:bg-indigo-400 hover:text-white text-sm cursor-pointer ${
                  activeLink === href ? "bg-indigo-500 text-white hover:bg-indigo-500" : ""
                }`}
                onClick={() => handleLinkClick(href)}
              >
                <span className="mr-4">
                  <Icon className='w-4 h-4' />
                </span>
                <span className="sidebar__name">{name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>











         {/* <Link href={"/"}>
          <div className='flex-none gap-4 ml-4 hover:bg-gray-100 hover:text-black rounded-lg my-3 p-2 flex items-center cursor-pointer'>
            <HomeIcon />
            <div className=''>
              Home
            </div>
               
          </div>          
        </Link>
        <Link href={"/sales"}>
          <div className='flex-none gap-4 px-2 py-2 ml-4 hover:bg-gray-100 hover:text-black rounded-lg my-3 p-2 flex items-center cursor-pointer'>
            <BarChart /> 
            <div className=''>
              Sales
            </div>  
          </div> 
        </Link>
        <Link href={"/items"}>
          <div className='flex-none gap-4 px-2 py-2 ml-4 grow hover:bg-gray-100 hover:text-black rounded-lg my-3 flex items-center cursor-pointer'>
            <ListChecks /> 
            <div className=''>
              Items
            </div>  
          </div> 
        </Link>
        <Link href={"/supplier"}>
          <div className='flex-none gap-4 px-2 py-2 ml-4  hover:bg-gray-100 hover:text-black rounded-lg my-3 p-2 flex items-center grow cursor-pointer'>
            <ListChecks /> 
            <div className=''>
              Supplier
            </div>  
          </div> 
        </Link> 
        <div className='grow'>
            
        </div>
        <Link href={"/login"}>
          <div className='flex-none gap-4 px-2 py-2 ml-4  hover:bg-gray-100 hover:text-black rounded-lg my-3 p-2 flex items-center grow cursor-pointer'>
            <ListChecks /> 
            <div className=''>
              Log Out
            </div>  
          </div> 
        </Link>  */}

    </div>
  )
}

export default MobileSidebar
