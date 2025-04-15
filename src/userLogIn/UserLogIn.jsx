import React, { useState } from 'react'
import './UserLogIn.css'
import 'remixicon/fonts/remixicon.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const UserLogIn = () => {

    let [user, setUser] = useState(null)

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate()

    let [showPass, setShowPass] = useState('inline-block')
    let [hidePass, setHidePass] = useState('none')
    const [passwordInputType, setPasswordInputType] = useState('password')
    let [hideForm, setHideForm] = useState('flex')

    let gotoHome = () => {
        navigate('/')
    }

    let hideUserLogInForm = () => {
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

    // Correct state update for user
    let updateUser = (newUserData) => {
        setUser(newUserData)  // Update user directly
    }

    let isUserAvailable = async () => {
        console.log(userName, " ", password)
        await axios.get(`http://localhost:8080/user/${userName}/${password}`)
            .then(async (resolve) => {
                console.log(resolve)
                if (resolve.data != "") {
                    alert("updating user")
                    localStorage.setItem("userPageVisited", "false");
                    console.log(resolve.data)
                    updateUser(resolve.data)  // Update user after successful response
                    navigate("/userhome", { state: { user: resolve.data } });
                }
                else {
                    alert("Invalid User Details");
                    updateUser(null)
                }
            })
            .catch((err) => {
                setUser(null)
                console.log(err)
            })
    }

    useGSAP(()=>{
        
        gsap.from("#user-log-in-container", {
            scale:.5,
            duration: 1,
            opacity : 0,
        })
    })

    return (
        <div id='user-log-in-main-page'>
            <h1 style={{fontSize:'4rem', position:'absolute', textAlign:'center', width:'100%', fontWeight:'400', color:'silver'}}>Welcome To TrendNest</h1>
            <div id='user-log-in-container' style={{ display: hideForm }}>
                <form id='user-log-in-form'>

                    <div id='user-name-container'>
                        <label htmlFor="userName">UserName</label>
                        <input
                            type="text"
                            name="userName"
                            id="user-name-input"
                            value={userName}
                            placeholder='Enter User Name...'
                            onChange={
                                (e) => {
                                    setUserName(e.target.value)
                                }
                            }
                        />
                    </div>

                    <div id='user-password-container'>
                        <label htmlFor="userPassword">Password</label>
                        <input
                            type={passwordInputType}
                            name="userPassword"
                            id="user-password-input"
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
                        id='btnSubmit'
                        onClick={
                            async (e) => {
                                e.preventDefault()
                                await isUserAvailable()

                                // console.log(user ? user : "Getting..")
                            }
                        }>
                        Sign IN
                    </button>

                    <div id='user-log-in-other-links'>
                        <Link id='logInLink' to='/userRegistration'>New Customer?</Link><br />
                        <Link id='logInLink' to='/sellerLogIn'>Are You Seller?</Link><br />
                        <Link id='logInLink' to='/adminLogIn'>Are You Admin?</Link><br />
                    </div>

                </form>
                {/* <i className="ri-close-line" id='user-log-in-minimize' onClick={() => { hideUserLogInForm() }}></i> */}
            </div>
        </div>
    )
}

export default UserLogIn
