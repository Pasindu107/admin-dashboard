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
  
  const TablePopup = (props) => {
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
          <AlertDialogTitle>Supplier Details</AlertDialogTitle>
          <AlertDialogDescription className='text-[20px]'>                
                {data}
          </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogCancel onClick={() => zzzz()}>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
      </AlertDialogContent>
      </AlertDialog>
    );
  }
  
  export default TablePopup
  