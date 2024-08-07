import React, { useEffect, useState } from 'react'

import { dashData } from '@/src/app/api/dashData';
import { useScatterChartProps } from '@mui/x-charts/internals';



const DashMonthlyIncome = () => {
    const [mothlyIncome, setMonthlyIncome] = useState(0)
    const [suppliers, setSuppliers] = useState(0)
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
        async function fetchData() {
            try {
                const response = await dashData();
                
                if (response && response.length > 0) {
                    setData(response);
                    // Access the first item in the array
                    const firstItem = response[0];
                    if (firstItem.MonthlyIncome !== undefined || firstItem.RegSuppliers !== undefined)
                   {
                        setMonthlyIncome(firstItem.MonthlyIncome);
                        setSuppliers(firstItem.RegSuppliers)
    
                        
                    } else {
                        console.error("MonthlyIncome not found in the first item of response:", firstItem);
                        setError("Failed to fetch data: PendingPayment not found in response");
                    }
                } else {
                    console.error("Response does not contain valid data:", response);
                    setError("Failed to fetch data: Data not found in response");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data");
            }
        }
        
    },[]);


  return ( 
    <div className='flex flex-col bg-white rounded-lg p-4 gap-4 h-full w-full'>
        <div className='divide-y-2'>
                <div className=" text-gray-500 text-center text-xl pt-4 lg:pb-8"> 
                    Monthly Income
                </div>
        </div>

        <div className='text-3xl text-center p-4 mx-10 text-indigo-700 font-mono bg-indigo-50 rounded-lg object-center'>
            Rs. {mothlyIncome}.00
        </div>
        <div className=' gap-4 text-center text-gray-400 p-4'>
                Registered Suppliers : {suppliers}                
        </div>

    </div>
  )
}

export default DashMonthlyIncome
