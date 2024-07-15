import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
  
  import React from 'react';
  
  const LoadingSpinner = ({ openPopup, closePopup, data }) => {
    if (!openPopup) return null;
  
    return (
      <AlertDialog open={openPopup} onOpenChange={closePopup}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Loading</AlertDialogTitle>
            <AlertDialogDescription className="text-[20px]">
              {data}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default LoadingSpinner;
  