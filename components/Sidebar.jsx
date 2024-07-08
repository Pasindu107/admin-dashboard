'use client'
//import { BarChart, HomeIcon, ListChecks, Upload, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname  } from 'next/navigation'
import { useEffect, useState } from 'react'
import {sidebarItems} from "@/utils/properties"


const Sidebar = () => {
  const pathname  = usePathname()
  const [activeLink, setActiveLink] = useState(pathname);

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  //console.log('Current Path:', pathname);

  return (    
    <div className='relative flex-col hidden sm:hidden md:block lg:block xl:block w-[250px] md:max-w-[235px] lg:max-w-[250px] xl:max-w-[300px] rounded-lg min-h-full p-4 bg-white'>
        <div className='text-[25px] text-gray-400 min-h-[100px] p-2'>
          ADMIN PANEL
        </div>
        <ul className="sidebar">
        {sidebarItems.map(({ name, href, icon: Icon }) => (
          <li className="sidebar__item mb-2" key={name}>
            <Link href={href} passHref>
              <div
                className={`flex items-center p-3 transition-colors duration-200 rounded-lg text-sm  cursor-pointer ${
                  activeLink === href ? "bg-indigo-500 text-white" : "hover:bg-indigo-100 text-gray-600"
                }`}
                onClick={() => handleLinkClick(href)}
              >
                <span className="mr-4">
                  <Icon className='w-5 h-5' />
                </span>
                <span className="sidebar__name">{name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      

        
          {/* <button  
            type="button"
            onClick={() => router.push('/')}
            className={`w-full gap-4 py-3 my-3 bg-slate-50 hover:bg-indigo-400 hover:text-white rounded-lg  p-2 flex items-center justify-between cursor-pointer'
             `}>
            <HomeIcon className='w-1/12' />
            <div className=' w-11/12  text-left'>    
              Dashboard
            </div>
               
          </button>           */}
        
        {/* <Link href={"/sales"}>
        <button
          className={`w-full gap-4 py-3 my-3 bg-gray-50 hover:bg-blue-950 hover:text-white rounded-lg  p-2 flex items-center justify-between cursor-pointer 
          `}
          >

            <BarChart className='w-1/12' /> 
            <div className=' w-11/12  text-left'>
              Sales
            </div>  
          </button> 
        </Link> */}


        {/* <Link href={"/items"}>
          <button className={`w-full gap-4 py-3 my-3 bg-slate-50 hover:bg-indigo-400 hover:text-white rounded-lg  p-2 flex items-center justify-between cursor-pointer
          `}
          >
            <ListChecks className='w-1/12' /> 
            <div className=' w-11/12  text-left'>
              Items
            </div>  
          </button> 
        </Link>
        <Link href={"/supplier"}>
          <button className={`w-full gap-4 py-3 my-3 bg-slate-50 hover:bg-indigo-400 hover:text-white rounded-lg  p-2 flex items-center justify-between cursor-pointer
          `}
          >
            <Users className='w-1/12' /> 
            <div className=' w-11/12  text-left'>
              Supplier
            </div>  
          </button> 
        </Link>    
        <Link href={"/uploadpurchase"}>
          <button className={`w-full gap-4 py-3 my-3 bg-slate-50 hover:bg-indigo-400 hover:text-white rounded-lg  p-2 flex items-center justify-between cursor-pointer
          `}
          >
            <Upload className='w-1/12' /> 
            <div className=' w-11/12  text-left'>
              Upload Purchase
            </div>  
          </button> 
        </Link> 
        <Link href={"/reimsummery"}>
          <button className={`w-full gap-4 py-3 my-3 bg-slate-50 hover:bg-indigo-400 hover:text-white rounded-lg  p-2 flex items-center justify-between cursor-pointer
          `}
          >
            <Upload className='w-1/12' /> 
            <div className=' w-11/12 text-left'>
                Reimbursement
            </div>  
          </button> 
        </Link>  */}
        {/* <div>
        <SButton href= '/'>
            Dashboard
        </SButton>
        </div> */}









    </div>

    //<div className='flex flex-col gap-10 w-[300px] min-w-[300px] border-r min-h-full p-4 h-screen'>sidebar</div>
  )
}
 
export default Sidebar 
