import React, { useState } from 'react'
import './Navbar.css'

import 'remixicon/fonts/remixicon.css'
import { Link, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import TrendNestSVG from '../TrendNestSVG'
import axios from 'axios'

const Navbar = ({ user }) => {

    let [newUser, setNewUser] = useState({
        userId:user.userId,
        userName : user.userName,
        email : user.email,
        password : user.password,
        address : user.address,
        mobileNumber : user.mobileNumber
    })

    let setNewUserData = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name] : e.target.value
        })
    }

    const validEmail = async () => {
        try {
            let isValid = true;
            const response = await axios.get('http://localhost:8080/user/getAllUsers');
    
            if (!response.data || response.data.length === 0) {
                alert('Something went wrong, try again later..!');
                return false;
            }
    
            for (let elem of response.data) {
                if (newUser.email === elem.email && newUser.userId !== elem.userId) {
                    console.log("newUser : ", newUser)
                    console.log("elem : ", elem)
                    alert('Email already exists, enter another email address');
                    return false;
                } else if (newUser.mobileNumber === elem.mobileNumber && newUser.userId !== elem.userId) {
                    alert('Mobile number already exists, enter another mobile number');
                    return false;
                }
            }
    
            return true;
        } catch (error) {
            alert('Error while checking valid email..');
            return false;
        }
    };
    
    let handleOnUpdate = async () => {

        // console.log("email : ", newUser.email.includes('@gmail.com'))
        // console.log("mob Num :", newUser.mobileNumber.length)
        // console.log("user Name : ",(newUser.userName.trim()).includes(" "))
        // console.log("user Name : ",(newUser.userName))
        // console.log("user Name : ",(newUser.userName).indexOf(" "))
        // console.log("address : ", newUser.address.length > 0)

        let isValid = await validEmail();

        if( newUser.email.includes('@gmail.com') && 
            newUser.mobileNumber.length == 10 && 
            (newUser.userName.includes(" ") == false) && 
            newUser.address.length > 0 &&
            isValid
        ) 
        {
            axios.put('http://localhost:8080/user/updateUser', newUser)
            .then((response)=>{
                // console.log("Updated User : ",response.data)
                if(response.data != "") {
                    alert("User Update DONE...!")
                    hideUpdateContainer()
                    user = newUser
                    navigateTo('/userHome/', { state: { user } })
                }
            })
            .catch((err) => {
                alert("Error While Updating User...!")
            })
        }
        else {
            console.log("Not OK")
        }
    }

    let [slidingValue, setSlidingValue] = useState(-110)
    let [displayOfuserProfileContainer, setDisplayOfuserProfileContainer] = useState('none')

    let navigateTo = useNavigate()

    let redirectToCartMainPage = (userData) => {
        console.log("Redirecting To Cart Main Page User Is : ", userData.userName)
        navigateTo('/cartpage', { state: { user } })
    }

    let redirectToOrdersMainPage = (userData) => {
        console.log("Redirecting To Order Page User Is : ", userData.userName)
        navigateTo('/orderpage', { state: { user } })
    }

    useGSAP(() => {
        let tl1 = gsap.timeline()

        tl1.from("#navbar", {
            y: -100,
            opacity: 0,
            duration: .5
        })
        tl1.from(".nav-left-items", {
            y: -20,
            opacity: 0,
            stagger: .2
        })
    })

    let hideUpdateContainer = () => {
        let tl = gsap.timeline()
        tl.to('#user-update-profile', {
            y: -50,
            opacity: 0
        })
        tl.to('#user-update-profile-container', {
            display:'none'
        })
    }
    let showUpdateContainer = () => {
        let tl = gsap.timeline()
        tl.to('#user-update-profile-container', {
            display:'flex'
        })
        tl.to('#user-update-profile', {
            y: 0,
            opacity : 1
        })
    }

    return (
        <nav id='navbar'>
            <div id="user-profile-container" style={{ display: displayOfuserProfileContainer }}>
                <div id="user-profile" style={{ transform: `translateX(${slidingValue}%)` }}>
                    <img src='/src/assets/profile.webp' alt="Profile" id='user-profile' style={{ cursor: 'pointer', height: '100px', width: '100px', borderRadius: '100%', margin: '5px 0px 0px 0px' }} />

                    {/* <input type="text" className='user-profile-inputs' id='user-profile-name' value={user.name} />
                    <input type="text" className='user-profile-inputs' id='user-profile-email' value={user.email} /> */}
                    <input type="text" style={{ fontSize: 'xx-large' }} className='user-profile-inputs' id='user-profile-name' value={newUser.userName} />
                    <input type="text" style={{ fontSize: 'medium' }} className='user-profile-inputs' id='user-profile-email' value={newUser.email} />

                    <div style={{display:'flex', gap:'10px'}}>
                    <button id='user-edit-profile-button' onClick={showUpdateContainer}>Edit Profile</button>
                    <button id='user-profile-order-page-button' onClick={(e) => { redirectToOrdersMainPage(user) }}>Orders</button>
                    </div>

                    <i
                        className="ri-close-line"
                        id='user-profile-minimize'
                        onClick={(e) => {
                            setSlidingValue(-110)
                            setTimeout(() => {
                                setDisplayOfuserProfileContainer('none')
                            }, 400)
                        }}
                    ></i>
                </div>
            </div>

            <div id='user-update-profile-container' style={{display:'none'}}>
                <div id='user-update-profile'>
                    <div id='user-update-user-name-container'>
                        <label htmlFor="userName">User Name</label>
                        <input onChange={setNewUserData} type="text" id='userName' value={newUser.userName} name='userName' placeholder='User Name..' />
                    </div>

                    <div id='user-update-user-password-container'>
                        <label htmlFor="password">Password</label>
                        <input onChange={setNewUserData} type="password" value={newUser.password} readOnly disabled id='password' name='password' placeholder='password..' />
                    </div>

                    <div id='user-update-user-email-container'>
                        <label htmlFor="email">Email Id</label>
                        <input onChange={setNewUserData} type="email" id='email' value={newUser.email} name='email' placeholder='Email Id..' />
                    </div>

                    <div id='user-update-user-mobnumber-container'>
                        <label htmlFor="mobileNumber">Mobile No.</label>
                        <input onChange={setNewUserData} type="number" id='mobileNumber' value={newUser.mobileNumber} name='mobileNumber' placeholder='Mobile Number..' />
                    </div>

                    <div id='user-update-user-address-container'>
                        <textarea onChange={setNewUserData} name="address" id="userAddress" value={newUser.address} placeholder='Address..'></textarea>
                    </div>

                    <div id='user-update-btn-container'>
                        <button id='user-update-profile-btnUpdate' onClick={(e)=>{handleOnUpdate(e)}}>Update</button>
                        <button id='user-update-profile-btnCancel' onClick={hideUpdateContainer}>Cancel</button>
                    </div>

                </div>
            </div>

            <div className="left-nav-components">
                <h2 id='logo'>
                    <TrendNestSVG />
                </h2>
                <Link className='nav-left-items' to='/userhome/womens' state={{ user: user }}>women</Link>
                <Link className='nav-left-items' to='/userhome/mens' state={{ user: user }}>men</Link>
                <Link className='nav-left-items' to='/userhome/kids' state={{ user: user }}>kids</Link>
                <Link className='nav-left-items' to='/userhome' state={{ user: user }}>Home</Link>
            </div>

            {/* {
                console.log("Navbar : ", user)
            } */}

            <div className="right-nav-components">
                

                <div className='nav-right-items'>
                    <h5 className='nav-left-items' onClick={() => { redirectToCartMainPage(user) }}>Cart</h5>
                </div>

                <div className='nav-right-items'>
                    <h5 className='nav-left-items' onClick={() => {
                        setDisplayOfuserProfileContainer('inline-block')
                        // setTimeout(setSlidingValue(0),400)
                        setTimeout(() => {
                            setSlidingValue(0)
                        }, 400)
                    }}
                    >profile</h5>
                </div>

            </div>
        </nav>
    )
}

export default Navbar