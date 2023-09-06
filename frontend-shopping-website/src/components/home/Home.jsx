import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/Auth.context';
import api from '../apiConfig';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const { state } = useContext(AuthContext)
  const [allproducts, setAllProducts] = useState();
  const router = useNavigate()

  console.log(allproducts, "11");

  useEffect(() => {

    const getAllProducts = async () => {
      try {
        const response = await api.get("/all/all-products")
        if (response.data.success) {
          setAllProducts(response.data.product)
        }
      } catch (error) {
        console.log(error);
      }

    }

    getAllProducts();

  }, [])

  return (
    <div>
      <h1 className='your-pro-heading'>{state?.user?.name} Products</h1>
      <div className='your-product-single-product-div'>
        {
          allproducts?.length && allproducts.map((pro) => (
            <div className='pro-image-div' onClick={() => router(`/single-products/${pro._id}`)}>
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