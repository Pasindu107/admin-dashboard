import React from 'react'

import PurchFileUpload from '@/components/PurchFileUpload'
import PurchUpTable from '@/components/PurchUpTable'
import ProtectedRoute from '@/components/ProtectRoute'

const page = () => {
  return (
    <ProtectedRoute>
    <div className='grid lg:grid-cols-2 gap-4'>
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
