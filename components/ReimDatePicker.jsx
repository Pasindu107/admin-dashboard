// "use client"

// import React, { useEffect, useState } from 'react'
// import { format } from "date-fns"
// import { Calendar as CalendarIcon } from "lucide-react"
 
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// const ReimDatePicker = ({ onDateChange }) => {
//     const [date, setDate] = useState()


//     useEffect(() => {
//         if (date) {
//           onDateChange(date) // Call the callback with the selected date
//         }
//       }, [date, onDateChange])
    

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           variant={"outline"}
//           className={cn(
//             "w-[280px] justify-start text-left font-normal",
//             !date && "text-muted-foreground"
//           )}
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? format(date, "PPP") : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           initialFocus

//         />
//       </PopoverContent>
//     </Popover>
//   )
// }

// export default ReimDatePicker

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
                className='border-red-300 rounded-lg p-2 w-full text-sm'
            />
        </div>
    )
}

export default ReimDatePicker
