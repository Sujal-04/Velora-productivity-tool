import { Button } from '@/components/ui/button'
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import React from 'react'

function DocumentHeader() {
  return (
    <div className='flex justify-between items-center p-3 px-7 shadow-md'>
        <div></div>
        <OrganizationSwitcher/>
        <div className='flex gap-2'>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white">Share</Button>
            <UserButton/>
        </div>
    </div>
  )
}

export default DocumentHeader