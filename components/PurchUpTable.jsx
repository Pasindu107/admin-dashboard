'use client';

import React, { useEffect, useState } from "react";
import { purchUpData } from "@/src/app/api/purchUpData";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ArrowDownToLine } from "lucide-react";

const PurchUpTable = () => {
    const [data, setData] = useState([]);
    // const [heading, setHeading] = useState('');

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchDataAndSetData = async () => {
            try {
                const newData = await purchUpData();
                setData(newData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataAndSetData();
    }, []);



    const downloadPDF = () => {
      const doc = new jsPDF();
      const heading = 'Purchase Details Table'
  
      // Add the heading text to the PDF
      doc.text(heading, 14, 16);
  
      // Get the table element
      const table = document.getElementById('PurchUpT01'); // Replace with your table ID
  
      // Get table rows and columns
      const rows = Array.from(table.querySelectorAll('tr')).map(tr =>
        Array.from(tr.querySelectorAll('th, td')).map(td => td.innerText)
      );
  
      // Get table headers
      const headers = rows.shift();
  
      // Add the table to the PDF, with some vertical offset to accommodate the heading
      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 20, // This value may need adjustment based on your heading text
      });
  
      // Save the PDF
      doc.save('table_data.pdf');

    //   setHeading('');
    };

    return (
        <div className='mx-auto'>
            <div className=' gap-4'>

                    <div className="min-w-full grid grid-col bg-white overflow-auto rounded-lg">
                    <div className="flex py-2 justify-between">
                            <div className="p-2 ml-2 text-gray-500">
                                Purchase Details Table
                            </div>
                                {/* <input
                                        type="text"
                                        placeholder="Enter heading"
                                        className=" border rounded-lg p-2"
                                        value={heading}
                                        onChange={(e) => setHeading(e.target.value)}
                                /> */}
                                <div className="content-center mr-2">                            
                                <button onClick={downloadPDF} className="flex gap-2 py-2 px-5 bg-indigo-500 rounded-2xl text-white hover:bg-indigo-600 transition ease-in-out hover:-translate-y-px hover:scale-105 duration-300">
                                    <ArrowDownToLine className="w-4 h-4" />
                                <div className="text-sm">
                                        Download
                                    </div> 
                                </button>

                                </div>
   
                        </div>
                        <table className='min-w-full bg-white' id="PurchUpT01">
                            <thead className="bg-indigo-500 text-white text-sm">
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
    );
}

export default PurchUpTable;
