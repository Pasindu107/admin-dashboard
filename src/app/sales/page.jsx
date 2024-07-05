'use client'

import ProtectedRoute from '@/components/ProtectRoute';
import Data from '@/components/SupTable';
import React, { useState } from 'react';

const Page = () => {
  const [formData, setFormData] = useState({
    date: '',
    descript: '',
    supCode: '',
    fileName: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reimData = new FormData();
    reimData.append('date', formData.date);
    reimData.append('descript', formData.descript);
    reimData.append('supCode', formData.supCode);
    reimData.append('fileName', formData.fileName);

    try {
      const response = await fetch('http://localhost:8000/reimbursementSummery/postreimsumm', {
        method: 'POST',
        body: reimData,
      });

      const result = await response.json();
      if (result.Success) {
        console.log('Profile updated successfully');
      } else {
        console.log(result.Message);
      }
    } catch (error) {
      console.error('An error occurred. Please try again.', error);
    }
  };

  return (
    <ProtectedRoute>
    
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <input
          type="text"
          name="descript"
          value={formData.descript}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Supplier Code:
        <input
          type="text"
          name="supCode"
          value={formData.supCode}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        File:
        <input
          type="file"
          name="fileName"
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    </ProtectedRoute>
  );
};

export default Page;
