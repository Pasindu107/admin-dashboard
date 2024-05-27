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
    const { openPopup, closePopup} = props;

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
          <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
          </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogCancel onClick={() => zzzz()}>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
      </AlertDialogContent>
      </AlertDialog>
    );
  }
  
  export default TablePopup
  