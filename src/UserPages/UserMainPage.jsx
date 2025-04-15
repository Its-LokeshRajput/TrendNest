import React, { useEffect, useState } from 'react'
import './UserMainPage.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from '../navBar/Navbar'
import 'remixicon/fonts/remixicon.css'
import UserHome from './UserHome'
import UserWomens from './UserWomens'
import UserMens from './UserMens'
import UserKids from './UserKids'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const UserMainPage = () => {


    let location = useLocation()
    let { user } = location.state || {}

    useEffect(() => {
        const hasVisited = localStorage.getItem("userPageVisited");
        console.log(hasVisited)
        if (hasVisited == "false") {
            // Run animation only if not visited before
            let tl = gsap.timeline();
            tl.from("#user-main-page-container", {
                width: '0vw',
                height: '0vh',
                duration: 1,
                borderRadius: '100px'
            });
            tl.to("#user-main-page-container", {
                height: 'fit-content',
                duration: 0
            });

            // Mark as visited
            localStorage.setItem("userPageVisited", "true");
        }
    }, [])

   
    return (
        <div id="user-main-page-container">
            <Navbar user={user} />

            <Routes>
                <Route path='/' element={<UserHome />} />
                <Route path='/womens' element={<UserWomens />} />
                <Route path='/mens' element={<UserMens />} />
                <Route path='/kids' element={<UserKids />} />
            </Routes>
        </div>
    )
}

export default UserMainPage