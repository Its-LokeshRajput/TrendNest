import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import './UserRegistration.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const UserRegistration = () => {

    let [user, setUser] = useState({
        userName: '',
        password: '',
        address: '',
        email: '',
        mobileNumber: ''
    })

    let navigate = useNavigate()
    let [password, setPassword] = useState('')

    let [showPass, setShowPass] = useState('inline-block')
    let [hidePass, setHidePass] = useState('none')
    const [passwordInputType, setPasswordInputType] = useState('password')
    let [hideRegistrationForm, setHideRegistrationForm] = useState('flex')

    let gotoHome = () => {
        navigate('/')
    }

    let gotoLogIn = () => {
        navigate('/userLogIn')
    }

    let hideUserRegistrationForm = () => {
        setHideRegistrationForm('none')
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

    let setData = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    let submiteUserToDB = async (userParam) => {
        axios.post('http://localhost:8080/user/addUser', userParam, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(response)
                if ((response.data) == "") {
                    alert("UserName is not available, use another user Name.. And Note : Password length should be AT least 8 characters")
                }
                else {
                    console.log("Data : " + response.data)
                    alert("Successfully Registered..")
                    return response.data
                }
            })
            .catch((err) => {
                alert("Something wents wrong.. OR Check Passwords Length..", err)
            })
    }

    useGSAP(()=>{
        gsap.from("#user-registration-container", {
            scale : .7,
            opacity: 0,
            duration:1
        })
    })

    return (
        <div id='user-registration-main-container'>
            <h1 style={{position:'absolute', width:'100%', textAlign:'center', color:'silver', fontWeight:'400', fontSize:'3.5rem'}}>Register Your self at TrendNest</h1>
            <div id='user-registration-container' style={{ display: hideRegistrationForm }}>
                <form id='user-registration-form'>

                    <div id='user-name-container'>
                        <label htmlFor="userName">UserName</label>
                        <input
                            type="text"
                            name="userName"
                            id="user-name-input"
                            onChange={(e) => {
                                setData(e)
                            }}
                            placeholder='Set UserName..'
                        />
                    </div>

                    <div id='user-password-container'>
                        <label htmlFor="userPassword">Password</label>
                        <input
                            type={passwordInputType}
                            name="password"
                            value={password}
                            id="user-password-input"
                            placeholder='(min 8 character)'
                            onChange={(e) => {
                                console.log(password)
                                setPassword(e.target.value)
                                setData(e)
                            }}
                        />
                        <i className="ri-eye-off-line toggle" id='open-eye' style={{ display: showPass }} onClick={() => { showPassword() }}></i>
                        <i className="ri-eye-line toggle" id='close-eye' style={{ display: hidePass }} onClick={() => { hidePassword() }}></i>
                    </div>

                    <div id='user-confirm-password-container'>
                        <label htmlFor="userConfirmPassword">Confirm Password</label>
                        <input
                            type='password'
                            name="userConfirmPassword"
                            id="user-confirm-password-input"
                            placeholder='Confirm Password...'
                            onChange={(e) => {
                                if (e.target.value == password) {
                                    e.target.style.borderColor = 'green'
                                }
                                else {
                                    // e.target.style = {borderColor:'red'}
                                    e.target.style.borderColor = 'red'
                                }
                            }}
                        />
                    </div>

                    <div id="user-email-container">
                        <label htmlFor="userEmail">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="userEmail"
                            placeholder='Email ID..'
                            onChange={
                                (e) => {
                                    setData(e)
                                }
                            }
                        />
                    </div>

                    <div id="user-mobile-number-container">
                        <label htmlFor="userMobileNumber">Mobile Number</label>
                        <input
                            type="number"
                            name="mobileNumber"
                            id="userMobileNumber"
                            placeholder='XXXXXXXXXX'
                            onChange={
                                (e) => { setData(e) }
                            }
                        />
                    </div>

                    <div id="user-address-container" >
                        {/* <label htmlFor="userAddress" style={{backgroundColor:'blue', position:'relative', top:'0px'}}>Address</label> */}
                        <textarea
                            name="address"
                            id="userAddress"
                            placeholder='Enter Permanent Address..'
                            rows={3}
                            onChange={
                                (e) => { setData(e) }
                            }
                        />
                    </div>

                    <button
                        id='btnSubmit'
                        onClick={
                            (e) => {
                                e.preventDefault()

                                if ((user.email.substring(user.email.indexOf('@')) == "@gmail.com")) {
                                    submiteUserToDB(user)
                                }
                                else {
                                    alert("Invalid Email id..")
                                }
                            }
                        }
                    >Sign UP
                    </button>
                    <Link id='linkRegistration' to='/'>Alreary Register?</Link>
                </form>
                <i className="ri-close-line" id='user-registration-minimize' onClick={() => { hideUserRegistrationForm() }}></i>
            </div>
        </div>
    )
}

export default UserRegistration


// address
// email
// mobile_number

// password
// user_name