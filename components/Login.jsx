"use client"; // Add this directive at the top

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError('Please enter Email and Password');
      return;
    }
  
    try {
      const loginData = {
        username: email,
        userpassword: password

      };
  
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        let errorMessage = 'Login failed. Please check your credentials.';
        if (response.status === 401) {
          errorMessage = 'Unauthorized. Please check your credentials.';
        } else {
          const errorData = await response.json();
          errorMessage = `HTTP error! status: ${response.status}, message: ${errorData.message}`;
        }
        throw new Error(errorMessage);
      }
  
      const result = await response.json();
      if (result.Success) {
        console.log('Login successful');
        localStorage.setItem('token', result.Token);
        // Redirect or navigate to another page upon successful login if needed
        router.push('/');
        //console.log(result.Token);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('An error occurred. Please try again.', error);
      setError('An error occurred. Please try again.');
    }
  };
  

  return (
      <form onSubmit={handleSubmit} className='shadow-lg rounded-lg w-[400px] h-[500px] p-4'>   
        <div  className='p-4 space-y-4 h-full'>
          <div className='text-3xl font-bold text-gray-500'>Login</div>
          <div className='w-full pt-10'>    
            <input 
              type="text" 
              placeholder="Username" 
              className="border rounded-lg p-3 w-full focus:outline-indigo-500"
              value={email}
              onChange={handleEmail} 
            />
          </div> 

          <div className='w-full pb-16'>
            <input 
              type="password" 
              placeholder="Password" 
              className="border rounded-lg p-3 w-full focus:outline-indigo-500"
              value={password}
              onChange={handlePassword}
            />
          </div>

          {error && (
            <div className=''>
              <div className="col-span-2 lg:col-span-4 text-red-500 text-sm">{error}</div>
            </div>
          )}
          
          <div className=''>
            <div className='flex flex-col gap-2 col-span-2 lg:col-span-4 '>
              <button type="submit" className="rounded bg-indigo-400 px-4 py-2 hover:bg-indigo-500 text-white">
                Login
              </button>
                <Link href={'/register'} >
                  <div className="border rounded-lg p-2 text-center hover:bg-slate-100">
                    Register
                  </div>
                </Link>
            </div>       
          </div>
        </div>
      </form>
  );
};

export default Login;
