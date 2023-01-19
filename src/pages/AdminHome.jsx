


import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from '../components/UserSidebar'
import Header from '../components/Header'

const AdminHome = () => {
    return (<>
        <Header />
        <div className='flex gap-8'>
    
        <UserSidebar />
        <div className='w-full'>
          <Outlet />
        </div>
        </div>
      </>
  )
}

export default AdminHome



