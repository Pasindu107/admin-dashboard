'use client';

import DataList, { data } from '@/data/data';
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
//   } from "@/components/ui/table"
// import Link from "next/link";

import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col">
        {/* <div className="p-4">
            ITEMS
        </div>
        <div className="w-full m-auto p-4 boder rounded-lg bg-purple-200 overflow-y-auto">
            <div className="my-3 grid md:grid-cols-4 sm:grid-cols-3">
              <span>Name</span>
              <span>Email</span>
              <span>Last Order</span>
              <span>Quantity</span>
            </div>
        </div>
        <ul>
          {data.map((order, id) => (
            <li key={id} className='bg-gray-50 hover:bg-purple-100 rounded-lg my-3 p-2  grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'> 
              <div>
                <p>{order.name.first + ' ' + order.name.last}</p>
              </div>
            </li>
          ))}
        </ul> */}
    <DataList />
    </div>
  )
}

export default page
