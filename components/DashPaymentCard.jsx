'use client'

import { dashData } from '@/src/app/api/dashData';
import React, { useEffect, useState } from 'react';
import { MdPendingActions } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";

const DashSupRegPercentage = () => {
    const [data, setData] = useState(null);
    const [pendingPayment, setPendingPayment] = useState(0);
    const [renewedToday, setRenewedToday] = useState(0);
    const [toBeRenewedToday, setToBeRenewedToday] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await dashData();
                console.log('API response:', response);

                if (response && response.length > 0) {
                    setData(response);
                    // Access the first item in the array
                    const firstItem = response[0];
                    if (firstItem.PendingPayment !== undefined || firstItem.RenewedToday!== undefined || firstItem.ToBeRenewedToday!== undefined )
                   {
                        setPendingPayment(firstItem.PendingPayment);
                        setRenewedToday(firstItem.RenewedToday);
                        setToBeRenewedToday(firstItem.ToBeRenewedToday);
            
                    
                    } else {
                        console.error("PendingPayment not found in the first item of response:", firstItem);
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

        fetchData();
    }, []);

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 gap-2'>
            <div className='flex justify-between bg-white p-4 rounded-xl'>                
                    <div className='flex gap-4 text-sm'>
                        <div className='bg-red-50 p-4 rounded-xl'>
                            <MdPendingActions className='h-7 w-7 text-red-400' />
                        </div>

                        <div className='content-center text-gray-500'>
                            Pending payments
                        </div>                        

                    </div>
                    <p className='bg-red-50 text-red-500 rounded-xl p-3 content-center'>
                        {pendingPayment}
                    </p>
            </div>


            <div className='flex justify-between bg-white p-4 rounded-xl'>
                <div className='flex gap-4 text-sm'>
                    <div className='bg-green-50 p-4 rounded-xl'>
                        <FaRegCalendarCheck  className='h-7 w-7 text-green-400' />
                    </div>

                    <div className='text-sm content-center text-gray-500'>
                        Renewed Today
                    </div>
                </div>

                <p className='bg-green-50 rounded-xl text-green-500 p-3 content-center'>{renewedToday}</p>

            </div>
            
            <div className='flex justify-between bg-white p-4 rounded-xl'>
                <div className='flex gap-4 text-sm'>
                    <div className='bg-blue-50 p-4 rounded-xl'>
                        <RiCalendarScheduleLine  className='h-7 w-7 text-blue-400' />
                    </div>

                    <div className='text-sm content-center text-gray-500'>
                        To Renew Today
                    </div>
                </div>

                <p className='bg-blue-50 rounded-xl text-blue-500 p-3 content-center'>{toBeRenewedToday}</p>

            </div>
        </div>
    );
}

export default DashSupRegPercentage;
