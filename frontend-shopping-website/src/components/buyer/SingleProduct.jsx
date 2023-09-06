import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/Auth.context';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../apiConfig';

const SingleProduct = () => {

    const [singleProductData, setSingleProductData] = useState({});
    const { id } = useParams();
    const { state } = useContext(AuthContext)

    console.log(state,"13");

    useEffect(() => {
        if (id) {
            const getSingleProductData = async () => {
                try {
                    const response = await api.post('/buyer/get-single-product-data', { productId: id })
                    if (response.data.success) {
                        setSingleProductData(response.data.product)
                    }
                } catch (error) {

                }
            }
            getSingleProductData()
        }
    }, [id])

    const addToCart = async (productId) => {
        try {
            const response = await api.post('/buyer/add-cart', { productId, userId: state?.user?.userId });
            if (response.data.success) {
                toast.success("Product added successfully to cart.")
            }
        } catch (error) {
            toast.error("Internal server error, please try again...")
        }
    }

    return (
        <div>
            {singleProductData?.name ? <div style={{ display: 'flex', justifyContent: 'space-around',marginTop:"2%" }}>

                <div style={{ width: "45%", height: "600px", border: "2px solid black" }}>
                    <img style={{ width: "100%", height: "100%" }} src={singleProductData.image} alt='img' />
                </div>
                <div style={{ width: "45%", height: "600px" }}>
                    <h1>{singleProductData.name}</h1>
                    <h3>Price : {singleProductData.price} Rs</h3>
                    <h3>Category : {singleProductData.category}</h3>
                    <button style={{color:"white",backgroundColor:"purple",border:"none",padding:"8px",marginTop:"2%",borderRadius:"4px",width:"20%",cursor:"pointer"}} onClick={() => addToCart(singleProductData._id)}>Add to cart</button>
                </div>

            </div> : <div>Loading..</div>}
        </div>
    )
}

export default SingleProduct
