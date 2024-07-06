"use client";

import React, { useEffect, useState } from "react";
import {fetchData} from "@/src/app/api/itemReg"


export default function ItemTable() {
  const [data, setData] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchDataAndSetData = async () => {
          const newData = await fetchData();
          setData(newData);
        };
        fetchDataAndSetData();
      }, []);
    


  return (
    
    <div className="overflow-auto rounded-[10px] bg-green-300">
        <div className=" bg-red-300">
            <table className="">
                <thead className=" bg-indigo-500 text-white ">
                <tr>
                    {data.length > 0 &&
                    Object.keys(data[0]).map((key, index) => (
                        <th key={index} className="p-3">
                        {key}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="divide-y">
                {data.map((item, rowIndex) => (
                    <tr key={rowIndex} className="text-sm">
                    {Object.keys(item).map((fieldName, cellIndex) => (
                        <td key={cellIndex}>
                        {item[fieldName]}
                        </td>
                    ))}
                    </tr>
                ))}
                </tbody>        
            </table>      

        </div>

    </div>
  );
}