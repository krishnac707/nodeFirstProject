import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/Auth.context';
import api from '../apiConfig';

const Home = () => {

  const {state} = useContext(AuthContext)
  const [allproducts,setAllProducts] = useState();

  useEffect(()=>{

    const getAllProducts = async () =>{

      const response = await api.get("/all/all-products")
      if(response.data.success){
        setAllProducts(response.data.product)
      }

    }

    getAllProducts();

  },[])

  return (
    <div>
      <h1 className='your-pro-heading'>{state?.user?.name} Products</h1>
      <div className='your-product-single-product-div'>
        {
          allproducts?.length && allproducts.map((pro) => (
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

export default Home