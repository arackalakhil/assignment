import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Addapps = () => {
    const Swal=require("sweetalert2")
    let { user,baseurl  } = useContext(AuthContext)
	const navigate = useNavigate();
    
    const [userData, setUserData] = useState({
        creator:user.user_id,
        Appimagelink: '',
        Appname: '',
        Applink: '',
        appcategory: '',
        subcategory: '',
        points: '',


    })
    const handleChange = (e) => {

        setUserData({
            ...userData, [e.target.name]: e.target.value
            
        })
    }
    

    const token = JSON.parse(localStorage.getItem("authToken"))

    const onSubmitng = async (e) => {
        e.preventDefault()

        console.log("llllllll",userData);
        axios.post(baseurl + "accounts/newapp", 
            userData,
        
            {
                headers: {
                    Authorization: `Bearer ${token.access}`,
                    "content-type": "multipart/form-data"
                }
            }
        ).then((response) => {
            if (response.status === 201) {
                navigate("/adminhome/home")
            Swal.fire({
                title: "created new app",
                icon: "success",
            })}
        }).catch((err) => {
            console.log('errors catch', err);
        })
    }


return (
    <>
        <section className="max-w-4xl p-6 mx-auto bg-white-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
            <form onSubmit={onSubmitng} >
                <div className="flex justify-center mt-6">
                    <div>

                        <img className="h-20 w-20  " src={userData.Appimagelink} />
                        <label className="text-black dark:text-gray-200" for="username">App image link(url)</label>
                        <input onChange={handleChange} value={userData.Appimagelink} name="Appimagelink" id="username" type="text" className="block w-fit px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring " placeholder='App Image link' required />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="text-black dark:text-gray-200" for="username">App Name</label>
                        <input required name="Appname" onChange={handleChange} value={userData.Appname} id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
                    </div>

                    <div>
                        <label className="text-black dark:text-gray-200" for="username">App Link</label>
                        <input required name="Applink" onChange={handleChange}
                            value={userData.Applink} id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />

                    </div>



                    <div>
                        <label className="text-black dark:text-gray-200" for="passwordConfirmation">App Category</label>
                        <select onChange={handleChange} name="appcategory" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" >
                        {/* <input required name="Appname" onChange={handleChange} value={userData.Appname} id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" /> */}
                  
                            <option value={"Entertaiment"}>Entertaiment</option>
                            <option value={"News"}>News</option>
                            <option value={"Education"}>Education</option>
                            {/* <option>Bandung</option> */}
                        </select>
                    </div>
                    <div>
                        <label className="text-black dark:text-gray-200" for="passwordConfirmation"> Sub Category</label>
                        <select onChange={handleChange} name="subcategory" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                            <option value={"SocialMedia"}>SocialMedia</option>
                            <option  value={"Live"}>Live</option>
                            <option  value={"Sports"}>Sports</option>
                            <option value={"Game"}>Game</option>
                        </select>
                    </div>


                </div>
                <div className="flex justify-center mt-6">
                    <input required name="points" onChange={handleChange}
                        value={userData.points} id="username" type="text" className="px-6 py-2  text-black font-extrabold transition-colors duration-200 transform bg-lime-300 rounded-md  focus:outline-none w-fit" placeholder='Addpoint' />

                </div>
                {userData.points ?
                    <div className="flex justify-center mt-6">
                        <button className="px-6 py-2 leading-5 text-black transition-colors duration-200 font-extrabold transform bg-amber-300 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit</button>
                    </div>
                    : null}
            </form>
        </section>


    </>
)
}

export default Addapps
