"use client"; // Add this directive at the top

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginUser } from '@/src/app/api/login'; // Adjust the import path accordingly

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const userData = await loginUser(email, password);
      console.log('Login successful:', userData);
      // Redirect or update the UI as needed
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center py-[200px]">
      <div className="shadow-2xl w-full m-auto sm:max-w-lg p-4 rounded-[10px] flex flex-col">
        <div className="p-4">Login</div>
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '45ch' } }}
          noValidate
          autoComplete="off"
          onSubmit={handleLogin}
        >
          <TextField
            id="outlined-email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="error" style={{ color: 'red' }}>{error}</div>}
          <div className="p-4 flex flex-row gap-4">
            <Button variant="contained" type="submit">Login</Button>
            <Button variant="outlined" href="/register">Register</Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Page;
