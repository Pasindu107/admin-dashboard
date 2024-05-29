import { Textarea } from "@/components/ui/textarea"
import {Input} from "@nextui-org/input";

import Link from 'next/link'
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



const page = () => {
    
  
  return (
    <div className="relative flex flex-col justify-center items-center py-[200px] ">
      <div className="shadow-2xl w-full m-auto sm:max-w-lg p-4 rounded-[10px] flex flex-col">
        <div className="p-4">Register</div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '45ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </Box>
        <div className="p-4">
          <Button variant="contained" href="/login" >Register</Button>
 
        </div>
      </div>
    </div>

  )
}

export default page
