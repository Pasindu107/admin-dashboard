"use client"

import React, { useState } from 'react';
import { ProfileComboBox } from "./ProfileComboBox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';

const items = [
  {
    id: "1",
    label: "Dashboard",
    subitems: [],
  },
  {
    id: "2",
    label: "Items",
    subitems: [],
  },
  {
    id: "3",
    label: "Supplier",
    subitems: [
      { id: "4", label: "Add" },
      { id: "5", label: "Edit" },
      { id: "6", label: "Download Image" },
    ],
  },
  {
    id: "7",
    label: "Purchase Details",
    subitems: [
      { id: "8", label: "Upload File" },
      { id: "9", label: "Download Purchase Table" },
    ],
  },
  {
    id: "10",
    label: "Reimbursement",
    subitems: [
      { id: "11", label: "Upload File" },
      { id: "12", label: "Download Reimbursement Table" },
    ],
  },
];

const UserProfile = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const router = useRouter();

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    // console.log(`Switch changed: id=${id}, checked=${checked}`); // Debugging line
    // console.trace();
    setCheckedItems(prev => {
      const updated = { ...prev, [id]: checked };
      // console.log("Updated checkedItems:", updated); // Debugging line
      return updated;
    });
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
    // console.log("Selected Value:", value); // Handle the selected value as needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');




   // Generate ProfId array
   const profIdList = items.flatMap(item => 
      [item.id, ...item.subitems.map(subitem => subitem.id)]
    )



    // Concatenate labels into a single description string
    const labels = items.flatMap(item => 
      [item.label, ...item.subitems.map(subitem => subitem.label)]
    );

    // Convert checkedItems to an array of values (1 or 0)
    const isActiveArray = items.flatMap(item => 
      [item.id, ...item.subitems.map(subitem => subitem.id)]
    ).map(id => checkedItems[id] ?? 0);
    
    console.log(isActiveArray)


    const profData = {
      RoleId: selectedValue,
      ProfId: profIdList,
      Descript: labels, 
      IsActive: isActiveArray 
    };

    if (!profData.RoleId) {
      setError('Please Select the user role');
      return;
    }

    if (!profData.ProfId || !profData.Descript || !profData.IsActive) {
      setError('Please the Details');
      return;
    }

    // console.log("Submitting data:", profData); // Debugging line

    try {
      const response = await fetch('http://localhost:8000/userprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profData),
      });

      const result = await response.json();
      if (result.Success) {
        console.log('Profile Updated!');
        setMessage('Profile Updated!');
      } else {
        console.error('Profile update failed:', result);
        setError('Profile update failed!');
      }
    } catch (error) {
      console.error('An error occurred. Please try again.', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white rounded-lg p-4 gap-4 h-full grid lg:grid-cols-3 overflow-auto'>
      <div className='space-y-4 h-full col-span-1'>
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
          <ProfileComboBox onValueChange={handleValueChange} />
        </div>

        <div>{message}</div>
        <div>{error}</div>

        <button type='submit' className="bg-indigo-500 px-4 py-2 rounded-lg text-sm w-full mt-16 text-white hover:bg-indigo-600 
        transition ease-in-out hover:-translate-y-px hover:object-scale-down duration-300">
          Submit
        </button>
      </div>

      <div className="col-span-2 border rounded-lg px-6 py-6 ">
        <div className="p-2 bg-indigo-50 rounded-lg text-gray-500">Details</div>
        <div className="grid grid-cols-2">
          <div className="space-y-8 p-4 divide-y">
            {items.map(item => (
              <div key={item.id}>
                <div className="flex items-center gap-3">
                  <input type='checkbox'
                         id={item.id}
                        onChange={handleCheckboxChange}
                        className='accent-indigo-500'
                        
                         />
                  <Label
                    htmlFor={item.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-3"
                  >
                    {item.label}
                  </Label>
                </div>
                {item.subitems.length > 0 && (
                  <div className="space-y-4 ml-6">
                    {item.subitems.map(subitem => (
                      <div key={subitem.id} className="flex items-center gap-3">
                        <input type='checkbox' id={subitem.id} onChange={handleCheckboxChange}
                              className='accent-indigo-500'
                                />
                        <Label
                          htmlFor={subitem.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {subitem.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}

export default UserProfile;
