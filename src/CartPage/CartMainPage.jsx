import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './CartMainPage.css'
import Navbar from '../navBar/Navbar'
import axios from 'axios'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CartMainPage = () => {

    let location = useLocation()
    let { user } = location.state || {}

    const [cartPageLeftContainerDisplay, setCartPageLeftContainerDisplay] = useState('block')

    const [cartList, setCartList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    let navigateTo = useNavigate()

    let fetchCartItems = () => {
        axios.get(`http://localhost:8080/cart/getCartByUserId/${user.userId}`)
            .then((response) => {
                if (response.status === 200) {
                    // console.log(response.data)
                    setCartList(response.data)

                    // Calculating Total Pay Price for User
                    let sum = 0;
                    for (let x of response.data) {
                        sum += (x.product.sellingPrice * x.quantity)
                    }
                    console.log(sum)
                    setTotalPrice(sum)

                    return response.data
                }
            })
            .catch((err) => {
                alert('You are not Log In, Please Log In First')
                navigateTo('/')
                console.log(err)
            })
    }

    useEffect(() => {
        fetchCartItems()
    }, [])

    useEffect(() => {
        if (cartList.length > 0) {
            setCartPageLeftContainerDisplay('block');
        } else {
            setCartPageLeftContainerDisplay('none');
        }
    }, [cartList]);

    let handleRemoveFromCarts = (cartId) => {
        console.log(cartId)
        if (!cartId || isNaN(cartId)) {
            // console.error("Invalid cartId:", cartId);
            alert("Invalid cart ID! Cannot delete.");
            return; // Stop execution if cartId is undefined or not a number
        }

        axios.delete(`http://localhost:8080/cart/deleteCartById/${cartId}`)
            .then((response) => {
                if (response.status === 200) {
                    // console.log("Cart item deleted successfully:", response.data);
                    alert("Cart item deleted!");
                    fetchCartItems(); // Refresh the cart data after deletion
                }
            })
            .catch((error) => {
                console.error("Error while deleting cart item:", error);
                alert("Failed to delete cart item!");
            });


    }

    let handleStockQuantity = (cartItem) => {
        cartItem.product.stockQuantity += cartItem.quantity
        axios.put('http://localhost:8080/product/updateProduct', cartItem.product)
        console.log("After Removing Product : ",cartItem.product)
    }

    let redirectToPaymentPage = () => {
        navigateTo('/paymentpage', {state:{user, cartList, totalPrice}})
    }

    useGSAP(()=>{
        gsap.from("#cart-page-content-container", {
            y:50,
            opacity:0,
            duration:.5,
        })
    })

    return (
        <div id='cart-page-main-container'>
            <Navbar user={user} />

            <div id="cart-page-content-container" style={{position:'relative'}}>
                <div id="cart-page-right-container">
                    {
                        (cartList.length > 0)
                            ?
                                // setCartPageLeftContainerDisplay('block')
                                cartList.map((cartItem) => {
                                    return (
                                        <div id='cart-page-right-section-card-container'>
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
                                                <div id="cart-page-right-section-size-container">
                                                    <h4 style={{ fontWeight: '500', fontSize: '.9rem', color: 'green' }}>Free Size</h4>
                                                    <h4 style={{ fontWeight: '400', fontSize: '.8rem', color: 'grey' }}>Quantity : {cartItem.quantity}</h4>
                                                </div>
                                                <button id='cart-page-right-section-btn-remove-item' onClick={(e) => { handleRemoveFromCarts(cartItem.cart_id); handleStockQuantity(cartItem) }}>Remove Item</button>
                                            </div>
                                        </div>
                                    )
                                })
                            : 
                            // setCartPageLeftContainerDisplay('none')
                                <h1 style={{ fontWeight: '500',textAlign:'center',fontSize:'2.5rem',position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', width:'100vw', color:'silver'
                                }}>Hey {user.userName}, There are No Products In Your Cart</h1>
                    }
                </div>

                <div id="cart-page-left-container" style={{ display: cartPageLeftContainerDisplay }}>
                    <h2 style={{ fontWeight: '400', fontSize: '1.2rem', marginLeft: '5px', marginTop: '5px' }}>SUMMARY</h2>
                    <div id="cart-page-total-pay-container">
                        <div id='cart-page-left-section-total-price-container'>
                            <h4 style={{ fontWeight: '400', fontSize: '1rem', color: 'grey' }}>Total Price</h4>
                            <h4 style={{ fontWeight: '600', fontSize: '1rem' }}>₹ {totalPrice}</h4>
                        </div>
                        <div id='cart-page-left-section-shipping-charges-container'>
                            <h4 style={{ fontWeight: '400', fontSize: '1rem', color: 'grey' }}>Shipping Charges</h4>
                            <h4 style={{ fontWeight: '600', fontSize: '1rem', color: 'green' }}>FREE</h4>
                        </div>
                        <div id='cart-page-left-section-handling-charges-container'>
                            <h4 style={{ fontWeight: '400', fontSize: '1rem', color: 'grey' }}>Handeling Charges</h4>
                            <h4 style={{ fontWeight: '600', fontSize: '1rem' }}>₹ <strike>29</strike> <span style={{ color: 'green' }}>FREE</span></h4>
                        </div>
                    </div>
                    <div id="cart-page-left-section-ammount-payable-container">
                        <h4>Amount To Pay</h4>
                        <h4>{totalPrice}</h4>
                    </div>

                    <button id='cart-page-left-section-btn-buy-now' onClick={(e)=>{redirectToPaymentPage()}}>Buy Now</button>
                </div>
            </div>
        </div >
    )
}

export default CartMainPage