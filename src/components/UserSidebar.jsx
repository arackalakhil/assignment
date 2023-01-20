import React, { useCallback, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css"

import { ImHome } from "react-icons/im";
import AuthContext from '../context/AuthContext'
import { FaBattleNet } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { MdLogout, MdManageAccounts, } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { FaCoins } from "react-icons/fa";
import {BsPersonFill} from "react-icons/bs";

import { DiReact } from "react-icons/di";
function UserSidebar() {
  let { user, logoutUser } = useContext(AuthContext)
  let   [sizer,SetSizer]=useState(false)
  const [sideBar, setSideBar] = useState(true)
  const navigate = useNavigate()
  let menu
if (!user.is_admin){
   menu = [


    {
      menuTitle: "Home",
      path: "/userhome/home",
      logo: <AiOutlineHome />
    },
    {
      menuTitle: "Profile",
      path: "/userhome/profile",
      logo: <CgProfile />
    },
    {
      menuTitle: "Points",
      path: "/userhome/points",
      logo: <FaCoins />
    },
    {
      menuTitle: "Task",
      path: "/userhome/task",
      logo: <BiTask />
    },

  ]}
  else{
  
   menu =[
    {
      menuTitle: "Home",
      path: "/adminhome/home",
      logo: <FaCoins />
    },
    {
      menuTitle: "Add Apps",
      path: "/adminhome/add",
      logo: <FaCoins />
    },
  ]

  }
  return (
    <div className={`${sideBar ? "w-62" : "w-20"} h-screen  relative  `}>
      <div className={` ${sideBar ? "w-[15rem]" : "w-20"}  p-5 pt-8 bg-slate-500 h-full shadow-custom`}>

        <DiReact className={`${sideBar ? "left-56" : ""} absolute cursor-pointer text-blue top-9 w-7 border-blue-900
    border-2 rounded-full  ${!sideBar && "rotate-360"}`}

          onClick={() => setSideBar(!sideBar)} />
        <div className="flex gap-x-4 items-center">

          < BsPersonFill className={`cursor-pointer text-white duration-500 w-6 h-6 ${sideBar && "rotate-[360deg]"}`} />
          <h1MdOfflineBolt
            className={`text-white origin-left font-medium text-xl duration-200 ${!sideBar && "scale-0"
              }`}>{user.username}</h1MdOfflineBolt>
        </div>
        <ul className="pt-6">
          {menu.map((menuNames, index) => {
            return (
              <li onClick={() => {
                navigate(menuNames?.path)
              }}
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer font-bold bg-white  hover:bg-blue-500  hover:text-white text-blue-500 text-sm items-center gap-x-4  mt-5
              ${menuNames?.logo ? "mt-9" : "mt-2"} ${index === { index } && "bg-blue-500"
                  } `}
              >
                {menuNames?.logo}
                <span className={`${!sideBar && "hidden"} origin-left duration-200 pl-4`}>
                  {menuNames?.menuTitle}
                </span>

              </li>

            )
          })}

          <li onClick={logoutUser} className={`flex  rounded-md p-2 cursor-pointer font-bold  text-sm items-center gap-x-4 
                 mt-8  bg-white  hover:bg-blue-500  hover:text-white text-blue-500
               `} >
            <MdLogout />
            {/* <img onClick={AdminLogOut} src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/main/src/assets/User.png" alt="menu" /> */}
            <span  className={`${!sideBar && "hidden"} origin-left duration-200 pl-4 `}>
              Logout
            </span>

          </li>
        </ul>
      </div>
    </div>
  );
}
export default UserSidebar;