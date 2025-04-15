import React, { useState } from 'react'
import './PaymentPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const PaymentPage = () => {

    let location = useLocation()
    const { user, cartList, totalPrice } = location.state || {};

    let navigateTo = useNavigate()

    const [pincode, setpincode] = useState('')
    const [flateName, setflateName] = useState('')
    const [streetName, setstreetName] = useState('')
    const [landMark, setlandMark] = useState('')
    const [cityName, setcityName] = useState('')
    const [stateName, setstateName] = useState('')

    const [isPincodeValid, setIsPincodeValid] = useState(false);
    const [isFullNameValid, setIsFullNameValid] = useState(false);
    const [isBuildingNameValid, setIsBuildingNameValid] = useState(false);
    const [isLandMarkValid, setIsLandMarkValid] = useState(false);
    const [isCityValid, setIsCityValid] = useState(false);
    const [isStateValid, setIsStateValid] = useState(false);


    const order = {
        delivery_status: "Pending",  // Example status
        total_amt: totalPrice,  // Example total amount
        quantity: 0,  // Example quantity
        order_data: new Date().toLocaleDateString('en-CA'),  // Example order date
        deliveryAddress: "",  // Example address
        user: user,
        products: [...cartList]
    };

    // console.log(order);


    let handleOnChange = (e) => {
        if (e.target.name == 'pincode') {
            // (e.target.value).length == 6 ? (e.target.style = `color: green`; isPincodeValid=true) : e.target.style = `color: red`
            if ((e.target.value).length == 6) {
                e.target.style = `color: green`;
                setIsPincodeValid(true)
            } else {
                e.target.style = `color: red`
                setIsPincodeValid(false)
                // isPincodeValid = false
            }
            setpincode(e.target.value)
        }
        else if (e.target.name == 'mobNum') {
            (e.target.value).length == 10 ? e.target.style = `color: green` : e.target.style = `color: red`
        }
        else if (e.target.name == 'fullName') {
            // (e.target.value).length <= 6 ? e.target.style = `color: red` : e.target.style = `color: green`; isFullNameValid = true;
            if ((e.target.value).length <= 6) {
                setIsFullNameValid(false)
                e.target.style = `color: red`
            } else {
                setIsFullNameValid(true)
                // isFullNameValid = true
                e.target.style = `color: green`;
            }
        }
        else if (e.target.name == 'buildingName') {
            // (e.target.value).length <= 0 ? e.target.style = `color: red` : e.target.style = `color: green`
            if ((e.target.value).length <= 0) {
                setIsBuildingNameValid(false)
                e.target.style = `color: red`
            } else {
                setIsBuildingNameValid(true)
                // isBuildingNameValid = true
                e.target.style = `color: green`
            }
            setflateName(e.target.value)
        }
        else if (e.target.name == 'LandMark') {
            // (e.target.value).length <= 3 ? e.target.style = `color: red` : e.target.style = `color: green`
            if ((e.target.value).length <= 3) {
                setIsLandMarkValid(false)
                e.target.style = `color: red`
            } else {
                setIsLandMarkValid(true)
                // isLandMarkValid = true
                e.target.style = `color: green`
            }
            setlandMark(e.target.value)
        }
        else if (e.target.name == 'city') {
            // (e.target.value).length != 0 ? e.target.style = `color: red` : e.target.style = `color: green`
            if ((e.target.value).length == 0) {
                setIsCityValid(false)
                e.target.style = `color: red`
            } else {
                setIsCityValid(true)
                // isCityValid = true
                e.target.style = `color: green`
            }
            setcityName(e.target.value)
        }
        else if (e.target.name == 'state') {
            // (e.target.value).length != 0 ? e.target.style = `color: red` : e.target.style = `color: green`
            if ((e.target.value).length == 0) {
                setIsStateValid(false)
                e.target.style = `color: red`
            } else {
                setIsStateValid(true)
                // isStateValid = true
                e.target.style = `color: green`
            }
            setstateName(e.target.value)
        }
    }

    let handleOrderSubmition = () => {
        if (isPincodeValid && isFullNameValid && isBuildingNameValid && isLandMarkValid && isCityValid && isStateValid) {
            let deliveryAddress = `${flateName}, ${streetName}, near ${landMark}, city: ${cityName}, state: ${stateName}, ${pincode}`;
            
            cartList.forEach(product => {
                let totalPrice = product.product.sellingPrice * (product.quantity || 1); // Ensure total_amt is not null
    
                let singleOrder = {
                    delivery_status: "Pending",
                    total_amt: totalPrice, // Ensure total amount is calculated
                    quantity: product.quantity || 1,
                    order_date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
                    deliveryAddress: deliveryAddress,
                    user: { userId: user.userId }, // Send only user ID
                    product: { id: product.product.id } // Send only product ID
                };
                postOrder(singleOrder, product.cart_id);
            });
    
        } else {
            alert('Invalid Address Data');
        }
    };
    
    let postOrder = (orderData, cartId) => {
        axios.post('http://localhost:8080/order/addOrder', orderData, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            alert("Successfully placed order for product ID: " + orderData.product.id)
            console.log("Order Data",response.data)
            navigateTo('/userhome', {state : {user}})
        })
        .catch((err) => {
            console.error("Error details:", err.response);
            alert("Error while adding order for product ID: " + orderData.product.id);
        });

        axios.delete(`http://localhost:8080/cart/deleteCartById/${cartId}`)
        .catch(err => alert('error while deleting cart in Payment Page Line No : 159'))
    };
    
    
    
    return (
        <div id='payment-page-main-container'>
            <div id="payment-page-address-details-container">
                <h2 style={{ fontWeight: '400', textAlign: 'center', margin: '10px 0px' }}>Please Fill Address For Shipping</h2>

                <div id="payment-page-pincode-mobNum-container">
                    <div id="payment-page-pincode-container">
                        <input type="number" name='pincode' id='pincode' placeholder='PinCode (valid 6 Digits)' onChange={(e) => { handleOnChange(e) }} />
                    </div>

                    <div id="payment-page-mobNum-container">
                        <input type="number" name='mobNum' value={user.mobileNumber} id='mobNum' placeholder='Mobile Number' readOnly />
                    </div>
                </div>

                <div id="payment-page-full-name-container">
                    <input type="text" name='fullName' id='fullName' placeholder='Full Name' onChange={(e) => { handleOnChange(e) }} />
                </div>

                <div id="payment-page-BuildingName-container">
                    <input type="text" name='buildingName' id='buildingName' placeholder='Flat/House No/Building Name ' onChange={(e) => { handleOnChange(e) }} />
                </div>

                <div id="payment-page-LandMark-container">
                    <input type="text" name='LandMark' id='LandMark' placeholder='Street Name/Land Mark' onChange={(e) => { handleOnChange(e) }} />
                </div>

                <div id="payment-page-city-state-container">
                    <div id="payment-page-city-container">
                        <input type="text" name='city' id='city' placeholder='City Name' onChange={(e) => { handleOnChange(e) }} />
                    </div>

                    <div id="payment-page-state-container">
                        <input type="text" name='state' id='state' placeholder='State Name' onChange={(e) => { handleOnChange(e) }} />
                    </div>
                </div>

            </div>

            <div id="payment-page-payment-details-container">
                <div id="payment-page-order-details-container">

                    <div style={{ width: '100%', backgroundColor: '#fff', border: '.5px solid lightgrey', padding: '5px' }}>
                        <h2 style={{ fontWeight: '400', fontSize: '1rem' }}>Order Details</h2>

                        <div id="payment-page-total-pay-container" style={{ width: '90%', display: 'flex', flexDirection: 'column', gap: '10px', margin: '10px auto' }}>
                            <div id='payment-page-total-price-container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ fontWeight: '400', fontSize: '.8rem', color: 'grey' }}>Total Price</h4>
                                <h4 style={{ fontWeight: '600', fontSize: '.8rem' }}>₹ {totalPrice}</h4>
                            </div>

                            <div id='payment-page-shipping-charges-container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ fontWeight: '400', fontSize: '.8rem', color: 'grey' }}>Shipping Charges</h4>
                                <h4 style={{ fontWeight: '600', fontSize: '.8rem', color: 'green' }}>FREE</h4>
                            </div>

                            <div id='payment-page-handling-charges-container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 style={{ fontWeight: '400', fontSize: '.8rem', color: 'grey' }}>Handeling Charges</h4>
                                <h4 style={{ fontWeight: '600', fontSize: '.8rem' }}>₹ <strike>29</strike> <span style={{ color: 'green' }}>FREE</span></h4>
                            </div>
                        </div>

                        <div id="payment-page-ammount-payable-container" style={{ display: 'flex', justifyContent: 'space-between', width: '95%', padding: '0px 10px 10px 10px', borderTop: '.5px solid lightgrey', marginTop: '10px' }}>
                            <h4 style={{ color: 'crimson', fontSize: '1.2rem', fontWeight: '500' }}>Amount To Pay</h4>
                            <h4 style={{ color: 'crimson', fontSize: '1.2rem', fontWeight: '500' }}>₹ {totalPrice}</h4>
                        </div>
                    </div>

                    <button id='payment-page-btn-order-now' onClick={(e) => { handleOrderSubmition() }}>Confirm Order</button>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage