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
import { Label } from "@/components/ui/label"

import { fetchAuth } from "@/src/app/api/dashAuthApi";
import DashAuthPopup from './DashAuthPopup'

import { Switch } from "@/components/ui/switch"

const SupTableEdit = (props) => {
    const { PayRe, email } = props; 

    //Action auth
    const [authData, setAuthData] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const [payReceived, setPayReceived] = useState(PayRe);
    
    const [message, setMessage] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false)


    useEffect(() => {
      const checkAuthorization = async () => {
        try {
          const roleId = localStorage.getItem('UserRole');
          const profId = 14;
          const data = await fetchAuth(roleId, profId);
          setAuthData(data);
          const isActive = data.some(item => item.Is_Active);
          setIsAuthorized(isActive);
        } catch (error) {
          console.error("Error fetching authorization data:", error);
        }
      };
        checkAuthorization();
 
    }, []);

    useEffect(() => {
        if (!dialogOpen) {
            // Reset form data when the dialog is closed
            setPayReceived(PayRe);
            setMessage('');
        }
    }, [dialogOpen, PayRe]);


    // Handle input changes
    const handleChange = (checked) => {
        setPayReceived(checked ? 1 : 0);
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
        } else
        {
            setDialogOpen(true);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const PayData = {
            PayReceived: payReceived,
            email: email
        }

        if (payReceived === PayRe) {
            setDialogOpen(false);
        } else {
            try {
                const response = await fetch('http://localhost:8000/supplier/postPaymentReceived', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(PayData),
                });
    
                const result = await response.json();
                if (result.Success) {
                    setMessage('Done!');
                    setDialogOpen(false); // Close the dialog on successful submission
                    window.location.reload(); // Reload the page
                } else {
                    setMessage(result.Message);
                }
            } catch (error) {
                setMessage('An error occurred. Please try again.');
            }
            
        }


    };

    return (
        <div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="secondary" 
                            className={` rounded-lg w-13 h-6 transition ease-in-out hover:-translate-y-px hover:scale-105 duration-300
                            ${PayRe && PayRe !== 0 ? "bg-green-50 hover:bg-green-200" : "bg-red-50 hover:bg-red-200"}`} 
                            onClick={handleDialogTrigger}>
                        {PayRe && PayRe !== 0 ? (   
                            <div className='inline-flex'>     
                                <div className='text-[11px] text-green-500'>Received</div>  
                            </div>
                        ) : (
                            <div className='inline-flex'>                             
                                <div className='text-[11px] text-red-500'>Pending</div>  
                            </div>
                        )}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="pb-3">
                            Payment Received ?
                        </DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                        <div className='pb-5 text-center'>{email}</div>
                        <div className="flex items-center space-x-3">                            
                            <Switch 
                                id="Received"
                                checked={payReceived === 1}
                                onCheckedChange={(checked) => handleChange(checked)}
                            />
                            <Label htmlFor="Received">Received</Label>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-sm">Submit</Button>
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
