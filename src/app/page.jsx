//import Image from "next/image";
'use client'

import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/supplier')}>
      Supplier
    </button>
  )
}
