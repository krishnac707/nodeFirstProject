import React, { useContext, useEffect, useState } from 'react';
import "./Seller.css";
import axios from 'axios';
import { AuthContext } from '../../context/Auth.context';
import api from '../apiConfig';

const YourProduct = () => {

    const [sellerProduct, setSellerProduct] = useState();
    const { state } = useContext(AuthContext);

    console.log(sellerProduct);

    useEffect(() => {
        const getSellerProduct = async () => {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await api.post("/seller/your-product", { token })
            if (response.data.success) {
                setSellerProduct(response.data.products)
            }
        }
        getSellerProduct();
    }, [])



    return (
        <div>
            <h1 className='your-pro-heading'>{state?.user?.name} Products</h1> 
            <div className='your-product-single-product-div'>
                {
                    sellerProduct?.length && sellerProduct.map((pro) => (
                        <div className='pro-image-div'>
                            <div>
                                <img src={pro.image} alt="" />
                            </div>
                            <h3>{pro.name}</h3>
                            <h4>Price : {pro.price}</h4>
                            <h4>Size : {pro.size}</h4>
                        </div>
                    ))
                }
            </div>

        </div >
    )
}

export default YourProduct