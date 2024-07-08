'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Items",
    href: "/items",
  },
  {
    name: "Supplier",
    href: "/supplier",
  },
  {
    name: "Upload Purchase",
    href: "/uploadpurchase",
  },
  {
    name: "Reimbursement",
    href: "/reimsummery",
  },
];

const HeaderTitle = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const currentItem = sidebarItems.find(item => item.href === pathname);
    if (currentItem) {
      setActiveLink(currentItem.name);
    } else {
      setActiveLink(''); // Set default value if no matching pathname is found
    }
  }, [pathname]);

  return (
    <div>
      <h1 className='text-lg text-gray-400'>{activeLink}</h1>
    </div>
  )
}

export default HeaderTitle
