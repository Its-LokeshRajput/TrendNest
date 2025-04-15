import React, { useState } from 'react'
import './AdminRegistration.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const AdminRegistration = () => {

    const [adminData, setAdminData] = useState({
        name : '',
        password : '',
        email : ''
    })

    let [showPass, setShowPass] = useState('inline-block')
    let [hidePass, setHidePass] = useState('none')
    let [passwordInputType, setPasswordInputType] = useState('password')
    const [hideForm, setHideForm] = useState('flex')

    let navigate = useNavigate()

    let gotoHome = () => {
        navigate('/')
    }

    let gotoAdminLogIn = () => {
        navigate('/adminLogIn')
    }

    let hideAdminRegistrationForm = () => {
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

    let isValidAdminPassword = () => {
        let pass = adminData.password
        if(pass.length >= 8) {
            return true
        }
        return false
    }

    let isValidAdminEmail = () => {
        let email = (adminData.email).toString();
        console.log(typeof email)
        if(email.endsWith('@gmail.com')) {
            return true
        }
        return false
    }


    let isValidAdminName = () => {
        let name = adminData.name
        if(name.includes(' ')) {
            return false
        }
        if(name.length > 0) {
            return true
        }
        return false
    }

    let handleSubmition = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/admin/addAdmin', adminData)
        .then((response)=>{
            console.log(response.data)
            alert('Successfully Registered..')
            gotoAdminLogIn()
        })
        .catch(error => console.log(error))
    }

    let handleAdminData = (e) => {
        setAdminData((prevData)=>({
            ...prevData,
            [e.target.name] : e.target.value.trim()
        }))
    }

    useGSAP(()=>{
        gsap.from("#admin-registration-container", {
            scale:.5,
            duration: 1,
            opacity : 0,
        })
    })

    return (
        <div id='admin-registration-main-container'>
            <h1 style={{fontSize:'4rem', position:'absolute', textAlign:'center', width:'100%', fontWeight:'400', color:'silver'}}>Register Your Self at TrendNest</h1>
            <div id='admin-registration-container'>
            <form id='admin-registration-form'>

                <div id="admin-name-container">
                    <label htmlFor="adminName">Admin Name</label>
                    <input 
                        type="text" 
                        name='name' 
                        id='adminNameInput' 
                        placeholder='(Space not Allowed)'
                        onChange={(e) => {handleAdminData(e)}}
                    />
                </div>

                <div id="admin-password-container">
                    <label htmlFor="adminPassword">Password</label>
                    <input 
                        type={passwordInputType} 
                        name='password' 
                        id='adminPasswordInput' 
                        placeholder='(min 8 characters)'
                        onChange={(e) => {handleAdminData(e)}}
                    />

                    <i className="ri-eye-off-line toggle" id='open-eye' style={{ display: showPass }} onClick={() => { showPassword() }}></i>
                    <i className="ri-eye-line toggle" id='close-eye' style={{ display: hidePass }} onClick={() => { hidePassword() }}></i>
                </div>

                <div id="admin-email-container">
                    <label htmlFor="adminEmail">Email</label>
                    <input 
                        type='email' 
                        name='email' 
                        id='adminEmailInput'
                        placeholder='Enter Email Id'
                        onChange={(e) => {handleAdminData(e)}}
                    />
                </div>

                <button id='admin-registration-btnSubmit' onClick={(e)=>{
                    e.preventDefault()
                    if(
                        isValidAdminEmail() &&
                        isValidAdminName() &&
                        isValidAdminPassword()
                    ) {
                        handleSubmition(e)
                    }
                    else {
                        alert('Enter Valid data..')
                    }
                }}>Register</button>
                <Link to='/adminLogIn' id='linkTo-adminLogIn'>Already Have Account ?</Link>
            </form>
            <i className="ri-close-line" id='admin-log-in-minimize' onClick={() => { hideAdminRegistrationForm() }}></i>
        </div>
        </div>
    )
}

export default AdminRegistration

/*
email
name
password

@NotNull
    private String name;
	
    @Size(min=8)
    private String password;
	
    @NotNull
    private String email;
*/