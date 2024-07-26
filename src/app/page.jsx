'use client'

import { AChart } from '@/components/AreaChart'
//import { AChart } from '@/components/AreaChart'
import { BarChart1 } from '@/components/BarChart1'
import { BarChart2 } from '@/components/Barchart2'
import { LineChart1 } from '@/components/LineChart1'
import { PieChart1 } from '@/components/PieChart1'



//import LogOut from '@/components/LogOut'

import ProtectedRoute from '@/components/ProtectRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>


    <div className='grid grid-rows-2 grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 gap-2'>
{/* 
          <div className=''>
            <BarChart1 />
            <BarChart2 />
          </div>
          <div className=''>
            <PieChart1 />
          </div> 
          <div>
            
            <AChart />
          </div>     */}
          <div className=''>
            
            <LineChart1 />
          </div>
          <div className=''>
            <PieChart1 />
          </div> 


    </div>




























    </ProtectedRoute>
     
  )
}

export default page
