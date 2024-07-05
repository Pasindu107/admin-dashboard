import LogOut from '@/components/LogOut'
import ProtectedRoute from '@/components/ProtectRoute'
import React from 'react'

const page = () => {
  return (
    <ProtectedRoute>
    <div>
      Dashboard
      
    </div>
    </ProtectedRoute>
 
  )
}

export default page
