import Header from './components/common/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import { Routes, Route } from 'react-router-dom'
import AddProduct from './components/seller/AddProduct';
import YourProduct from './components/seller/YourProduct';
import Profile from './components/profile/Profile';
import SingleProduct from './components/buyer/SingleProduct';
import Cart from './components/buyer/Cart';

function App() {

  return (
    <div className="App">

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path='/add-product' element={<AddProduct />} />
        <Route exact path='/your-product' element={<YourProduct /> } />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/single-products/:id' element={<SingleProduct />} />
      </Routes>
    </div>
  );
}

export default App;
