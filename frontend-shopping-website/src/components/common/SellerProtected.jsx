import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/Auth.context'
import { useNavigate } from 'react-router-dom';

const SellerProtected = ({children}) => {
    
    const {state} = useContext(AuthContext);
    const router = useNavigate()

    useEffect(()=>{
        if(state?.user?.role != "Seller"){
            router("/login")
        }

    },[state])

    return state?.user?.role == "Seller" ? children : null

}

export default SellerProtected
