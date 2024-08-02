'use client'

import { AChart } from '@/components/AreaChart'
//import { AChart } from '@/components/AreaChart'
import { BarChart1 } from '@/components/BarChart1'
import { BarChart2 } from '@/components/Barchart2'
import DashPaymentCard from '@/components/DashPaymentCard'
import DashSupRegPercentage from '@/components/DashSupRegPercentage'
import { LineChart1 } from '@/components/LineChart1'
import { PieChart1 } from '@/components/PieChart1'



//import LogOut from '@/components/LogOut'

import ProtectedRoute from '@/components/ProtectRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
    <div className='space-y-2'>
      <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-2'>
        <div className='bg-white rounded-lg p-4'>
          <DashSupRegPercentage />
        </div>
        <div className='bg-white rounded-lg p-4'>
          <DashPaymentCard />
        </div>
        <div className='bg-white rounded-lg p-4'>
          card 3
        </div>
        <div className='bg-white rounded-lg p-4'>
          card 3
        </div>
      </div>


    <div className='grid grid-rows-2 grid-cols-1 lg:grid-cols-3 sm:grid-cols-1 gap-2'>

          <div className=''>
            
            <LineChart1 />
          </div>
          <div className=''>
            <PieChart1 />
          </div> 


    </div>
    </div>




























    </ProtectedRoute>
     
  )
}

export default page
