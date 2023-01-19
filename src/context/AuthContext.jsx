import { createContext, useDeferredValue, useEffect, useState, } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom";
import axios from "axios"
const AuthContext = createContext()


export default AuthContext

const token = JSON.parse(localStorage.getItem("authToken"))
export const AuthProvider = ({ children }) => {
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null)
    const [admin, setAdmin] = useState(
        localStorage.getItem("authToken")
            ? jwt_decode(localStorage.getItem("authToken"))
            : null
    );
    let  baseurl = 'https://assignmentbackend.vercel.app/'
    let [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const [error, setError] = useState(false)
    const Swal = require("sweetalert2")

    let loginUser = async (e) => {
        e.preventDefault()
        console.log("form submitted");
        console.log(e.target.username.value);
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, "password": e.target.password.value })
        })
        let data = await response.json()
        console.log("data", data);
        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
            if(jwt_decode(data.access).is_admin)
            {
                navigate('/adminhome/home')
            }
            else{
            navigate('/userhome/home')
            }

        } else {
            alert("ENTER CORRECT DATA")
        }
    }
    let logoutUser = () => {
        Swal.fire({
            title: "do you want to log out",
            text: "log out ",
            icon: "warning",
            showCancelButton: "true",
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "YES",
        }).then((result) => {
            if (result.isConfirmed) {
                setAuthTokens(null)
                setUser(null)
                localStorage.removeItem("authToken")
                console.log("log out sucess")
                console.log(authTokens)
                console.log(user)
                navigate('/')
            }
        })
    }
    let updateToken = async () => {
        let responce = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({ 'refersh': authTokens?.refersh })
        })
        let data = await responce.json()
        if (responce.status === 200) {

            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            
            localStorage.setItem('authToken', JSON.stringify(data))
        } else {
            console.log('ttttttttttttttt',responce.status);

            logoutUser()
        }
    };


    const AdminLogins = async (e) => {
        e.preventDefault()
        console.log(e.target.username.value);
        let response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value,
            }),

        })
        const data = await response.json()
        if (response.status === 200) {
            setAuthTokens(data);
            setAdmin(jwt_decode(data.access));
            console.log(admin, "ggggggggggggggggggggggggggggggggggggggg");
            localStorage.setItem("authToken", JSON.stringify(data));
            if (admin.is_superadmin) {
                console.log("pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp");

                navigate('/adminHome/application')
            }
            else {
                Swal.fire(
                    'error', 'only admin can login'
                )
                console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");

            }
        }

        else {
            Swal.fire(
                'error', 'check data'
            )
        }
    }
    const AdminLogOut = () => {
        Swal.fire({
            title: "do you want to log out",
            text: "log out ",
            icon: "warning",
            showCancelButton: "true",
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "YES,Approve",
        }).then((result) => {
            if (result.isConfirmed) {

                setAuthTokens(null);
                setAdmin(null);
                localStorage.removeItem("authToken");
                console.clear();
                navigate("/adminLogin");
            }
        })
    }
    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
     
        AdminLogins: AdminLogins,
        AdminLogOut: AdminLogOut,
        authTokens: authTokens,
        error: error,
        baseurl:baseurl,

    }
    useEffect(() => {
        console.log('qweqweqwe');
        let three = 1000 * 60 * 60 * 10000
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, three, [])
        return () => clearInterval(interval)

    }, [authTokens, loading])
    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}