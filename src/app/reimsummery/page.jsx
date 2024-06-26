import ReimFileUpload from '@/components/ReimFileUpload'
import ReimTable from '@/components/ReimTable'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-4'>
      <div>
        <ReimFileUpload />
      </div>
      <div>
        <ReimTable />
      </div>
      
      
    </div>
  )
}

export default page
