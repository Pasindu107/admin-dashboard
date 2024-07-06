import ProtectedRoute from '@/components/ProtectRoute'
import ReimFileUpload from '@/components/ReimFileUpload'
import ReimTable from '@/components/ReimTable'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      <div>
        <ReimFileUpload />
      </div>
      <div>
        <ReimTable />
      </div>
      
      
    </div>
    </ProtectedRoute>
  )
}

export default page
