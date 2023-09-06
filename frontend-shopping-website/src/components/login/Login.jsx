import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/Auth.context';
import api from '../apiConfig';

const Login = () => {

    const [userData, setUserData] = useState({ email: "", password: "" });
    const { state,dispatch } = useContext(AuthContext);
    const router = useNavigate();

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    // console.log(userData);

    const formSubmit = async (event) => {
        event.preventDefault();
        if (userData.email && userData.password) {
            console.log("hello","22");
            console.log(userData,"23");
            const response = await api.post("/all/login", { userData })
            console.log(response,"24");
            if (response.data.success) { 
                    dispatch({
                        type: "LOGIN",
                        payload: response.data.user
                    })
                    localStorage.setItem("token",JSON.stringify(response.data.token))
                setUserData({ email: "", password: "" })
                router("/");
                toast.success(response.data.message);
            }
            else {
                toast.error(response.data.message)
            }
        }
        else {
            toast.error("All fields are mandatory")
        }
    }

    useEffect(()=>{
        if(state?.user?.name){
            router("/")
        }
    },[state])

    return (
        <div style={{ textAlign: "center" }}>
            <form onSubmit={formSubmit}>
                <label >Email : </label><br />
                <input type="email" name='email' onChange={handleChange} value={userData.email} /><br />
                <label >Password : </label><br />
                <input type="password" name='password' onChange={handleChange} value={userData.password} /><br />

                <input type="submit" value="LOGIN" />
            </form>
        </div>
    )
}

export default Login
