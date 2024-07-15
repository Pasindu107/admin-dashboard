import ProtectedRoute from '@/components/ProtectRoute'
import UserProfile from '@/components/UserProfile'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
    <div className='bg-white h-full rounded-lg'>


        <UserProfile />

    </div>
    
    </ProtectedRoute>
  )
}

export default page
