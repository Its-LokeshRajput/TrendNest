import React from 'react'
import './App.css'
import Navbar from './navBar/Navbar'
import UserLogIn from './userLogIn/UserLogIn'
import UserRegistration from './userLogIn/UserRegistration'
import { Route, Routes } from 'react-router-dom'
import SellerLogIn from './SellerAuth/SellerLogIn'
import SellerRegistration from './SellerAuth/SellerRegistration'
import AdminLogIn from './adminAuth/AdminLogIn'
import AdminRegistration from './adminAuth/AdminRegistration'
import Footer from './Footer/Footer'
import AdminMainPage from './adminPages/AdminMainPage'
import SellerMainPage from './sellerPages/SellerMainPage'
import UserMainPage from './UserPages/UserMainPage'
import ProductPage from './ProductDetailsPage/ProductPage'
import CartMainPage from './CartPage/CartMainPage'
import PaymentPage from './paymentPage/PaymentPage'
import OrderMainPage from './orderPage/OrderMainPage'

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path='/userLogIn' element={<UserLogIn />}/> */}
        <Route path='/' element={<UserLogIn />} />
        <Route path='/userRegistration' element={<UserRegistration />} />
        <Route path='/sellerLogIn' element={<SellerLogIn />} />
        <Route path='/sellerRegistration' element={<SellerRegistration />} />
        <Route path='/adminLogIn' element={<AdminLogIn />} />
        <Route path='/adminRegistration' element={<AdminRegistration />} />
        <Route path='/adminHome/*' element={<AdminMainPage />} />
        <Route path='/sellerHome/*' element={<SellerMainPage />} />
        <Route path='/userhome/*' element={<UserMainPage />} />
        <Route path='/productpage' element={<ProductPage />} />
        <Route path='/cartpage' element={<CartMainPage />} />
        <Route path='/orderpage' element={<OrderMainPage />} />
        <Route path='/paymentpage' element={<PaymentPage />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

export default App