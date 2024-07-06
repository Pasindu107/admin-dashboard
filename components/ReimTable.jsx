'use client';

import React, { useEffect, useState } from "react";
import { reimData } from "@/src/app/api/reimData";

const ReimTable = () => {
    const [data, setData] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchDataAndSetData = async () => {
            try {
                const newData = await reimData();
                setData(newData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataAndSetData();
    }, []);

    return (
        <div className='mx-auto'>
            <div className=' gap-4'>
                <div className="overflow-auto shadow-lg rounded-lg">
                    <div className="min-w-full">
                        <table className='min-w-full bg-white'>
                            <thead className="bg-indigo-400 text-white ">
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

            </div>
        </div>
    );
}

export default ReimTable;
