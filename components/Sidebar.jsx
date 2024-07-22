'use client'
//import { BarChart, HomeIcon, ListChecks, Upload, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname  } from 'next/navigation'
import { useEffect, useState } from 'react'
import {sidebarItems} from "@/utils/properties"
// import {fetchAuth} from "@/src/app/api/dashAuthApi"


const Sidebar = () => {
  const pathname  = usePathname()
  const [activeLink, setActiveLink] = useState(pathname);
  // const [roleId, setRoleId] = useState(1);
  // const [profId, setProfId] = useState(1);
  // const [authData, setAuthData] = useState([]);


  useEffect(() => {
    // let RoleId = localStorage.getItem('UserRole')
    // setRoleId(RoleId)
    setActiveLink(pathname);
  }, [pathname]);
   

  // const handleFetchAuth = async () => {
  //   const data = await fetchAuth(roleId, profId);
  //   setAuthData(data);
  // };

  const handleLinkClick = async (href) => {
    // const data = await fetchAuth(roleId, profId);
    // setAuthData(data);
    setActiveLink(href);
    // setProfId(id)
  };


  return (    
    <div className='relative flex-col hidden sm:hidden md:block lg:block xl:block w-[250px] md:max-w-[235px] lg:max-w-[250px] xl:max-w-[300px] rounded-lg min-h-full p-4 bg-white'>
        <div className='text-[25px] text-gray-400 min-h-[100px] p-2'>
          ADMIN PANEL
        </div>
        <ul className="sidebar">
        {sidebarItems.map(({id, name, href, icon: Icon }) => (
          <li className="sidebar__item mb-2" key={name}>
            <Link href={href} passHref>
              <div
                className={`flex items-center p-3 transition-colors duration-200 rounded-lg text-sm  cursor-pointer ${
                  activeLink === href ? "bg-indigo-500 text-white" : "hover:bg-indigo-100 text-gray-600"
                }`}
                onClick={() => handleLinkClick(id, href)}
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

      {/* <div>
        <button onClick={handleFetchAuth} className="p-2 bg-indigo-500 text-white rounded">
          Fetch Auth Data
        </button>
        <h1>Auth Data</h1>
        {authData.length > 0 ? (
          authData.map((item, index) => (
            <div key={index}>
              {item.Is_Active ? (
                <p>IsActive is true. Display this message.</p>
              ) : (
                <p>You are not authorized to perform this action!</p>
              )}
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div> */}

    
    </div>

  )
}
 
export default Sidebar 
