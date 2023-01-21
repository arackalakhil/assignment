import React, { useCallback, useContext } from 'react'

import AuthContext from '../context/AuthContext'

const Header = () => {
 

    let {user,logoutUser}=useContext(AuthContext)
    console.log(user);
  return (
   <>
<nav className=" bg-white border-gray-200 w-auto dark:bg-gray-900 dark:border-gray-700">
    <div className='h-6 bg-gray-400'></div>
    <div className='text-center bg-gray-100 h-12 py-2 '><h1 className='font-bold '>HI {user?.username}</h1></div>
    <div className='h-14 bg-gray-400 w-full '></div>
</nav>

   </>
  )
}

export default Header