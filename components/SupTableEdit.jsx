'use client'

import React, { useEffect, useState } from 'react'

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

import { fetchAuth } from "@/src/app/api/dashAuthApi";
import DashAuthPopup from './DashAuthPopup'


const StyledBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    right: -8,
    top: 20,
    size: 6,
    padding: '0 4px',
  },
}));




const SupTableEdit = (props) => {
    const { email, SupCode, ResetRequest } = props; 

    //Action auth
    const [authData, setAuthData] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [profileId, setProfileId ] = useState('')


    useEffect(() => {
      setProfileId(SupCode && SupCode.trim() !== '' ? 5 : 4);
    }, [SupCode]);
  
    useEffect(() => {
      const checkAuthorization = async () => {
        try {
          const roleId = localStorage.getItem('UserRole');
          const profId = profileId;
          const data = await fetchAuth(roleId, profId);
          setAuthData(data);
          const isActive = data.some(item => item.Is_Active);
          setIsAuthorized(isActive);
        } catch (error) {
          console.error("Error fetching authorization data:", error);
        }
      };
      if (profileId) {
        checkAuthorization();
      }
    }, [profileId]);
    

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


  // Handle dialog trigger
  const handleDialogTrigger = (e) => {
    if (!isAuthorized) {
          e.preventDefault();
          setPopupMessage('You are not authorized to perform this action!');
          setOpenPopup(true);
          setTimeout(() => {
            setPopupMessage(''); // Clear message after showing
            setOpenPopup(false);
          }, 2000); // Adjust timeout as needed
    } else {
          setDialogOpen(true);
  }
};

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

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

        <Button variant="secondary" 
                className={` rounded-full w-8 h-8 transition ease-in-out hover:-translate-y-px hover:scale-105 duration-300  ${SupCode && SupCode.trim() !== '' ? "bg-green-300 hover:bg-green-400" : "bg-red-300 hover:bg-red-400"}`} 
                onClick={handleDialogTrigger}
                >
          {SupCode && SupCode.trim() !== '' ? (   
                                 ResetRequest === 1 ? (
                                 
                                   <StyledBadge badgeContent="1" color="error">
                                      <Pencil  className='size-3 ' />
                                   </StyledBadge>
                                 ) : (
                                 
                                  <div>
                                      <Pencil className='size-3 ' />
                                  </div>
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
            <div value={formData.Email} className="text-gray-500">{email}</div>
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
              className="col-span-3 "
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
        <Button type="submit" className="bg-indigo-500">Submit</Button>
        </DialogFooter>
        <p className={`mt-2 ${message === 'Profile updated successfully' ? 'text-green-500' : 'text-red-500'}`}>{message}</p>

        </form>
      </DialogContent>
    </Dialog>
    {openPopup && (
                <DashAuthPopup openPopup={openPopup} closePopup={setOpenPopup} data={popupMessage} />
            )}

    </div>
  )
}

export default SupTableEdit
