"use client"

import React, { useEffect, useState } from 'react';
import { ProfileComboBox } from "./ProfileComboBox";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';

import { items } from '@/utils/authItems';
import Link from 'next/link';
import Signup from './Signup';
import CreateUser from './CreateUser';


const UserProfile = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (selectedValue) {
      fetchRoleData(selectedValue);
    }
  }, [selectedValue]);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCheckedItems(prev => ({
      ...prev,
      [id]: checked,
    }));
  };

  const handleValueChange = (value) => {
    setMessage('');
    setError('');
    setSelectedValue(value);
  };

  const fetchRoleData = async (roleId) => {
    const token = localStorage.getItem('token');
    // console.log('Fetching role data for roleId:', roleId); // Debugging line
    try {
      const response = await fetch(`http://localhost:8000/userprofile/getuserprof?RoleId=${roleId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "access-token": token },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      // console.log('Fetched role data:', result); // Debugging line

      if (result.success) {
        const roleData = result.data.reduce((acc, { Prof_Id, Is_Active }) => {
          acc[Prof_Id] = Is_Active;
          return acc;
        }, {});

        setCheckedItems(roleData);
      } else {
        console.error('Failed to fetch role data');
      }
    } catch (error) {
      console.error('An error occurred while fetching role data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const profIdList = items.flatMap(item => 
      [item.id, ...item.subitems.map(subitem => subitem.id)]
    );

    const labels = items.flatMap(item => 
      [item.label, ...item.subitems.map(subitem => subitem.label)]
    );

    const isActiveArray = items.flatMap(item => 
      [item.id, ...item.subitems.map(subitem => subitem.id)]
    ).map(id => checkedItems[id] ?? 0);

    const profData = {
      RoleId: selectedValue,
      ProfId: profIdList,
      Descript: labels,
      IsActive: isActiveArray,
    };

    if (!profData.RoleId) {
      setError('Please Select the user role');
      return;
    }

    if (!profData.ProfId || !profData.Descript || !profData.IsActive) {
      setError('Please fill in all details');
      return;
    }

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
        setMessage('Profile Updated!');
      } else {
        setError('Profile update failed!');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
      <div className='grid lg:grid-cols-3 h-full  gap-2 overflow-auto'>
          <div className=''>
              <CreateUser />
          </div>
          <form onSubmit={handleSubmit} className='bg-white bg-opacity-65 rounded-lg lg:col-span-2 h-full'>
              <div className="flex flex-col cols rounded-lg px-6 py-6 h-full">
       
                        <div className="py-2 px-3 bg-indigo-50 rounded-lg text-gray-500  gap-3 mb-4">Details</div>
                        {/* <div className='w-full '>
                          <ProfileComboBox onValueChange={handleValueChange} />
                        </div> */}

                                    
                      <div className="grid lg:grid-cols-2 gap-3 mb-4">
                        <input
                          id="UserRole"
                          name="User Role"
                          type="text"
                          placeholder="User Role"
                          className="shadow-sm rounded-lg p-2 w-full focus:outline-indigo-500"
                          // value={email}
                          // onChange={handleEmail}
                        />
                        <div className='w-full '>
                            <ProfileComboBox onValueChange={handleValueChange} />
                        </div>
                      </div>
                      <div className="grid lg:grid-cols-2 gap-4">
                      {items.map(item => (
                        <div key={item.id} className="space-y-4 p-4 pb-6 bg-white shadow-sm rounded-lg text-gray-600">
                          <div className="flex items-center gap-3">
                            <input
                              type='checkbox'
                              id={item.id}
                              checked={checkedItems[item.id] || false}
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
                                  <input
                                    type='checkbox'
                                    id={subitem.id}
                                    checked={checkedItems[subitem.id] || false}
                                    onChange={handleCheckboxChange}
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

                      <div className='place-content-end h-full pt-2'>
                        <div className='flex justify-between'>
                            <div className=''>
                                <div className='ml-2 text-sm'>{message}</div>
                                <div className='ml-2 text-sm text-red-500'>{error}</div>
                            </div>
                            

                            <button type='submit' className="bg-indigo-500 px-4 py-2 rounded-lg text-sm lg:w-1/5 text-white hover:bg-indigo-600 
                            transition ease-in-out hover:-translate-y-px hover:object-scale-down duration-300">
                                Submit
                            </button>
                        </div>

                      </div>
              </div>
          </form>
      </div>
  );
}

export default UserProfile;