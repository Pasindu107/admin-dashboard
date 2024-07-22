"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignupComboBox } from './SignupComboBox';

const Signup = () => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(null);
  const [signupData, setSignupData] = useState({
    userName: '',
    userPassword: '',
    Email: '',
    supCode: '',
    supVarify: 0
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
    // console.log("Selected Value:", value); // Handle the selected value as needed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!signupData.userName || !signupData.userPassword || !signupData.Email || !signupData.supCode) {
      setError('Please enter your details');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/login/reguser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
  
      const result = await response.json();
      if (result.Success) {
        console.log('Signup successful');
        // Redirect or navigate to another page upon successful signup if needed
        router.push('/login');
      } else {
        setError('Signup failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred. Please try again.', error);
      setError('An error occurred. Please try again.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className='shadow-lg bg-white rounded-lg w-[500px] h-[600px] p-4'>   
      <div className='p-4 space-y-4 h-full'>
        <div className='text-3xl font-bold text-gray-500'>Signup</div>
        <div className='w-full pt-10'>    
          <input 
            id='username'
            name='userName'
            type="text" 
            placeholder="Username" 
            className="border rounded-lg p-3 w-full focus:outline-indigo-500"
            value={signupData.userName}
            onChange={handleChange} 
          />
        </div> 

        <div className='w-full'>    
          <input 
            id='email'
            name='Email'
            type="text" 
            placeholder="Email" 
            className="border rounded-lg p-3 w-full focus:outline-indigo-500"
            value={signupData.Email}
            onChange={handleChange} 
          />
        </div> 

        <div className='w-full'>
          <input 
            id='supCode'
            name='supCode'
            type="text" 
            placeholder="Supplier Code" 
            className="border rounded-lg p-3 w-full focus:outline-indigo-500"
            value={signupData.supCode}
            onChange={handleChange}
          />
        </div>         

        <div className='w-full'>
          <input 
            id='password'
            name='userPassword'
            type="password" 
            placeholder="Set Password" 
            className="border rounded-lg p-3 w-full focus:outline-indigo-500"
            value={signupData.userPassword}
            onChange={handleChange}
          />
        </div>

        <div className=' pb-16'>
          <SignupComboBox onValueChange={handleValueChange} />
        </div>

        {error && (
          <div className="col-span-2 lg:col-span-4 text-red-500 text-sm">
            {error}
          </div>
        )}
        
        <div className=''>
          <div className='flex flex-col gap-2 col-span-2 lg:col-span-4 '>
            <button type="submit" className="rounded bg-indigo-400 px-4 py-2 hover:bg-indigo-500 text-white">
              Signup
            </button>
          </div>       
        </div>
      </div>
    </form>
  );
};

export default Signup;
