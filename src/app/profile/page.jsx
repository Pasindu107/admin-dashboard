import ProtectedRoute from '@/components/ProtectRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
    <div className='w-full bg-white h-full rounded-lg'>
      Profile
    </div>
    </ProtectedRoute>
  )
}

export default page
