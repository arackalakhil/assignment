import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import AuthContext from "../context/AuthContext";

const Home = () => {
    let { user, baseurl } = useContext(AuthContext)
    let [data, setData] = useState([])
    const [view, setView] = useState(false)
    const [preloaddata, setPreloaddata] = useState({})
    const [files, setFile] = useState([]);
    const [message, setMessage] = useState();
    // cosnt [app,setApp]=useState()
    const Swal = require("sweetalert2")
    function details() {
        setView(!view)
    }
    function viewdata(id) {
        setView(!view)

        {
            data.map((userdata, index) => {
                if (userdata.id === id) {
                    console.log(id);
                    console.log(userdata.id);
                    setPreloaddata({
                        id: userdata.id,
                        Appimagelink: userdata.Appimagelink,
                        Applink: userdata.Applink,
                        Appname: userdata.Appname,
                        appcategory: userdata.appcategory,
                        points: userdata.points,
                        subcategory: userdata.subcategory
                    })
                    console.log(preloaddata);

                }

            })
        }

    }


    const uploadData = (e) => {
        e.preventDefault()

        console.log('image issdfsdfsdf ', files.length);
        if (files.length == 0) {
            setMessage("select one image")
        }
        else {
            axios.post(baseurl + "accounts/completetask", {
                users: user.user_id,
                image: files[0],
                app: preloaddata.id
            }, {
                headers: {
                    Authorization: `Bearer ${token.access}`,
                    "content-type": "multipart/form-data"
                }
            }
            ).then((response) => {
                Swal.fire({
                    title: "uploaded",


                    icon: "success",
                })
                setView(!view)
            }).catch((err) => {
                console.log('errors catch', err);
            })
        }
    }

    const token = JSON.parse(localStorage.getItem("authToken"))


    const getData = () => {
        axios.get(baseurl + "accounts/apps",
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

    // //////////////////////////////////

    const handleFile = (e) => {
        setMessage("");
        let file = e.target.files;

        for (let i = 0; i < file.length; i++) {
            const fileType = file[0]['type'];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                setFile([...files, file[0]]);
            } else {
                setMessage("only images accepted");
            }

        }
    };
    const removeImage = (i) => {
        setFile(files.filter(x => x.name !== i));
    }

    ////////////////////////////////////////












    return (
        <>
            {!view ?

                data.map((list, id) => {
                    return (
                        <div className=" h-auto mr-5 ">
                            <div className="bg-gray-200 text-slate-100 mt-10 px-5 py-3.5   rounded-lg shadow hover:shadow-xl  mx-auto transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">

                                <div className="flex items-center mt-2 rounded-lg py-1 cursor-pointer justify-between">
                                    <div className="relative flex flex-shrink-0 items-end">
                                        <img className="h-20 w-20 " src={list.Appimagelink} />
                                        <div className="ml-3.5 xl:pl-10 ">
                                            <span className=" tracking-tight text-center ml font-extrabold text-zinc-900  xl:text-3xl">{list.Appname}</span>
                                            <div className=" ml-3.5 xl:pl-[600px] md:pl-[250px] w-full  ">

                                                <button className="px-1 py-2 text-white bg-blue-500 rounded shadow-xl " >{list.points}Points</button>
                                            </div>
                                            <span className="text-xs leading-none opacity-50"></span>
                                            <p className="text-xs leading-4 pt-2 italic opacity-70 "></p>
                                            <span className="font-light text-blue-500  leading-4 opacity-75" onClick={() => { viewdata(list.id) }}>tap to view more</span>
                                            {/* <span className="font-light text-blue-500  leading-4 opacity-75" onClick={details} >tap to view more</span> */}

                                        </div>
                                    </div>
                                    {/* <div className=" ml-3.5 xl:pl-72 w-full  ">

                                <button className="px-4 py-2 text-white bg-blue-500 rounded shadow-xl " >{list.points}Points</button>
                            </div> */}

                                </div>
                            </div>

                        </div>
                    )
                })
                :


                <div className="  md:ml-0 h-fit mr-28 ">
                    <div className="bg-gray-200 text-slate-100 mt-10 px-5 py-3.5   rounded-lg shadow hover:shadow-xl   transform hover:-translate-y-[0.125rem] transition duration-100 ease-linear">
                        <span className='text-blue-500 cursor-pointer' onClick={details}>back</span>
                        <div className="flex items-center mt-2 rounded-lg py-1 cursor-pointer">
                            <div className="relative flex flex-shrink-0 items-end">
                                <img className="h-20 w-20 " src={preloaddata.Appimagelink} />

                            </div>
                            <div className="ml-3.5 xl:pl-10 ">
                                <span className=" tracking-tight text-center ml font-extrabold text-black xl:text-3xl">{preloaddata.Appname}</span>
                                <span className="text-xs leading-none opacity-50"></span>
                                <div className=" ml-3.5 xl:pl-72 w-fit md:pl-[185px]  ">
                                    <button className="px-2 py-2 text-white bg-blue-500  rounded shadow-xl">{preloaddata.points}</button>
                                </div>
                                <p className="text-xs leading-4 pt-2 italic opacity-70 "></p>
                                <a href={preloaddata.Applink} target="_blank" className="font-light text-blue-500  leading-4 opacity-75">{preloaddata.Applink}</a>
                            </div>


                        </div>

                        <div className="h-fit flex justify-center items-center bg-gray-900 px-2">

                            <div className="p-3 md:w-1/2 w-[360px] rounded-md">
                                <span className="flex justify-center items-center bg-white text-[12px] mb-1 text-red-500">{message}</span>
                                <div className="h-32 w-full overflow-hidden relative shadow-md border-2 items-center rounded-md cursor-pointer   border-gray-400 border-dotted">
                                    <input type="file" onChange={handleFile} className="h-full w-full opacity-0 z-10 absolute" multiple="multiple" name="files[]" />
                                    <div className="h-full w-full bg-gray-200 absolute z-1 flex justify-center items-center top-0">
                                        <div className="flex flex-col">
                                            <i className="mdi mdi-folder-open text-[30px] text-gray-400 text-center"></i>
                                            <span className="text-[12px] text-black">{`Drag and Drop a file`}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {files.map((file, key) => {
                                        return (

                                            <div key={key} className='w-full h-16 flex items-center justify-between rounded p-3 bg-white'>
                                                <div className="flex flex-row items-center gap-2">
                                                    <div className="h-12 w-12 ">
                                                        <img className="w-full h-full rounded" src={URL.createObjectURL(file)} />
                                                    </div>
                                                    <span className="truncate w-44">{file.name}</span>
                                                </div>
                                                <div onClick={() => { removeImage(file.name) }} className="h-6 w-6 bg-red-400 flex items-center cursor-pointer justify-center rounded-sm">
                                                    <MdDelete className=" text-white text-[14px]"></MdDelete>
                                                </div>
                                            </div>

                                        )
                                    })}
                                    <button className="px-4 py-2 text-white bg-blue-500 rounded shadow-xl " onClick={uploadData}>Submit</button>


                                </div>
                            </div>
                        </div>





















                    </div>

                </div>

            }

        </>
    )
}

export default Home