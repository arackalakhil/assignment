import { useContext } from "react";
import { Route,Redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute =({children})=>{
    const {user} = useContext(AuthContext)
    if(user){
        return children
    }
    
    return <Navigate to='/'/>

}
export default PrivateRoute