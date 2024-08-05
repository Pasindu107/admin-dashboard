'use client'

import { dashData } from '@/src/app/api/dashData';
import React, { useEffect, useState } from 'react';
import { RadialChart } from './RadialChart';



const DashSupRegPercentage = () => {
    const [data, setData] = useState(null);
    const [percentage, setPercentage] = useState(0);
    const [error, setError] = useState(null);




    useEffect(() => {
        async function fetchData() {
            try {
                const response = await dashData();
                console.log('API response:', response);

                if (response && response.length > 0) {
                    setData(response);

                    // Calculate the percentage
                    const totalSuppliers = response[0].Suppliers;
                    const registeredSuppliers = response[0].RegSuppliers;
                    const regPercentage = (registeredSuppliers / totalSuppliers) * 100;
                    setPercentage(regPercentage.toFixed(2));  // Set percentage with 2 decimal places
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
        <div className='space-y-8'>
            <div className='flex justify-between'>
                <div className='text-sm content-center'>Registered Suppliers</div>
                {error ? (
                    <p>{error}</p>
                ) : data ? (
                    <p className='text-3xl'>{percentage}%</p>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {/* <RadialChart /> */}
 
        </div>
    );
}

export default DashSupRegPercentage;
