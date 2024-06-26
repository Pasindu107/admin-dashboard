"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { PurchComboBox } from '@/components/PurchComboBox';

export default function PurchFileUpload() {
  const [file, setFile] = useState(null);
  const [poNumber, setPoNumber] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedSupCode, setSelectedSupCode] = useState('');
  const [selectedSupName, setSelectedSupName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePoNumberChange = (e) => {
    setPoNumber(e.target.value);
  };
  
  const handleEmailSelect = (email) => {
    setSelectedEmail(email); // Update selected email
  };

  const handlesupCodeSelect = (supCode) => {
    setSelectedSupCode(supCode);
  };

  const handlesupNameSelect = (supName) => {
    setSelectedSupName(supName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !poNumber|| !selectedEmail) {
      alert("Please select a file and enter a PO number.");
      return;
    }

    setIsLoading(true);
    setMessage('');

    // console.log("File selected:", file);
    // console.log("PO Number:", poNumber);
    // console.log("selectedSupCode:", selectedSupCode);
    // console.log("selectedSupName:", selectedSupName);

    // Extract the original file extension
    const fileExtension = file.name.split('.').pop();
    const newFileName = `${poNumber}.${fileExtension}`;

    const formData = new FormData();
    formData.append('file', file, newFileName);
    formData.append('email', selectedEmail);

    console.log("FormData created with file and PO number.");

    try {
      const response = await fetch('/api/supfileup', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from server:", result);

      const purchData = {
        supName: selectedSupName,
        supCode: selectedSupCode,
        PONo: poNumber,
        fileName: newFileName 
      };

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTYwMTMyOTQsImV4cCI6MzE3MjYwNDU1Njk0fQ.oqjRfBHwna323gz1bh00niCpcA0efJMNe-NMQ50m0CQ";

      const response2 = await fetch('http://localhost:8000/grn/postpurchupload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token
        },
        body: JSON.stringify(purchData),
      });

      if (!response2.ok) {
        const errorData = await response2.json();
        throw new Error(`HTTP error! status: ${response2.status}, message: ${errorData.message}`);
      }

      const result2 = await response2.json();
      if (result2.Success) {
        setMessage('Done!');
      } else {
        setMessage(result2.Message);
      }
    } catch (error) {
      console.error('An error occurred. Please try again.', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      window.location.reload();

    }






    


  };

  return (
    <div className='grid'>
      <div className='w-full'>
        <div className='grid bg-white shadow-lg rounded-lg p-4'>
          <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 p-4'>
            <div className=' p-2 text-sm'>Supplier</div>
            <div className='col-span-2 lg:col-span-4'><PurchComboBox onEmailSelect={handleEmailSelect} onSupCodeSelect={handlesupCodeSelect} onSupNameSelect={handlesupNameSelect} /></div>
          </div> 

          <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 p-4'>
            <div className='content-center p-2 text-sm'>
              PO Number
            </div>
            <Input 
              type="text" 
              placeholder="Enter PO Number" 
              className="col-span-2 lg:col-span-4"
              value={poNumber}
              onChange={handlePoNumberChange} 
            />
          </div>

          <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 p-4'>
            <div className='p-2 text-sm'>Upload File</div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4 col-span-2 lg:col-span-4'>
              <Input type="file" className='' onChange={handleFileChange} />
              <button type="submit" className={`rounded bg-indigo-400 px-4 py-2 hover:bg-indigo-500 text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {isLoading ? 'Uploading...' : 'Submit'}
              </button>
              </form>
              {message}
          </div>
        </div>
      </div>
    </div>
  );    
}
