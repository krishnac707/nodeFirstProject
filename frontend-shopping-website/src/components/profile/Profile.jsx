import React, { useContext, useEffect, useState } from 'react';
import "./Profile.css";
import axios from 'axios';
import { AuthContext } from '../../context/Auth.context';
import AuthProtected from '../common/AuthProtected';
import { toast } from 'react-hot-toast';
import api from "./../apiConfig/index"

const Profile = () => {

    const [isNumber, setIsNumber] = useState();
    const { state } = useContext(AuthContext);
    const [otp, setOtp] = useState();
    const [isSentOtp, setIsSentOtp] = useState(false);
    const [isNumberVerified, setIsNumberVerified] = useState(true);
    
    const otpSent = async () => {
        const response = await api.post("/get-otp", { userId: state?.user?._id })
        if (response.data.success) {
            toast.success("Otp has been sent to your register mobile number")
            setIsSentOtp(true);
        }
    };

    const verifyOtp = async () => {
        const response = await api.post("/verify-otp", { userId: state?.user?._id, otpFromFrontend: otp })
        console.log(response.data.success, "30");
        if (response.data.success) {
            setIsSentOtp(false);
            setIsNumberVerified(response.data.isVerified)
            toast.success("Otp verification successfull")
        }
    };

    useEffect(() => {
        const getYourNumber = async () => {
            try {
                const response = await api.post("/get-number", { userId: state?.user?._id })
                if (response.data.success) {
                    setIsNumber(response.data.number)
                    setIsNumberVerified(response.data.isVerified)
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        if (state?.user?._id) {
            getYourNumber();
        }
    },[state])

    return (
        <AuthProtected>
            <div className='profile-class-body'>
                <h1>Your Profile</h1>
                {!isNumberVerified && <h3>Complete Your phone Verification</h3>}
                <h3>Your Number is : {isNumber}</h3>
                {isNumberVerified ? <h3>Your Number is verified</h3> :
                    <div>
                        <button onClick={otpSent}>Verify Your Number</button>
                    </div>
                }
                {isSentOtp && <div>
                    <input type="number" onChange={(event) => setOtp(event.target.value)} placeholder='Enter Verification code' /><br />
                    <button onClick={verifyOtp}>Verify</button>
                </div>}
            </div>
        </AuthProtected>
    )
}

export default Profile
