
'use client'

import React, { useEffect, useState } from 'react'

const ReimDatePicker = ({onDateChange}) => {
    const [date, setDate] = useState('')  // Initialize with an empty string

    useEffect(() => {
        if (date) {
            onDateChange(date) // Call the callback with the selected date
        }
    }, [date, onDateChange])

    const handleChange = (event) => {
        setDate(event.target.value) // Update state with the new value
    }

    return (
        <div className=''>
            <input 
                type='date'
                value={date}
                onChange={handleChange} 
                className=' rounded-lg p-2 w-full text-sm cursor-pointer'
            />
        </div>
    )
}

export default ReimDatePicker
