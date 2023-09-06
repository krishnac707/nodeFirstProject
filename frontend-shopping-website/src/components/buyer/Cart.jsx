import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/Auth.context';
import { useNavigate } from 'react-router-dom';
import api from '../apiConfig';
import "./Cart.css"

const Cart = () => {

    const [cartProducts, setCartProducts] = useState([]);
    const [finalPrice, setFinalPrice] = useState();
    const { state } = useContext(AuthContext)
    const router = useNavigate();

    console.log(cartProducts, "9");
    function buyProduct (){

    }

    function removeProduct (){
        
    }

    useEffect(() => {
        async function getCartProduct() {
            try {
                const response = await api.post('/buyer/all-cart-products', { userId: state?.user?.userId })
                console.log(response,"26");
                if (response.data.success) {
                    console.log(response,"28");
                    setCartProducts(response.data.cartProducts)
                }
            } catch (error) {
                console.log(error, "error in cart")
            }
        }
        if (state?.user?.userId) {
            getCartProduct()
        }
    }, [state])

    useEffect(() => {
        var totalPrice = 0
        if (cartProducts?.length) {
            for (var i = 0; i < cartProducts.length; i++) {
                totalPrice = totalPrice + parseInt(cartProducts[i].price);
            }
            setFinalPrice(totalPrice);
        }
    }, [cartProducts])

    return (
        <div className='cart-heading'>
            <h1 className='cart-heading-div'>cart</h1>
            <div className="cart-whole-div">
                <div className='inside-cart-div'>
                    {
                        cartProducts?.length ? <div className='cart-outside-css'>
                            {cartProducts.map((cartProduct) => (
                                <div className='cart-product-css'>
                                    <img src={cartProduct.image} alt="" />
                                    <h3>{cartProduct.name} {cartProduct.category}</h3>
                                    <h3>Price : {cartProduct.price} RS</h3>
                                    <button className='button-single-product' style={{ width: "50%", marginTop: "5%" }} onClick={() => removeProduct(cartProduct.id)}>Remove Product</button>
                                </div>
                            ))
                            }
                        </div>
                            : <h1>No Product in the cart</h1>
                    }
                </div>
                <div className="right-cart-div">
                    <h2 style={{ textAlign: "center" }}>Total</h2>
                    <h3>Original Amount : {finalPrice && finalPrice + finalPrice} Rs</h3>
                    <h3>Final Amount : {finalPrice && finalPrice} Rs</h3>
                    <button onClick={buyProduct} className='button-single-product' style={{ marginLeft: "35%" }}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default Cart