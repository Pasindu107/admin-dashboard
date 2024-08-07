"use client";

import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { ReimComboBox } from '@/components/ReimComboBox';
import ReimDatePicker from './ReimDatePicker';
import DashAuthPopup from './DashAuthPopup';
import { fetchAuth } from "@/src/app/api/dashAuthApi";

export default function ReimFileUpload() {
  const [file, setFile] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [selectedSupCode, setSelectedSupCode] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const [authData, setAuthData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [openPopup, setOpenPopup] = useState(false);


  useEffect(() => {
    const checkAuthorization = async () => {
        try {
            const roleId = localStorage.getItem('UserRole');
            const profId = 11;
            const data = await fetchAuth(roleId, profId);
            setAuthData(data);
            const isActive = data.some(item => item.Is_Active);
            setIsAuthorized(isActive);
        } catch (error) {
            console.error("Error fetching authorization data:", error);
        }
    };
    checkAuthorization();
}, []);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
  };

  const handlesupCodeSelect = (supCode) => {
    setSelectedSupCode(supCode);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleMessage = () => {
    {message}
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthorized) {
      setPopupMessage('You are not authorized to perform this action!');
      setOpenPopup(true);
      setTimeout(() => {
          setPopupMessage(''); // Clear message after showing
          setOpenPopup(false);
        }, 2000); // Adjust timeout as needed
      return;
  }


    if (!file || !selectedDate || !description || !selectedSupCode || !selectedEmail) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true); // Set loading state to true
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('email', selectedEmail);
    formData.append('supCode', selectedSupCode);
    formData.append('date', selectedDate);
    formData.append('description', description);

    console.log("FormData created with file, email, date, and description.");

    try {
      const response = await fetch('/api/reimfileup', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Response from server:", result);

      const reimData = {
        date: selectedDate,
        descript: description,
        supCode: selectedSupCode,
        fileName: file.name // Use original filename from file input
      };

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhc2luZHUiLCJpYXQiOjE3MTYwMTMyOTQsImV4cCI6MzE3MjYwNDU1Njk0fQ.oqjRfBHwna323gz1bh00niCpcA0efJMNe-NMQ50m0CQ";

      const response2 = await fetch('http://localhost:8000/reimbursementSummery/postreimsumm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': token
        },
        body: JSON.stringify(reimData),
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
    <div className=''>
      <form  onSubmit={handleSubmit} className='w-full'>
        <div className='grid bg-white rounded-lg py-10 px-4'>
          <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 px-4 py-2 gap-2'>
            <div className='p-2 text-sm text-gray-400'>Supplier :</div>
            <div className='col-span-2 lg:col-span-6 md:col-span-3 '>
              <ReimComboBox onSupCodeSelect={handlesupCodeSelect} onEmailSelect={handleEmailSelect} />
            </div>
          </div>

          <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 px-4 py-2 gap-2'>
            <div className='content-center p-2 text-sm text-gray-400'>
                Select Date :
            </div>
            <div className='col-span-3 border rounded-lg cursor-pointer lg:w-1/2'>
                <ReimDatePicker onDateChange={handleDateChange} />
            </div>
          </div>

          <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 px-4 py-2 gap-2'>
            <div className='content-center p-2 text-sm text-gray-400'>
              Description :
            </div>
            <Input 
              type="text" 
              placeholder="Enter Description" 
              className="col-span-2 lg:col-span-6 h-20"
              value={description}
              onChange={handleDescriptionChange} 
            />
          </div>

          <div className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 px-4 py-2 gap-2'>
            <div className='p-2 text-sm text-gray-400'>Upload File :</div>
            <div className='flex flex-col gap-4 col-span-2 lg:col-span-6'>
              <Input type="file" className='' onChange={handleFileChange} />
              <button type="submit" className={`rounded bg-indigo-400 px-4 py-2 hover:bg-indigo-500 text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isLoading ? 'Uploading...' : 'Submit'}
              </button>
            </div>
          </div>

          {message && (
            <div className='text-green-600 p-4'>
              {message}
            </div>
          )}

        </div>
      </form>
      {openPopup && (
                <DashAuthPopup openPopup={openPopup} closePopup={setOpenPopup} data={popupMessage} />
            )}
    </div>
  );
}

