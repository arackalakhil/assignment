import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import AuthContext from "../context/AuthContext";

const AdminHomepage = () => {
    
  let { user,baseurl  } = useContext(AuthContext)
  let [data, setData] = useState([])
  const token = JSON.parse(localStorage.getItem("authToken"))

  const getData = () => {
    axios.get(baseurl+"accounts/myapps",
        {
            headers: {
                Authorization: `Bearer ${token.access}`,
                "content-type": "application/json"
            }

        }
    ).then((response) => {
        console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddd", response);
        const { data } = response
        setData(data)
        console.log("fffffffffffffffffffffffffffffffffffffffffff", data);
    })

}
useEffect(() => {
  getData()
}, []);
  return (
    <section className="antialiased bg-gray-100 text-gray-600  px-4">
        <div className="flex flex-col justify-center h-full">
            <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">Customers</h2>
                </header>
                <div className="p-3">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                <tr>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">APP</div>
                                    </th>
                                    {/* <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Appcategory</div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">AppSubcategory</div>
                                    </th> */}
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="font-semibold text-left">Points</div>
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                           { data.map((list, id) => {
                        return (
                                <tr>

                                    <td className="p-2 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-full" src={list.Appimagelink}  width="40" height="40" alt="Alex Shatov"/></div>
                                            <div className="font-medium text-gray-800">{list.Appname}</div>
                                        </div>
                                    </td>
                                    {/* <td className="p-2 whitespace-nowrap">
                                        <div className="text-left">{list.appcategory}</div>
                                    </td>
                                    <td className="p-2 whitespace-nowrap">
                                        <div className="text-lg text-center">{list.subcategory}</div>
                                    </td> */}
                                    <td className="p-2 whitespace-nowrap">
                                        <div className="text-left font-medium text-green-500">{list.points}</div>
                                    </td>
                                </tr>
                                 )
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AdminHomepage