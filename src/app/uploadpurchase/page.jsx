import React from 'react'

import PurchFileUpload from '@/components/PurchFileUpload'
import PurchUpTable from '@/components/PurchUpTable'
import ProtectedRoute from '@/components/ProtectRoute'

const page = () => {
  return (
    <ProtectedRoute>
    <div className='grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 gap-2'>
        <div className="">
           <PurchFileUpload  />
        </div>
        <div>
          <PurchUpTable />
        </div>                 
    </div>
    </ProtectedRoute>
  )
}

export default page
