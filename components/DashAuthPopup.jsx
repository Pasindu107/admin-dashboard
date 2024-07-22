import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

  import React from 'react'
  
  const DashAuthPopup = (props) => {
    const { openPopup, closePopup, data } = props;
    if (!openPopup) return null;
    const zzzz = () => {
      closePopup();
    }
      
    return (
      <AlertDialog
        open={openPopup} 
      >
      {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
      <AlertDialogContent>
          <AlertDialogHeader>
          <AlertDialogTitle></AlertDialogTitle>
          <AlertDialogDescription className='text-base text-center'>                
                {data}
          </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          {/* <AlertDialogCancel onClick={() => zzzz()}></AlertDialogCancel> */}
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
      </AlertDialogContent>
      </AlertDialog>
    );
  }
  
  export default DashAuthPopup
  