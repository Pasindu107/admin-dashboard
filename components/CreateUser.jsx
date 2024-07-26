"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignupComboBox } from './SignupComboBox';
import { Eye, EyeOff } from 'lucide-react';

const CreateUser = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [message, setMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);

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

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const signupData = {
      userName: userName,
      userPassword: password,
      Email: email,
      RoleId: selectedValue,
    };

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
        console.log('Signup successful');
        setMessage('Signup successful');

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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-70 bg-transparent rounded-lg p-4 h-full">
      <div className="px-4 py-3 space-y-6 h-full">
        <div className="py-2 px-3 bg-indigo-50 rounded-lg text-gray-500">Create User</div>
        <div className="w-full pt-10">
          <input
            id="username"
            name="userName"
            type="text"
            placeholder="Username"
            className="shadow-sm rounded-lg p-2 w-full focus:outline-indigo-500"
            value={userName}
            onChange={handleUserName}
          />
        </div>

        <div className="w-full">
          <input
            id="email"
            name="Email"
            type="text"
            placeholder="Email"
            className="shadow-sm rounded-lg p-2 w-full focus:outline-indigo-500"
            value={email}
            onChange={handleEmail}
          />
        </div>

        <div className="w-full relative">
          <input
            id="password"
            name="userPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Set Password"
            className="shadow-sm rounded-lg p-2 w-full focus:outline-indigo-500"
            value={password}
            onChange={handlePassword}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {showPassword ? <Eye className='w-4 h-4' /> : <EyeOff className='w-4 h-4' />}
          </button>
        </div>

        <div className="pb-16">
          <SignupComboBox onValueChange={handleValueChange} />
        </div>

        {error && (
          <div className="col-span-2 lg:col-span-4 text-red-500 text-sm">
            {error}
          </div>
        )}

        <div className="text-sm">{message}</div>

        <div className="">
          <div className="flex flex-col gap-2 col-span-2 lg:col-span-4">
            <button type="submit" className="rounded bg-indigo-500 px-4 py-2 hover:bg-indigo-600 text-white">
              Signup
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateUser;
