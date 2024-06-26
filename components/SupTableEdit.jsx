'use client'

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from 'lucide-react'
import { IoPersonAddOutline } from "react-icons/io5";


import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';


const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: -8,
    top: 20,

    padding: '0 4px',
  },
}));




const SupTableEdit = (props) => {
    const { email, SupCode, ResetRequest } = props; 


      // State to manage form inputs
  const [formData, setFormData] = useState({
    userName: '',
    userPassword: '',
    supCode: SupCode ? SupCode.trim() : '',
    supVarify: !!SupCode && SupCode.trim() !== '' ? (1): (0),
    Email: email || '',
  });
  const [message, setMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Validate email format
const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};


    try {
      const response = await fetch('http://localhost:8000/login/reguser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.Success) {
        setMessage('Profile updated successfully');
        setDialogOpen(false); // Close the dialog on successful submission
        window.location.reload(); // Reload the page
      } else {
        setMessage(result.Message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };


  return (
    <div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>

        <Button variant="secondary" className={` rounded-full  ${SupCode && SupCode.trim() !== '' ? "bg-green-200 hover:bg-green-400" : "bg-red-200 hover:bg-red-400"}`} >
          {SupCode && SupCode.trim() !== '' ? (   
                                 ResetRequest === 1 ? (
                                   <StyledBadge badgeContent="1" color="error">
                                      <Pencil  className='size-3' />
                                   </StyledBadge>
                                 ) : (
                                      <Pencil className='size-3' />
                                 )                               
                          ) : (
                                <div className='inline-flex'>
                             
                                <IoPersonAddOutline className='size-3' />
                                </div>
                          )}
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
          {SupCode && SupCode.trim() !== '' ? (
                  <div>Edit Supplier</div>
                ) : (
                  <div>
                    Add Supplier
                  </div>
                )}
          </DialogTitle>
          <DialogDescription>
            
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
               Email
            </Label>
            <Label value={formData.Email} className="text-gray-500">{email}</Label>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Sup Code
            </Label>
            <div className="col-span-3 items-center gap-4">
            {SupCode && SupCode.trim() !== '' ? (
                  <div className='text-sm text-gray-500'>{formData.supCode}</div>
                ) : (
                    <Input
                    id="Sup Code" 
                    name="supCode"
                    value={formData.supCode}      
                    onChange={handleChange}             
                    className="col-span-3"
                  />               
                )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Username
            </Label>
            <Input
              id="Username"   
              name="userName"
              value={formData.userName} 
              onChange={handleChange}         
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label  className="text-right">
              Password
            </Label>
            <Input
              id="Password" 
              name="userPassword"
              type="password"
              value={formData.userPassword}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
        <Button type="submit">Submit</Button>
        </DialogFooter>
        <p className={`mt-2 ${message === 'Profile updated successfully' ? 'text-green-500' : 'text-red-500'}`}>{message}</p>

        </form>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default SupTableEdit
