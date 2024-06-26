import React from 'react'

import PurchFileUpload from '@/components/PurchFileUpload'
import PurchUpTable from '@/components/PurchUpTable'

const page = () => {
  return (
    <div className='flex flex-col gap-4'>
        <div className="">
           <PurchFileUpload  />
        </div>
        <div>
          <PurchUpTable />
        </div>                 
    </div>
  )
}

export default page
