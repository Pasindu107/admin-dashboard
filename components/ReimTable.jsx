'use client'

import React, { useEffect, useState } from "react";
import { reimData } from "@/src/app/api/reimData";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const ReimTable = () => {
    const [data, setData] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchDataAndSetData = async () => {
            const newData = await reimData();
            console.log("Fetched data:", newData); // Debug: Log the fetched data
            setData(newData);
        };
        fetchDataAndSetData();
    }, []);

    return (
        <div className='grid'>
            <div className='w-full'>
                <div className='grid bg-white shadow-lg rounded-lg p-2'>
                    <div>
                        <div className="overflow-auto rounded-[10px]">
                            <div className="w-[100px]">
                                <table className="">
                                    <thead className="bg-blue-950 text-white">
                                        <tr>
                                            {Array.isArray(data) && data.length > 0 &&
                                                Object.keys(data[0]).map((key, index) => (
                                                    <th key={index} className="p-3">
                                                        {key}
                                                    </th>
                                                ))
                                            }
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {Array.isArray(data) && data.map((item, rowIndex) => (
                                            <tr key={rowIndex} className="text-center items-center">
                                                {Object.keys(item).map((fieldName, cellIndex) => (
                                                    <td key={cellIndex} className="text-sm p-3">
                                                        {item[fieldName]}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReimTable;
