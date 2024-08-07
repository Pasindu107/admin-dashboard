import { BarChart, HomeIcon, ListChecks } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {sidebarItems} from "@/utils/properties"
import { usePathname  } from 'next/navigation'

const MobileSidebar = () => {
  const router = useRouter()
  const pathname  = usePathname()
  const [activeLink, setActiveLink] = useState(pathname);

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);


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
                  activeLink === href ? "bg-indigo-400 text-white hover:bg-indigo-400" : ""
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


    </div>
  )
}

export default MobileSidebar
