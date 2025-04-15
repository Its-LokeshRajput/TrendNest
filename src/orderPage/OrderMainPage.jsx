import React, { use, useEffect, useState } from 'react'
import './OrderMainPage.css'
import { useLocation } from 'react-router-dom'
import Navbar from '../navBar/Navbar'
import axios from 'axios'

const OrderMainPage = () => {
    let location = useLocation()
    let {user} = location.state || ""

    let [oringinalOrderList, setOriginalOrderList] = useState([]) 

    let fetchOriginalOrderData = () => {
        // axios.get(`http://localhost:8080/order/getOrdersByUserId/2`)
        axios.get(`http://localhost:8080/order/getOrdersByUserId/${user.userId}`)
        .then((response)=>{
            console.log(response.data)
            setOriginalOrderList(response.data)
        })
    }

    useEffect(() => {
        fetchOriginalOrderData()
    }, [])
    
  return (
    <div id='order-main-page-container'>
        <Navbar user={user} />

        <div id='order-main-page-content-container'>
            {/* {oringinalOrderList ? console.log("List : ",oringinalOrderList) : console.log("Empty")} */}
            <div id="order-list-container">

            {
                        (oringinalOrderList.length > 0)
                            ?
                                // setCartPageLeftContainerDisplay('block')
                                oringinalOrderList.map((cartItem) => {
                                    return (
                                        <div id='order-page-card-container'>
                                            <div id="cart-page-right-section-image-container">
                                                <img src={cartItem.product.frontImageUrl} alt="" />
                                                <h4 id='cart-page-right-section-discount'>₹ {cartItem.product.discout} off</h4>
                                            </div>

                                            <div id="cart-page-right-section-details-container">
                                                <div id="cart-page-right-section-price-container">
                                                    <h4 style={{ fontWeight: '400', fontSize: '.9rem' }}>₹{cartItem.product.sellingPrice}</h4>
                                                    <h4 style={{ fontWeight: '400', fontSize: '.7rem', color: 'grey' }}><strike>₹{cartItem.product.actualPrice}</strike></h4>
                                                </div>
                                                <div id="cart-page-right-section-product-info-container">
                                                    <h4 style={{ fontWeight: '400', fontSize: '.7rem', textTransform: 'capitalize' }}>{cartItem.product.name}</h4>
                                                    <h4 style={{ fontWeight: '400', fontSize: '.8rem', color: 'grey', textTransform: 'uppercase' }}>{cartItem.product.seller.storeName}</h4>
                                                </div>
                                                <div id="cart-page-right-section-product-info-container">
                                                    <h4 style={{ fontWeight: '400', fontSize: '.8rem', color: 'grey', textTransform: 'capitalize' }}>Qty : {cartItem.quantity}</h4>
                                                    <h4 style={{ fontWeight: 'bold', fontSize: '.8rem', color: 'grey', textTransform: 'capitalize' }}>Total Amount : {cartItem.quantity * cartItem.product.sellingPrice}</h4>
                                                    <h4 style={{ fontWeight: '500', fontSize: '.8rem', color: 'grey', textTransform:'capitalize' }} >Status : {cartItem.delivery_status}</h4>
                                                </div>
                                                <div id="cart-page-right-section-size-container">
                                                    <h4 style={{ fontWeight: '500', fontSize: '.9rem', color: 'green' }}>Free Size</h4>
                                                </div>

                                                {/* <button id='cart-page-right-section-btn-remove-item'>Track Order</button> */}
                                            </div>
                                        </div>
                                    )
                                })
                            : 
                            // setCartPageLeftContainerDisplay('none')
                                <h1 style={{ fontWeight: '500',textAlign:'center',fontSize:'2.5rem',position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', width:'100vw', color:'silver'}}>Hey {user.userName}, There are No Orders</h1>
                    }

            </div>
        </div>
    </div>
  )
}

export default OrderMainPage