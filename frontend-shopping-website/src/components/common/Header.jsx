import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/Auth.context'
import { useNavigate } from 'react-router-dom';
import "./Header.css";

const Header = () => {
  const { state, dispatch } = useContext(AuthContext);
  const router = useNavigate();

  return (
    <div className='header-navbar-body'>
      <div className='header-logo-div'><h2 onClick={() => router("/")}>LOGO</h2></div>
      <div className='header-menu-div'>
        {state?.user?.role != "Seller" && <div>
          <h3>Mens</h3>
          <h3>Womens</h3>
          <h3>Kids</h3>
        </div>
        }
        {state?.user?.role == "Seller" &&
          <div>
            <h3 onClick={()=>router("/add-product")}>Add Products</h3>
            <h3 onClick={()=>router("/your-product")}>Your Products</h3>
          </div>
        }
      </div>
      <div className='header-profile-div'>
        {
          state?.user?.name ? <div>
            <h3 onClick={()=>router("/profile")}>{state?.user?.name}</h3>
            <h3>Cart</h3>
            <h3 onClick={() => dispatch({ type: "LOGOUT" })}>Logout</h3>
          </div>
            :
            <div>
              <h3>Profile</h3>
              <h3 onClick={() => router("/login")}>Login</h3>
            </div>
        }
      </div>
    </div>
  )
}

export default Header