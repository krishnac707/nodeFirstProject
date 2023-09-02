import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import api from '../apiConfig';

const Register = () => {

    const [userData, setUserData] = useState({ name: "", email: "", number: "", password: "", confirmPassword: "", role: "Buyer" });
    const router = useNavigate();

    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    // console.log(userData);

    const selectHandleChange = (event) => {
        setUserData({ ...userData, "role": event.target.value })
    }

    const formSubmit = async (event) => {
        event.preventDefault();
        if (userData.name && userData.email && userData.number && userData.password && userData.confirmPassword && userData.role) {
            if (userData.password === userData.confirmPassword) {
                const response = await api.post("/all/register", { userData })
                if (response.data.success) {
                    setUserData({ name: "", email: "",number:"", password: "", confirmPassword: "", role: "Buyer" })
                    router("/login");
                    toast.success(response.data.message);
                }
                else {
                    toast.error(response.data.message)
                }
            }
            else {
                toast.error("Password and confirm password is not matched")
            }
        }
        else {
            toast.error("All fields are mandatory")
        }
    }



    return (
        <div>
            <form onSubmit={formSubmit}>
                <label >Name : </label><br />
                <input type="text" name='name' onChange={handleChange} value={userData.name} /><br />
                <label >Email : </label><br />
                <input type="email" name='email' onChange={handleChange} value={userData.email} /><br />
                <label >Number : </label><br />
                <input type="number" name='number' onChange={handleChange} value={userData.number} /><br />
                <label >Password : </label><br />
                <input type="password" name='password' onChange={handleChange} value={userData.password} /><br />
                <label >Confirm Password : </label><br />
                <input type="password" name='confirmPassword' onChange={handleChange} value={userData.confirmPassword} /><br />
                <select onChange={selectHandleChange}><br />
                    <option value="Buyer">Buyer</option>
                    <option value="Seller">Seller</option>
                </select><br />
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}

export default Register