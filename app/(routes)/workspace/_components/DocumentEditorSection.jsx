"use client"
import React, { useState } from 'react'
import DocumentHeader from './DocumentHeader'
import DocumentInfo from './DocumentInfo'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'
import CommentBox from './CommentBox'

const RichDocumentEditor = dynamic(
  () => import('./RichDocumentEditor.client'),
  { ssr: false }
);

function DocumentEditorSection({params}) {

  const [openComment, setOpenComment] = useState(false);



  return (
    <div>
        {/* Header */}
            <DocumentHeader/>

        {/* Document Info */}
            <DocumentInfo params={params}/>



        {/* Rich Text Editor */}
        <div className='grid grid-cols-1'>
          <div className='col-span-4'>
            <RichDocumentEditor params={params}/>
          </div>


      <div className='fixed right-5 bottom-5 z-30'>
        <Button className="text-lg bg-blue-500 hover:bg-blue-700" onClick={() => setOpenComment(!openComment)}>
          {openComment ? <X /> : <MessageCircle />} </Button>
        {openComment && <CommentBox/>}
      </div>
      </div>


    </div>
  )
}

export default DocumentEditorSection