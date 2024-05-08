import { AlignJustify } from 'lucide-react'
import React from 'react'
import Sidebar from './Sidebar'

const SidebarButton = ({ onClick }) => {
  return (
    <button className='block sm:inline md:hidden lg:hidden xl:hidden' onClick={onClick}>
      <AlignJustify />


      
    </button>
  )
}

export default SidebarButton
