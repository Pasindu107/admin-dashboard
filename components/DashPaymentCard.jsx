'use client'

import { dashData } from '@/src/app/api/dashData';
import React, { useEffect, useState } from 'react';

const DashSupRegPercentage = () => {
    const [data, setData] = useState(null);
    const [pendingPayment, setPendingPayment] = useState(0);
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
                    if (firstItem.PendingPayment !== undefined) {
                        setPendingPayment(firstItem.PendingPayment);
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
        <div className='flex justify-between'>
            {error ? <div>{error}</div> : <div>{pendingPayment}</div>}
        </div>
    );
}

export default DashSupRegPercentage;
