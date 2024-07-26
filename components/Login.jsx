"use client"; // Add this directive at the top

import React, { useContext, useState  } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
// import { AuthContext } from '@/context/AuthContext';

const Login = () => {
  const router = useRouter();
  // const { setUname, setEmail } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);


  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userName || !password) {
      setError('Please enter Email and Password');
      return;
    }
  
    try {
      const loginData = {
        username: userName,
        userpassword: password

      };
  
      const response = await fetch('http://localhost:8000/dashlogin', {
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
        // localStorage.setItem('SupCode', result.SupCode)

        localStorage.setItem('userName', userName)
        localStorage.setItem('Email', result.Email)
        localStorage.setItem('UserRole', result.UserRole)




        // Redirect or navigate to another page upon successful login if needed
        router.push('/');

        //console.log(result.Token);
        //console.log(result.SupCode);




      } else {
        setError('Login failed. Please check your credentials.');
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
      <form onSubmit={handleSubmit} className='shadow-lg bg-white rounded-lg w-[400px] h-[500px] p-4'>   
        <div  className='flex flex-col p-4 space-y-4 h-full'>
          <div className='text-3xl font-bold text-gray-500'>Login</div>
          <div className='w-full pt-10'>    
            <input 
              type="text" 
              placeholder="Username" 
              className="border rounded-lg p-3 w-full focus:outline-indigo-500"
              value={userName}
              onChange={handleUserName} 
            />
          </div> 

          <div className='w-full relative'>
            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Password" 
              className="border rounded-lg p-3 w-full focus:outline-indigo-500"
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

          {error && (
            <div className=''>
              <div className="col-span-2 lg:col-span-4 text-red-500 text-sm">{error}</div>
            </div>
          )}

          {/* <div className='text-sm text-right text-gray-400 italic pt-16 hover:text-gray-500 hover:cursor-pointer' >
            forgot password?
          </div> */}
          
          <div className='h-full pt-16 '>
            <div className='flex flex-col gap-2 col-span-2 lg:col-span-4 '>
              <button type="submit" className="rounded bg-indigo-400 px-4 py-2 hover:bg-indigo-500 text-white">
                Login
              </button>
                {/* <Link href={'/signup'} >
                  <div className="border rounded-lg p-2 text-center hover:bg-slate-100">
                    Register
                  </div>
                </Link> */}
            </div>       
          </div>
        </div>
      </form>
  );
};

export default Login;
