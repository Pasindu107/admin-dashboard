'use client';

import React, { useEffect, useState } from "react";
import { reimData } from "@/src/app/api/reimData";
// import * as XLSX from 'xlsx';
import { ArrowDownToLine } from "lucide-react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

    // const downloadExcel = () => {
    //     // Get the table element
    //     const table = document.getElementById('ReimT01'); // Replace with your table ID
    //     const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet JS" });
      
    //     // Generate Excel file and trigger download
    //     XLSX.writeFile(wb, 'Reimbursemnet-Table.xlsx');
    //   };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const heading = 'Reimbursemenet Table'
    
        // Add the heading text to the PDF
        doc.text(heading, 14, 16);
    
        // Get the table element
        const table = document.getElementById('ReimT01'); // Replace with your table ID
    
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
            <div className='gap-4 space-y-2'>
                
                    <div className="min-w-full grid grid-col bg-white overflow-auto rounded-lg">
                        <div className="flex justify-between py-2 ">
                            <div className="p-2 ml-2 text-gray-500">
                                Reimbursement Table
                            </div>
                            <div className="content-center mr-2">
                            <button onClick={downloadPDF} className="flex gap-2 py-2 px-5 bg-indigo-500 rounded-2xl text-white hover:bg-indigo-600 transition ease-in-out hover:-translate-y-px hover:scale-105 duration-300">
                                <ArrowDownToLine className="w-4 h-4" />
                               <div className="text-sm">
                                     Download
                                </div> 
                            </button>
                            </div>
                        </div>

                        <table className='min-w-full bg-white' id="ReimT01">
                            <thead className="bg-indigo-500 text-white text-sm px-4">
                                <tr className="">
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
                                    <tr key={rowIndex} className="text-center items-center text-gray-600">
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

export default ReimTable;
