import { BarChart1 } from '@/components/BarChart1'
import LogOut from '@/components/LogOut'
import { PieChart1 } from '@/components/PieChart1'
import ProtectedRoute from '@/components/ProtectRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>


    <div className='grid grid-cols-2 gap-4 mt-2 lg:grid-cols-3'>

          <div className=''>
            <BarChart1 />
          </div>
          <div className=''>
            <PieChart1 />
          </div>     
    </div>




























    </ProtectedRoute>
     
  )
}

export default page
