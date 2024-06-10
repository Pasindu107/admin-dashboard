"use client";

import React, { useEffect, useState } from "react";
import {fetchData} from "@/src/app/api/itemReg"
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";



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


  return (
    <div>
        {/* <ItemSup /> */}
        <div className="overflow-auto rounded-[10px] ">
            <div className="w-[100px] ">
                <table className="">
                    <thead className=" bg-blue-950 text-white ">
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
                        <tr key={rowIndex} className="text-center items-center">
                        {Object.keys(item).map((fieldName, cellIndex) => (
                            <td key={cellIndex} className="text-sm p-3 ">
                            {typeof item[fieldName] === "boolean"
                            ? item[fieldName]
                            ?<AiOutlineCheck />
                            :<AiOutlineClose />

                            : item[fieldName]}
                            </td>
                        ))}
                        </tr>
                    ))}
                    </tbody>        
                </table>      
            </div>
        </div>
        <div >
      

        </div>
    </div>
  );
}
