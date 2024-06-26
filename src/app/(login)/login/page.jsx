// "use client"; // Add this directive at the top

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// const Page = () => {
//   const router = useRouter();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!email || !password) {
//       setError('Please enter both email and password');
//       return;
//     }
  
//     try {
//       const loginData = {
//         username: email,
//         userpassword: password

//       };
  
//       const response = await fetch('http://localhost:8000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(loginData),
//       });
  
//       if (!response.ok) {
//         let errorMessage = 'Login failed. Please check your credentials.';
//         if (response.status === 401) {
//           errorMessage = 'Unauthorized. Please check your credentials.';
//         } else {
//           const errorData = await response.json();
//           errorMessage = `HTTP error! status: ${response.status}, message: ${errorData.message}`;
//         }
//         throw new Error(errorMessage);
//       }
  
//       const result = await response.json();
//       if (result.Success) {
//         console.log('Login successful');
//         localStorage.setItem('token', result.Token);
//         // Redirect or navigate to another page upon successful login if needed
//         router.push('/');
//         console.log(result.Token);
//       } else {
//         setError('Login failed. Please check your credentials.');
//       }
//     } catch (error) {
//       console.error('An error occurred. Please try again.', error);
//       setError('An error occurred. Please try again.');
//     }
//   };
  

//   return (
//     <div className='grid grid-cols-5'>
//       <div></div>
//       <div className='col-span-3'>    
//         <div className=' bg-white shadow-lg rounded-lg p-4'>
//           <div className='w-full p-4'>    
//             <input 
//               type="text" 
//               placeholder="Username" 
//               className="border rounded-lg p-3"
//               value={email}
//               onChange={handleEmail} 
//             />
//           </div> 

//           <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 p-4'>
//             <input 
//               type="password" 
//               placeholder="Password" 
//               className="col-span-2 lg:col-span-4 border rounded-lg p-3"
//               value={password}
//               onChange={handlePassword}
//             />
//           </div>

//           {error && (
//             <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 p-4'>
//               <div className="col-span-2 lg:col-span-4 text-red-500">{error}</div>
//             </div>
//           )}

//           <div className='grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8 p-4 gap-4'>
//             <form onSubmit={handleSubmit} className='flex flex-col gap-4 col-span-2 lg:col-span-4'>
//               <button type="submit" className="rounded bg-indigo-400 px-4 py-2 hover:bg-indigo-500 text-white">
//                 Login
//               </button>
//               <Link href={'/register'} >
//               <div className="border rounded-lg p-2 text-center hover:bg-slate-100">
//                 Register
//             </div>
//             </Link>
//             </form>       
//           </div>
//         </div>
//       </div>
//       <div></div>
//     </div>
//   );
// };

// export default Page;

import Login from '@/components/Login'
import React from 'react'

const page = () => {
  return (
    <div>
      <Login />
    </div>
  )
}

export default page

