import React, { useState } from 'react'
import './SellerLogIn.css'
import { Link, useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const SellerLogIn = () => {

    let [sellerName, setSellerName] = useState('')
    let [password, setPassword] = useState('')

    let [showPass, setShowPass] = useState('inline-block')
    let [hidePass, setHidePass] = useState('none')
    let [passwordInputType, setPasswordInputType] = useState('password')
    const [hideForm, setHideForm] = useState('flex')

    let navigate = useNavigate()

    let gotoHome = () => {
        navigate('/')
    }

    let gotoSellerHome = () => {
        navigate(`/sellerHome/${seller}`)
    }

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

    let updateSeller = (newSeller) => {
        setSeller(newSeller)
    }

    let [seller, setSeller] = useState(null)

    let fetchAllSellers = () => {
        axios.get(`http://localhost:8080/seller/${sellerName}/${password}`)
            .then((response) => {
                if (response.data != "") {
                    updateSeller(response.data)
                    console.log(response.data)
                    navigate("/sellerHome/addproduct", { state: { seller: response.data } });
                }
                else {
                    alert("Invalid Details")
                    updateSeller(null)
                }
            })
            .catch((error) => {
                alert("Something wents wrong")
                console.log(error)
                setSeller(null)
            })
    }

    useGSAP(()=>{
        gsap.from("#seller-log-in-container", {
            scale:.7,
            duration: 1,
            opacity : 0,
        })
    })

    return (
        <div id='seller-log-in-main-container'>
            <h1 style={{fontSize:'4rem', position:'absolute', textAlign:'center', width:'100%', fontWeight:'400', color:'silver'}}>Welcome To TrendNest</h1>
            <div id='seller-log-in-container' style={{ display: hideForm }}>

                <form id="seller-log-in-form">
                    <div id='seller-name-container'>
                        <label htmlFor="seller-name" id='seller-name-label'>Seller Name</label>
                        <input
                            type="text"
                            name="seller-name"
                            id="seller-name-input"
                            placeholder='Enter Seller Name..'
                            onChange={(e) => { setSellerName(e.target.value) }}
                        />
                    </div>

                    <div id='seller-password-container'>
                        <label htmlFor="seller-password" id='seller-password-label'>Password</label>
                        <input
                            type={passwordInputType}
                            name="seller-password"
                            id="seller-password-input"
                            placeholder='Enter Password..'
                            value={password}
                            onChange={
                                (e) => {
                                    setPassword(e.target.value)
                                }
                            }
                        />
                        <i className="ri-eye-off-line toggle" id='open-eye' style={{ display: showPass }} onClick={() => { showPassword() }}></i>
                        <i className="ri-eye-line toggle" id='close-eye' style={{ display: hidePass }} onClick={() => { hidePassword() }}></i>
                    </div>

                    <button
                        id='seller-logIn-btnSubmit'
                        onClick={
                            (e) => {
                                e.preventDefault()
                                fetchAllSellers()
                            }
                        }
                    >Log In</button>
                    <Link to='/sellerRegistration' id='sellerRegistration-form-link'>New Seller ?</Link>
                </form>
                <i className="ri-close-line" id='seller-log-in-minimize' onClick={() => { hideSellerLogInForm() }}></i>
                {/* <>
        <p>{seller ? seller.sellerName : "Not Found"}</p>
</> */}
            </div>
        </div>
    )
}

export default SellerLogIn