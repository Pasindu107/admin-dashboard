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
          <AlertDialogDescription>

                <h2>Company type</h2>
                <p className="p-4 text-[20px]">{data}</p>

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
  