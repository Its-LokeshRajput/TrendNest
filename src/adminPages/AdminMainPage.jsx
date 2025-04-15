import React, { useRef, useState } from 'react'
import './AdminMainPage.css'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import VeiwSellers from './VeiwSellers'
import VeiwUsers from './VeiwUsers'
import 'remixicon/fonts/remixicon.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'

const AdminMainPage = () => {
    let location = useLocation()
    let { admin } = location.state || {}

    let [slidingValue, setSlidingValue] = useState(-110)
    let [displayOfAdminProfileContainer, setDisplayOfAdminProfileContainer] = useState('none')
    let [displayOfAdminUpdateContainer, setDisplayOfAdminUpdateContainer] = useState('none')

    let inputRefs = useRef([])

    console.log("admin Data : ", admin)

    let [oldAdmin, setOldAdmin] = useState(admin)
    console.log("old Admin : ",oldAdmin)

    let [newAdmin, setNewAdmin] = useState({
        adminId: oldAdmin.adminId,
        name: "",
        email: "",
    });

    let setNewAdminName = (evt) => {
        setNewAdmin(prevAdmin => ({
            ...prevAdmin, // Keep other properties
            name: evt.target.value // Update only the name
        }));
    }

    let setNewAdminEmail = (evt) => {
        setNewAdmin(prevAdmin => ({
            ...prevAdmin, // Keep other properties
            email: evt.target.value // Update only the name
        }));
    }


    useGSAP(() => {
        let tl1 = gsap.timeline()
        tl1.from("#admin-nav", {
            y: -100,
            duration: 1,
            opacity: 0,
        })
        tl1.from(".admin-nav-items", {
            y: -10,
            duration: .5,
            opacity: 0,
            stagger: .3,
        })
    })

    let handleUpdateAdminDetail = (evt) => {
        setDisplayOfAdminUpdateContainer("flex")
    }

    let resetUpdateAdminForm = () => {
        inputRefs.current.forEach((inputBox) => {
            inputBox.value = ""
        })
    }

    let handleUpdateAdmin = (evt) => {
        // console.log(newAdmin);
        if(newAdmin.name != "" && newAdmin.email != "" && !newAdmin.name.includes(' ')) {
            if(newAdmin.email.includes('@gmail.com')) {
                axios.put('http://localhost:8080/admin/updateAdmin', newAdmin)
                .then(response => {
                    console.log("Admin updated:", response.data)
                    setOldAdmin(newAdmin)
                    setDisplayOfAdminUpdateContainer("none")

                    resetUpdateAdminForm()
                })
                .catch(error => console.error("Error updating admin:", error));
            }
            else {
                alert('Invalid Email Id..')
            }
        }
        else {
            alert("Fields Cannot be empty.. or Avoid to add space in Admin Name...")
        }

        
    }

    let handleCancelUpdateAdmin = (evt) => {
        setDisplayOfAdminUpdateContainer("none")
        resetUpdateAdminForm()
    }


    return (
        <div id='admin-main-page-container'>

            <div id="admin-profile-container" style={{ display: displayOfAdminProfileContainer }}>
                <div id="admin-profile" style={{ transform: `translateX(${slidingValue}%)` }}>
                    <img src='/src/assets/profile.webp' alt="Profile" id='admin-profile' style={{ cursor: 'pointer', height: '100px', width: '100px', borderRadius: '100%', margin: '5px 0px 0px 0px' }} />

                    {/* <input type="text" className='admin-profile-inputs' id='admin-profile-name' value={admin.name} />
                    <input type="text" className='admin-profile-inputs' id='admin-profile-email' value={admin.email} /> */}
                    <input type="text" className='admin-profile-inputs' id='admin-profile-name' value={oldAdmin.name} />
                    <input type="text" className='admin-profile-inputs' id='admin-profile-email' value={oldAdmin.email} />

                    <button id='admin-edit-profile-button' onClick={(evt) => { handleUpdateAdminDetail(evt) }}>Edit Profile</button>

                    <i
                        className="ri-close-line"
                        id='admin-profile-minimize'
                        onClick={(e) => {
                            setSlidingValue(-110)
                            setTimeout(() => {
                                setDisplayOfAdminProfileContainer('none')
                            }, 400)
                        }}
                    ></i>
                </div>
            </div>

            <div id='update-admin-details-container' style={{ display: displayOfAdminUpdateContainer }}>
                <div id='update-admin-form'>
                    <label htmlFor="adminName">
                        Name <input type="text" ref={(el) => inputRefs.current[0] = el} onChange={(evt) => { setNewAdminName(evt) }} placeholder='Admin Name..' />
                    </label>
                    <label htmlFor="adminName">
                        Email <input type="email" ref={(el) => inputRefs.current[1] = el} onChange={(evt) => { setNewAdminEmail(evt) }} placeholder='Email..' />
                    </label>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={(evt) => { handleUpdateAdmin(evt) }}>Update</button>
                        <button style={{ backgroundColor: 'crimson' }} onClick={(evt) => { handleCancelUpdateAdmin(evt) }}>Cancel</button>
                    </div>
                </div>
            </div>

            <nav id="admin-nav">
                {/* <img src='./profile.webp' alt="Profile" id='admin-profile'/> */}
                <img
                    className='admin-nav-items'
                    src='/src/assets/profile.webp'
                    alt="Profile"
                    id='admin-profile'
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        setDisplayOfAdminProfileContainer('inline-block')
                        // setTimeout(setSlidingValue(0),400)
                        setTimeout(() => {
                            setSlidingValue(0)
                        }, 400)
                    }}
                />
                <ul id='admin-page-nav-links-container'>
                    <Link className='admin-nav-items' to='/adminHome' state={{ admin }} id='veiw-sellers'>Veiw-Sellers</Link>
                    <Link className='admin-nav-items' to='/adminHome/veiwusers' state={{ admin }} id='veiw-users'>Veiw-Users</Link>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<VeiwSellers />} />
                <Route path='/veiwusers' element={<VeiwUsers />} />
            </Routes>

            {/* Admin Profile Container */}
        </div>
    )
}

export default AdminMainPage