import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import './SellerRegistration.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const SellerRegistration = () => {

    let [sellerData, setSellerData] = useState({
        sellerName: '',
        sellerAddress: '',
        storeName: '',
        storeDesc: '',
        password: '',
        sellerMobNumber: '',
        gstinNumber: ''
    })

    let navigate = useNavigate()

    let gotoSellerLogIn = () => {
        navigate('/sellerLogIn')
    }

    let [showPass, setShowPass] = useState('inline-block')
    let [hidePass, setHidePass] = useState('none')
    let [passwordInputType, setPasswordInputType] = useState('password')
    const [hideForm, setHideForm] = useState('flex')

    let hideSellerLogInForm = () => {
        setHideForm('none')
        gotoHome()
    }

    let showPassword = () => {
        setShowPass('none')
        setHidePass('inline-block')
        setPasswordInputType('text')
    }

    let hidePassword = () => {
        setShowPass('inline-block')
        setHidePass('none')
        setPasswordInputType('password')
    }

    let postSellerData = (newSeller) => {
        axios.post('http://localhost:8080/seller/addSeller', newSeller)
            .then((resposnse) => {
                if (resposnse.data == "") {
                    alert('Empty Fields not allowed')
                }
                else {
                    console.log(resposnse.data)
                    alert("Successfully Registered..")
                    gotoSellerLogIn()
                }
            })
            .catch(error => alert('Enter Data Correctly'))
    }

    let handleSubmition = (e) => {
        e.preventDefault()
        console.log(postSellerData(sellerData))
    }

    let handleSellerData = (e) => {
        setSellerData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    let isValidSellerName = () => {
        let sellerName = sellerData.sellerName;

        if (sellerName.includes(" ")) {
            return false
        }
        if (sellerName.length > 8) {
            return true
        }
        return false
    }

    let isValidPassword = () => {
        let password = sellerData.password
        if (password.length >= 8) {
            return true
        }
        return false
    }

    let isValidStoreName = () => {
        let storeName = sellerData.storeName
        if (storeName.length > 0) {
            return true
        }
        return false
    }

    let isValidSellerAddress = () => {
        let sellerAddress = sellerData.sellerAddress
        if (sellerAddress.length > 20) {
            return true
        }
        return false
    }

    let isValidstoreDesc = () => {
        let storeDesc = sellerData.storeDesc
        if (storeDesc.length > 40) {
            return true
        }
        return false
    }

    let isValidSellerMobNumber = () => {
        let sellerMobNumber = sellerData.sellerMobNumber
        if (sellerMobNumber.length == 10) {
            return true
        }
        return false
    }

    let isValidGstinNumber = () => {
        let gstinNumber = sellerData.gstinNumber
        if (gstinNumber.length >= 15) {
            return true
        }
        return false
    }

    useGSAP(()=>{
        gsap.from("#seller-registration-container", {
            scale:.7,
            duration: 1,
            opacity : 0,
        })
    })

    return (
        <div id='seller-registration-main-container'>
            <h1 style={{fontSize:'3.5rem', position:'absolute', textAlign:'center', width:'100%', fontWeight:'400', color:'silver'}}>Register Your Self at TrendNest</h1>
            <div id='seller-registration-container'>
                <form id="seller-registration-form">

                    <div id="right-left-container">

                        <div id="right">
                            <div id="seller-name-container">
                                <label htmlFor="sellerName">Seller Name</label>
                                <input
                                    type="text"
                                    name="sellerName"
                                    id="seller-name-input"
                                    placeholder='Enter Your Name..'
                                    onChange={(e) => { handleSellerData(e) }}
                                />
                            </div>

                            <div id="seller-password-container">
                                <label htmlFor="password">Password</label>
                                <input
                                    type={passwordInputType}
                                    name="password"
                                    id="seller-password-input"
                                    placeholder='Min length 8..'
                                    onChange={(e) => { handleSellerData(e) }}
                                />

                                <i className="ri-eye-off-line toggle" id='open-eye' style={{ display: showPass }} onClick={() => { showPassword() }}></i>
                                <i className="ri-eye-line toggle" id='close-eye' style={{ display: hidePass }} onClick={() => { hidePassword() }}></i>
                            </div>

                            <div id="seller-confirm-password-container">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" name="confirmPassword" id="seller-confirm-password-input" placeholder='Confirm Passowrd..' />
                            </div>
                        </div>

                        <div id="left">
                            <div id="seller-store-name-container">
                                <label htmlFor="storeName">Store Name</label>
                                <input
                                    type="text"
                                    name="storeName"
                                    id="seller-store-name-input"
                                    placeholder='Enter Store Name..'
                                    required
                                    onChange={(e) => { handleSellerData(e) }}
                                />
                            </div>

                            <div id="seller-seller-mobNumber-container">
                                <label htmlFor="sellerMobNumber">Mobile Number</label>
                                <input
                                    type="number"
                                    name="sellerMobNumber"
                                    id="seller-seller-mobnumber-input"
                                    placeholder='XXXXXXXXXX'
                                    max={10}
                                    onChange={(e) => { handleSellerData(e) }}
                                />
                            </div>

                            <div id="seller-gstinNumber-container">
                                <label htmlFor="gstinNumber">GSTIN Number</label>
                                <input
                                    type="text"
                                    name="gstinNumber"
                                    id="seller-gstinNumber-input"
                                    placeholder='Enter GSTIN Number..'
                                    onChange={(e) => { handleSellerData(e) }}
                                />
                            </div>
                        </div>
                    </div>

                    <div id="seller-store-desc-container">
                        <textarea
                            type="text"
                            name="storeDesc"
                            id="seller-store-desc-input"
                            placeholder='Describe About Store..'
                            rows={5}
                            onChange={(e) => { handleSellerData(e) }}
                        />
                    </div>

                    <div id="seller-seller-address-container">
                        <textarea
                            type="text"
                            name="sellerAddress"
                            id="seller-seller-address-input"
                            placeholder='Enter full Permanent store Address with PINCODE and Landmark (min Length 20 characters)..'
                            rows={4}
                            onChange={(e) => { handleSellerData(e) }}
                        />
                    </div>

                    <button
                        id='btnRegister-seller'
                        onClick={
                            (e) => {
                                if (
                                    isValidSellerName() &&
                                    isValidPassword() &&
                                    isValidStoreName() &&
                                    isValidSellerAddress() &&
                                    isValidstoreDesc() &&
                                    isValidSellerMobNumber() &&
                                    isValidGstinNumber()
                                ) {
                                    handleSubmition(e)
                                }
                                else {
                                    alert('Some Thing wents Wrong')
                                }
                            }
                        }
                    >Register</button>
                    <Link to='/sellerLogIn' id='linkTo-seller-logIn' >Already Have Account ?</Link>
                </form>

                {/* <div>
                    {sellerData ? sellerData.sellerName : 'Loading'}
                    {sellerData ? sellerData.sellerAddress : 'Loading'}
                    {sellerData ? sellerData.storeDesc : 'Loading'}
                    {sellerData ? sellerData.storeName : 'Loading'}
                    {sellerData ? sellerData.password : 'Loading'}
                    {sellerData ? sellerData.sellerMobNumber : 'Loading'}
                    {sellerData ? sellerData.gstinNumber : 'Loading'}
            </div> */}
            </div>
        </div>
    )
}

export default SellerRegistration

// seller_name
// store_name
// store_desc
// password
// seller_address
// seller_mob_number
// gstin_number

/*
    @NotNull
    private String sellerName;
	
    @NotNull
    private String sellerAddress;
	
    @NotNull
    private String storeName;
	
    @NotNull
    private String storeDesc;
	
    @Size(min=8)
    private String password;
	
    @Size(min=10,max=10)
    private String sellerMobNumber;
	
    @Size(min=15,max=15)
    private String gstinNumber;
*/