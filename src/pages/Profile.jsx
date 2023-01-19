import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import AuthContext from "../context/AuthContext";
import { format,} from 'timeago.js';
const Profile = () => {
  let { user,baseurl  } = useContext(AuthContext)
  let [data, setData] = useState([])






  const token = JSON.parse(localStorage.getItem("authToken"))


  const getData = () => {
      axios.get(baseurl+"accounts/profile",
          {
              headers: {
                  Authorization: `Bearer ${token.access}`,
                  "content-type": "application/json"
              }

          }
      ).then((response) => {
          console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd", response);
          const { data } = response
          setData(data[0])
          console.log("fffffffffffffffffffffffffffffffffffffffffff", data[0]);
      })
  }
  useEffect(() => {
      getData()
  }, []);

  return (
<>

<body class="bg-gray-300 antialiased">
    <div class="container mx-auto my-auto">
        <div>

            <div class="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                <div class="flex justify-center">
                </div>
                
                <div class="mt-16">
                    <h1 class="font-bold text-center text-3xl text-gray-900">{data.first_name}{data.last_name}</h1>
                    <p class="text-center text-sm text-gray-400 font-medium"></p>
                    <p>
                        <span>
                            
                        </span>
                    </p>
                    <div class="my-5 px-6">
                        <a href="#" class="text-gray-200 block rounded-lg text-center font-medium leading-6 px-6 py-3 bg-gray-900 hover:bg-black hover:text-white">Connect with <span class="font-bold">{data.email}</span></a>
                    </div>


                    <div class="w-full">
                        <h3 class="font-medium text-gray-900 text-left px-6"></h3>
                        <div class="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">
                            <a href="#" class="\ border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                            Date Joined : 
                                    <span class="text-gray-500 text-xs">{data.date_joined}</span>
                            </a>

                            <a href="#" class=" border-t border-gray-100 text-gray-600 py-4 pl-6 pr-3 w-full block hover:bg-gray-100 transition duration-150">
                                    username :
                                    <span class="text-gray-500 text-xs">{data.username}</span>
                            </a>

                           
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</body>

</>
  )
}

export default Profile