"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignupComboBox } from './SignupComboBox';

const Signup = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [message , setMessage] = useState();

  const [error, setError] = useState(null);

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };


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
    setMessage('')

  const signupData = {
          userName: userName,
          userPassword: password,
          Email: email,
          RoleId: selectedValue
    }

  
    if (!signupData.userName || !signupData.userPassword || !signupData.Email || !signupData.RoleId) {
      setError('Please enter your details');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:8000/dashlogin/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
  
      const result = await response.json();
      if (result.Success) {
        console.log('Signup successfull');
        setMessage('Signup successfull')
        // Redirect or navigate to another page upon successful signup if needed
        // router.push('/login');
      } else {
        setError('Signup failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred. Please try again.', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleBack = () => {
    router.back();
  };

  const handleLogin = () => {
    router.push('/login');
  };


  
  return (
    <form onSubmit={handleSubmit} className='shadow-lg bg-white rounded-lg w-[500px] h-[600px] p-4'>   
      <div className='p-4 space-y-4 h-full'>
        <div className='text-3xl font-bold text-gray-400 text-center'>Create User</div>
        <div className='w-full pt-10'>    
          <input 
            id='username'
            name='userName'
            type="text" 
            placeholder="Username" 
            className="border rounded-lg p-3 w-full focus:outline-indigo-500"
            value={userName}
            onChange={handleUserName} 
          />
        </div> 

        <div className='w-full'>    
          <input 
            id='email'
            name='Email'
            type="text" 
            placeholder="Email" 
            className="border rounded-lg p-3 w-full focus:outline-indigo-500"
            value={email}
            onChange={handleEmail} 
          />
        </div> 
        

        <div className='w-full'>
          <input 
            id='password'
            name='userPassword'
            type="password" 
            placeholder="Set Password" 
            className="border rounded-lg p-3 w-full focus:outline-indigo-500"
            value={password}
            onChange={handlePassword}
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

        <div className='text-sm'>{message}</div>
        
        <div className=''>
          <div className='flex flex-col gap-2 col-span-2 lg:col-span-4 '>
            <button type="submit" className="rounded bg-indigo-400 px-4 py-2 hover:bg-indigo-500 text-white">
              Signup
            </button>
          <div className='flex justify-between'>
              <div>
                  <button type="button" onClick={handleBack} className="ml-2 text-sm text-gray-400 hover:text-gray-600">
                    Back
                  </button>
              </div>
              <div>
                  {/* <button type="button" onClick={handleLogin} className="mr-2 text-sm text-gray-400 hover:text-gray-600">
                    Login
                  </button> */}
              </div>
          </div>
        
          </div>       
        </div>
      </div>
    </form>
  );
};

export default Signup;
