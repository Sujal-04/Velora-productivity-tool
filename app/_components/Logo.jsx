"use client"
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { usePathname } from 'next/navigation'

function Logo() {
  const pathname = usePathname();
  const isWorkspacePage = pathname?.startsWith('/workspace');
  
  return (
    <Link href={isWorkspacePage ? '/dashboard' : '/'} className='flex items-center gap-2'>
        <Image src={'/logo.png'} alt='logo'
        width={30} height={30}/>
        <h2 className='font-bold text-xl'>Velora</h2>
    </Link>
  )
}

export default Logo