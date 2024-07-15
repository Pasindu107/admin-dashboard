"use client"

import { Checkbox } from "@/components/ui/checkbox"
import React, { useState } from 'react'
import { ProfileComboBox } from "./ProfileComboBox";

const items = [
  {
    id: "Dashboard",
    label: "Dashboard",
    subitems: [
  
    ],
  },
  {
    id: "Items",
    label: "Items",
    subitems: [

    ],
  },
  {
    id: "Supplier",
    label: "Supplier",
    subitems: [
        { id: "Add", label: "Add" },
        { id: "Edit", label: "Edit" },
        { id: "DownloadImage", label: "Download Image" },
        
    ],
  },
  {
    id: "Purchase Details",
    label: "Purchase Details",
    subitems: [
      { id: "UploadPurch", label: "Upload File" },
      { id: "DownloadPurch", label: "Download Purchase Table" },
    ],
  },
  {
    id: "Reimbursement",
    label: "Reimbursement",
    subitems: [
      { id: "UploadReim", label: "Upload File" },
      { id: "DownloadReim", label: "Download Reimbursement Table" },
    ],
  },
];

const UserProfile = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCheckedItems(prev => ({ ...prev, [id]: checked }));
  };

  return (
    <form className='bg-white rounded-lg p-4 gap-4 h-full grid lg:grid-cols-3 overflow-auto'>
      <div className="col-span-1 border rounded-lg px-6 py-6 ">
        <div className="p-2 bg-indigo-50 rounded-lg text-gray-500">Details</div>
        <div className="space-y-8 p-4  divide-y">
          {items.map(item => (
            <div key={item.id}>
              <div className="flex items-center gap-3">
                <Checkbox id={item.id} onChange={handleCheckboxChange} />
                <label
                  htmlFor={item.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-3"
                >
                  {item.label}
                </label>
              </div>
              {item.subitems.length > 0 && (
                <div className="pl-6 space-y-4">
                  {item.subitems.map(subitem => (
                    <div key={subitem.id} className="flex items-center gap-3">
                      <Checkbox id={subitem.id} onChange={handleCheckboxChange} />
                      <label
                        htmlFor={subitem.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {subitem.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* <button className="bg-indigo-500 px-4 py-2 rounded-lg text-white text-sm w-full mt-16 text-white hover:bg-indigo-600 transition ease-in-out hover:-translate-y-px hover:scale-105 duration-300">
            Submit
        </button> */}
      </div>

      <div className=' space-y-4 h-full col-span-1'>
        <div className='w-full'>    
          <input 
            type="text" 
            placeholder="Username" 
            className="border rounded-lg p-3 w-full focus:outline-indigo-500"
          />
        </div> 

        <div className='w-full'>
          <input 
            type="password" 
            placeholder="Password" 
            className="border rounded-lg p-3 w-full focus:outline-indigo-500"
          />
        </div>

        <div className='w-full'>
            <ProfileComboBox />
        </div>
        <div className="">
            
        </div>
        <button className="bg-indigo-500 px-4 py-2 rounded-lg text-sm w-full mt-16 text-white hover:bg-indigo-600 transition ease-in-out hover:-translate-y-px hover:object-scale-down duration-300">
            Submit
        </button>
      </div>

      <div className="">
            
      </div>
    </form>
  );
}

export default UserProfile;
