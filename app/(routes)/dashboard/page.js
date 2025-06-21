import Header from './_components/Header'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import WorkspaceList from './_components/WorkspaceList'

function Dashboard() {
  return (
    <div>
      <Header/>

      <WorkspaceList/>
    </div>
  )
}

export default Dashboard