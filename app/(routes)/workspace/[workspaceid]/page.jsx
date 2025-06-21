"use client"
import React, { useEffect, useState } from 'react'
import SideNav from '../_components/SideNav'
import { db } from '@/config/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { useParams } from 'next/navigation'

function Workspace({params}) {
  const [workspaceData, setWorkspaceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params?.workspaceid) {
      getWorkspaceData();
    }
  }, [params?.workspaceid]);

  const getWorkspaceData = async () => {
    try {
      const workspaceRef = doc(db, 'Workspace', params.workspaceid.toString());
      const workspaceSnap = await getDoc(workspaceRef);
      
      if (workspaceSnap.exists()) {
        setWorkspaceData(workspaceSnap.data());
      }
    } catch (error) {
      console.error("Error fetching workspace data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!workspaceData) {
    return <div>Workspace not found</div>;
  }

  return (
    <div className="flex">
      <SideNav params={params} workspaceData={workspaceData} />
      <div className="flex-1 md:ml-72 p-8">
        <h1 className="text-2xl font-bold mb-4">{workspaceData.workspaceName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add your workspace content here */}
        </div>
      </div>
    </div>
  )
}

export default Workspace