'use client'

import { appPackageData } from '@/src/app/api/appPackageData';
import { Gem, Heart, Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { IoIosCheckmarkCircle } from "react-icons/io";

const Packages = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
        try {
            const response = await appPackageData();
            //console.log('API response:', response); // Log the entire response
            
            // Directly use the array response
            if (Array.isArray(response)) {
                setData(response);
            } else {
                console.error("Response does not contain valid data:", response);
                setError("Failed to fetch data: Data not found in response");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data");
        }
    }

    fetchData();
  }, []);

  // Filter data based on App_Version_Id
  const packageAData = data.filter(item => item.App_Version_Id === 1);
  const packageBData = data.filter(item => item.App_Version_Id === 2);
  const packageCData = data.filter(item => item.App_Version_Id === 3);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-14 h-full'>
      <div className='flex flex-col h-full transition ease-in-out delay-100 hover:-translate-y-1  duration-500 '>  
        <div className='flex justify-center z-0'>
          <div className='border-8 border-indigo-50 flex justify-center p-4 w-28 h-28 bg-indigo-500 text-white rounded-full -mb-12'>
            <Star className='size-16 ' />
      
          </div>
        </div>
        <div className='bg-white bg-transparent rounded-3xl p-4 text-center h-full'>
        <div className='text-center text-indigo-500 p-2 divide-y mt-12 text-xl'>
            Package A
          </div>
          <div className='flex flex-col text-gray-500 p-2 mt-12'>
            {error && <div className="text-red-500">{error}</div>}
            {packageAData.length > 0 ? (
              packageAData.map((item, index) => (
                item.Is_Active && (
                  <div key={index} className="space-y-2 p-4 pb-6 text-gray-600">
                    <p className='flex gap-4'>
                      <IoIosCheckmarkCircle className='text-emerald-500 size-5' />
                      {item.Descript}
                    </p>
                  </div>
                )
              ))
            ) : (
              <div className="text-gray-500">No packages available</div>
            )}
          </div>             
        </div>
      </div>        

      <div className='flex flex-col h-full transition ease-in-out delay-100 hover:-translate-y-1 duration-500 '>  
        <div className='flex justify-center z-0'>
          <div className='border-8 border-indigo-50 flex justify-center p-4 w-28 h-28 bg-indigo-500 text-white rounded-full -mb-12'>
            <Heart className='size-16 ' />
          </div>
        </div>
        <div className='bg-white bg-transparent rounded-3xl p-4 text-center h-full'>
          <div className='text-center text-indigo-500 p-2 divide-y mt-12 text-xl'>
            Package B
          </div>
          <div className='text-center text-gray-500 p-2 mt-12'>
            {packageBData.length > 0 ? (
              packageBData.map((item, index) => (
                item.Is_Active && (
                  <div key={index} className="space-y-2 p-4 pb-6 text-gray-600">
                    <p className='flex justify-start gap-4'>
                      <IoIosCheckmarkCircle className='text-emerald-500 size-5' />
                      {item.Descript}
                    </p>
                  </div>
                )
              ))
            ) : (
              <div className="text-gray-500">No packages available</div>
            )}
          </div>
        </div>
      </div>   

      <div className='flex flex-col h-full transition ease-in-out delay-100 hover:-translate-y-1 duration-500 '>  
        <div className='flex justify-center z-0'>
          <div className='border-8 border-indigo-50 flex justify-center p-4 w-28 h-28 bg-indigo-500 text-white rounded-full -mb-12'>
            <Gem className='size-16' />
          </div>
        </div>
        <div className='bg-white bg-transparent rounded-3xl p-4 text-center h-full'>
          <div className='text-center text-indigo-500 p-2 divide-y mt-12 text-xl'>
            Package C
          </div>
          <div className='text-center text-gray-500 p-2 mt-12'>
            {packageCData.length > 0 ? (
              packageCData.map((item, index) => (
                item.Is_Active && (
                  <div key={index} className="space-y-2 p-4 pb-6 text-gray-600">
                    <p className='flex justify-start gap-4'>
                      <IoIosCheckmarkCircle className='text-emerald-500 size-5' />
                      {item.Descript}
                    </p>
                  </div>
                )
              ))
            ) : (
              <div className="text-gray-500">No packages available</div>
            )}
          </div>
        </div>
      </div>   
    </div>
  )
}

export default Packages
