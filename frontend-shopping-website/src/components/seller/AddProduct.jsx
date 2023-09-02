import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import SellerProtected from '../common/SellerProtected';
import "./Seller.css"
import { AuthContext } from '../../context/Auth.context';
import api from '../apiConfig';

const AddProduct = () => {

    const [productData, setProductData] = useState({ name: "", size: "", price: "", category: "", image: "" });
    const router = useNavigate();
    const { state } = useContext(AuthContext)

    const handleChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
    }

    const formSubmit = async (event) => {
        event.preventDefault();
        console.log(productData,"productData");
        if (productData.name && productData.price && productData.size && productData.image && productData.category) {
            const token = JSON.parse(localStorage.getItem("token"));
            try {
                const response = await api.post("/seller/add-products", { productData,token })
                if (response.data.success) {
                    router("/");
                    toast.success(response.data.message);
                    setProductData({ name: "", size: "", price: "", category: "", image: "" })
                }
            }
            catch (error) {
                toast.error(error.response.data.message)
            }
        }
        else {
            toast.error("All fields are mandatory")
        }
    }

    return (
        <SellerProtected>
            <div style={{textAlign:"center"}}>
                <form onSubmit={formSubmit}>
                    <label >Name : </label><br />
                    <input type="text" name='name' onChange={handleChange} value={productData.name} /><br />
                    <label >price : </label><br />
                    <input type="number" name='price' onChange={handleChange} value={productData.price} /><br />
                    <label >size : </label><br />
                    <input type="text" name='size' onChange={handleChange} value={productData.size} /><br />
                    <label >category : </label><br />
                    <input type="text" name='category' onChange={handleChange} value={productData.category} /><br />
                    <label >Images : </label><br />
                    <input type="text" name="image" onChange={handleChange} value={productData.image} /><br />
                    <input type="submit" value="Add Product" />
                </form>
            </div>
        </SellerProtected>
    )
}

export default AddProduct