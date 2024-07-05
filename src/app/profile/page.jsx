import React from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ProtectedRoute from '@/components/ProtectRoute'

const page = () => {
 
  return (
    <ProtectedRoute>
    <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow className="bg-blue-950 rounded">
      <TableHead className="w-[100px] text-white">Invoice</TableHead>
      <TableHead className="text-white">Status</TableHead>
      <TableHead className="text-white">Method</TableHead>
      <TableHead className="text-white">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
</ProtectedRoute>
  )
  
}

export default page
