"use client"
import Logo from '@/app/_components/Logo'
import { Button } from '@/components/ui/button'
import { db } from '@/config/firebaseConfig'
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore'
import { Bell, Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DocumentList from './DocumentList'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Progress } from '@radix-ui/react-progress'
import { toast } from 'sonner'

const MAX_FILE = Number(process.env.NEXT_PUBLIC_MAX_FILE_COUNT) || 5;  // Default to 5

function SideNav({params, workspaceData}) {
    const [documentList,setDocumentList]=useState([]);
    const {user}=useUser();
    const [loading,setLoading]=useState(false);
    const router=useRouter();

    useEffect(()=>{
        params&&GetDocumentList();
    },[params])

    /**
     * Used to get Document List
     */
    const GetDocumentList=()=>{
        const q=query(collection(db,'workspaceDocuments'),
    where('workspaceId','==',Number(params?.workspaceid)));
    const unsubscribe=onSnapshot(q,(querySnapshot)=>{
        setDocumentList([]);

        querySnapshot.forEach((doc)=>{
            setDocumentList(documentList=>[...documentList,doc.data()])
        })
    })

    }


    /**
     * Create New Document
     */
    const CreateNewDocument=async()=>{

        if(documentList?.length>=MAX_FILE)
        {
            toast("Upgrade to add new file",{
                description: "You reach max file, Please upgrade for unlimited file creation",
                action: {
                  label: "Upgrade",
                  onClick: () => console.log("Undo"),
                },
              })
            return;
        }

        setLoading(true);
        const docId=uuid4();
        await setDoc(doc(db,'workspaceDocuments',docId.toString()),{
            workspaceId:Number(params?.workspaceid),
            createdBy:user?.primaryEmailAddress?.emailAddress,
            coverImage:null,
            emoji:null,
            id:docId,
            documentName:'Untitled Document',
            documentOutput:[]
        })

        await setDoc(doc(db,'documentOutput',docId.toString()),{
            docId:docId,
            output:[]
        })

        await setDoc(doc(db,'documentOutput',docId.toString()),{
              docId:docId,
              output:[],
        
        })

        setLoading(false);
        router.replace('/workspace/'+params?.workspaceid+"/"+docId);
    }

  return (
    <div className='h-screen md:w-72 
    hidden md:block fixed bg-blue-50 p-5 shadow-md'>
        <div className='flex justify-between items-center'>
            <Logo/>
        </div>
        <hr className='my-5'></hr>
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='font-medium'>{workspaceData?.workspaceName || 'Workspace'}</h2>
                <Button size="sm" className="text-lg bg-blue-500 hover:bg-blue-700 text-white" onClick={CreateNewDocument} >
                    {loading?<Loader2Icon className='h-4 w-4 animate-spin' />:'+'}
                </Button>
            </div>
        </div>

        {/* Document List  */}
        <DocumentList documentList={documentList}
        params={params} />

        {/* Progress Bar  */}

        <div className="absolute bottom-10 w-[85%]">
        <h2 className="text-sm font-light my-2">
            <strong>{documentList.length}</strong> out of <strong>{MAX_FILE}</strong> files used
        </h2>
        <Progress value={documentList.length && MAX_FILE ? Math.min((documentList.length / Number(MAX_FILE)) * 100, 100) : 0} 
        className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${(documentList.length / MAX_FILE) * 100}%` }}
            />
        </Progress>
        <h2 className="text-sm font-light">Upgrade your plan for unlimited access</h2>
        </div>


    </div>
  )
}

export default SideNav