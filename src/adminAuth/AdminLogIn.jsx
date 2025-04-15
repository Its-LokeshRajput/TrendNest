import React, { useState } from 'react'
import './AdminLogIn.css'
import { Link, useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const AdminLogIn = () => {

    let [adminName, setAdminName] = useState('')
    let [password, setPassword] = useState('')

    let [adminData, setAdminData] = useState({})

    let [showPass, setShowPass] = useState('inline-block')
    let [hidePass, setHidePass] = useState('none')
    let [passwordInputType, setPasswordInputType] = useState('password')
    const [hideForm, setHideForm] = useState('flex')

    let navigate = useNavigate()

    let gotoHome = () => {
        navigate('/')
    }

    let gotoAdminMainPage = (admin) => {
        navigate('/adminHome', { state: { admin } })
    }

    let hideAdminLogInForm = () => {
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

    let fetchAllAdmins = async () => {
        let flage = false;
        await axios.get('http://localhost:8080/admin/getAllAdmins')
            .then((response) => {
                (response.data).forEach(admin => {
                    if (admin.name == (adminName) && (admin.password == password)) {
                        flage = true;
                        console.log(admin)
                        setAdminData(admin)
                        gotoAdminMainPage(admin)
                    }
                });
                if(flage == false) {
                    alert('Admin not exist..')
                }
            })
            .catch(error => console.log(error))
    }

    useGSAP(()=>{
        gsap.from("#admin-log-in-container", {
            scale:.5,
            duration: 1,
            opacity : 0,
        })
    })

    return (
        <div id='admin-log-in-main-container'>
            <h1 style={{fontSize:'4rem', position:'absolute', textAlign:'center', width:'100%', fontWeight:'400', color:'silver'}}>Welcome To TrendNest</h1>
            <div id='admin-log-in-container' style={{ display: hideForm }}>

                <form id="admin-log-in-form">
                    <div id='admin-name-container'>
                        <label htmlFor="admin-name" id='admin-name-label'>Admin Name</label>
                        <input
                            type="text"
                            name="admin-name"
                            id="admin-name-input"
                            value={adminName}
                            placeholder='Enter admin Name..'
                            onChange={(e) => { setAdminName(e.target.value) }}
                        />
                    </div>

                    <div id='admin-password-container'>
                        <label htmlFor="admin-password" id='admin-password-label'>Password</label>
                        <input
                            type={passwordInputType}
                            name="admin-password"
                            id="admin-password-input"
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
                        id='admin-logIn-btnSubmit'
                        onClick={
                            (e) => {
                                e.preventDefault()
                                fetchAllAdmins()
                            }
                        }
                    >Log In</button>
                    <Link to='/adminRegistration' id='adminRegistration-form-link'>New admin ?</Link>
                </form>
                <i className="ri-close-line" id='admin-log-in-minimize' onClick={() => { hideAdminLogInForm() }}></i>
            </div>
        </div>
    )
}

export default AdminLogIn