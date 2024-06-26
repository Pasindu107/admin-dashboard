'use client'
import { BarChart, HomeIcon, ListChecks, Upload, Users } from 'lucide-react'
import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useState } from 'react'


const Sidebar = ({ updateHeaderText }) => {
  const router = useRouter()
  // const [selectedButton, setSelectedButton] = useState('')
  const [selectedButton, setSelectedButton] = useState(null);
  

  // const handleSidebarButtonClick = (buttonText) => {
  //   // Update header text based on the clicked button
  //   updateHeaderText(buttonText);

  //   // Update the selected button
  //   setSelectedButton(buttonText);
  // };

  const isButtonSelected = (buttonText) => {
    return selectedButton === buttonText;
  };


  return (

    
    <div className='relative flex-col hidden sm:hidden md:block lg:block xl:block w-[250px] md:max-w-[235px] lg:max-w-[250px] xl:max-w-[300px]   border-r min-h-full p-4 bg-white rounded-[10px]'>
        <div className='text-[25px] min-h-[100px] p-4'>
          ADMIN PANEL
        </div>
        <Link href={"/"}>
          <button  
            className={`gap-2 px-2 py-3 bg-gray-50  rounded-lg my-3 p-2 grid  md:grid-cols-4 sm:grid-cols-3  grid-cols-2 items-center justify-between cursor-pointer'
             `}>
            <HomeIcon />
            <div className='' >    
              Dashboard
            </div>
               
          </button>          
        </Link>
        <Link href={"/sales"}>
        <button
          className={`gap-2 px-2 py-3 w-full bg-gray-50  rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer 
          `}
          >

            <BarChart /> 
            <div className=''>
              Sales
            </div>  
          </button> 
        </Link>
        <Link href={"/items"}>
          <button className={`gap-2 px-2 py-3 w-full bg-gray-50  rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3  grid-cols-2 items-center justify-between cursor-pointer
          `}
          >
            <ListChecks /> 
            <div className=''>
              Items
            </div>  
          </button> 
        </Link>
        <Link href={"/supplier"}>
          <button className={`gap-2 px-2 py-3 bg-gray-50 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3  grid-cols-2 items-center justify-between cursor-pointer
          `}
          >
            <Users /> 
            <div className=''>
              Supplier
            </div>  
          </button> 
        </Link>    
        <Link href={"/uploadpurchase"}>
          <button className={`gap-2 px-2 py-3 bg-gray-50 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3  grid-cols-2 items-center justify-between cursor-pointer
          `}
          >
            <Upload /> 
            <div className=''>
              Upload Purchase
            </div>  
          </button> 
        </Link> 
        <Link href={"/reimsummery"}>
          <button className={`gap-2 px-2 py-3 bg-gray-50 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3  grid-cols-2 items-center justify-between cursor-pointer
          `}
          >
            <Upload /> 
            <div className=''>
                Upload Reimbursement
            </div>  
          </button> 
        </Link> 






    </div>

    //<div className='flex flex-col gap-10 w-[300px] min-w-[300px] border-r min-h-full p-4 h-screen'>sidebar</div>
  )
}
 
export default Sidebar 
