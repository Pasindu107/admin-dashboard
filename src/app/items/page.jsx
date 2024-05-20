'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import React, { useEffect, useState } from 'react';

// Function to fetch data from the API
const fetchData = async () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTYwMTMyOTQsImV4cCI6MzE3MjYwNDU1Njk0fQ.oqjRfBHwna323gz1bh00niCpcA0efJMNe-NMQ50m0CQ";
    try {
        const fieldData = {
            method: "GET",
            headers: { "Content-Type": "application/json" , 'access-token': token},
            body: JSON.stringify()
          };
        const response = await fetch(
            "http://localhost:8000/item/outofstock?supCode=023", fieldData
        );
        const data = await response.json();
        console.log(data.Data);
        return data.Data;
        
    } catch (error) {
        console.error(error);
        return [];
    } 
};

// Component
export default function Data() {
    const [data, setData] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchDataAndSetData = async () => {
            const newData = await fetchData();
            setData(newData);
        };
        fetchDataAndSetData();
    }, []);

    // Render fetched data in a table
    return (
        <div className='p-4'>
          <div className='w-full m-auto p-4 rounded-lg bg-white overflow-y-auto'>
            <div className='bg-purple-200 my-3 pl-4  p-4 grid md:grid-cols-3 sm:grid-cols-2 items-center border border-purple-200 rounded-lg '>
                <span>Item Code</span>
                <span className='sm:text-left text-right'>Sold Date</span>
                <span className='hidden md:grid'>Item Name</span>
            </div>
          <ul>
          {data.map((item, index) => (
                        <li key={index} className='bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-3 sm:grid-cols-2  items-center justify-between cursor-pointer'>
                            <p className='pl-4 text-gray-600 sm:text-left text-right'>{item.Item_Code}</p>
                            <p className='hidden md:flex'>{item.SoldDate}</p>
                            <p>{item.ItemName}</p>
                        </li>
                    ))}
          </ul>

          </div>
   
          {/* <Table>
  <TableCaption></TableCaption>
  <TableHeader>
    <TableRow classname="grid grid-cols-3 gap-4 content-start">
      <TableHead className="w-[100px]">Item Code</TableHead>
      <TableHead className="justify-center">Sold Date</TableHead>      
      <TableHead className="text-right">Item Name</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
  {data.map((item, index) => (
    <TableRow key={index}>
      <TableCell className="font-medium">{item.Item_Code}</TableCell>
      <TableCell>{item.SoldDate}</TableCell>
      <TableCell className="text-right">{item.ItemName}</TableCell>
    </TableRow>
      ))}
  </TableBody>
</Table> */}




















         
            {/* <table>
                <thead className='flex p-4'>
                    <tr className='flex flex-row'>
                        <th>Item Code</th>
                        <th>Sold Date</th>
                        <th>Item Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Item_Code}</td>
                            <td>{item.SoldDate}</td>
                            <td>{item.ItemName}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
}