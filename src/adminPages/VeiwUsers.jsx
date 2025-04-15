import React, { useEffect, useState } from 'react'
import './VeiwUsers.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const VeiwUsers = () => {

  const [users, setUsers] = useState([])

  useGSAP(()=>{
    let tl1 = gsap.timeline()

    tl1.from("#veiw-users-title", {
      y: 50,
      duration: .5,
      opacity: 0,
    })
    tl1.from("#view-user-table", {
      y: 50,
      duration: .5,
      opacity: 0,
      stagger: .3,
    })
  })

  let fetchUsers = () => {
    axios.get('http://localhost:8080/user/getAllUsers')
      .then((response) => {
        // console.log("In Response Block, printing response : ")
        // console.log(response)
        return response.data
      })
      .then((data) => {
        // console.log("In Response.Data Block, printing data : ")
        // console.log(data)
        setUsers(data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div id='veiw-users-container'>
      <h1 id='veiw-users-title'>users Information</h1>
      <div id='veiw-users-information-container'>
        {/* <div id='veiw-users-information-header'>
          <h4 style={{ width: '20px' }} id='user-id'>ID</h4>
          <h4 style={{ width: '150px' }} id='user-name'>user-name</h4>
          <h4 style={{ width: '100px' }} id='user-email'>Email ID</h4>
          <h4 style={{ width: '250px' }} id='user-address'>Address</h4>
          <h4 style={{ width: '150px' }} id='user-mobile-no'>Mobile Number</h4>
        </div>

        {
          // console.log(users)
          (users != "")
          ?
            (users.map(
              (user, i) => {
                return (
                  <div key={i} id='veiw-users-information'>
                    <h4 style={{ width: '20px' }} id='user-id'>{user.userId}</h4>
                    <h4 style={{ width: '150px' }} id='user-name'>{user.userName}</h4>
                    <h4 style={{ width: '100px' }} id='user-email'>{user.email}</h4>
                    <h4 style={{ width: '250px' }} id='user-address'>{user.address}</h4>
                    <h4 style={{ width: '150px' }} id='user-mobile-no'>{user.mobileNumber}</h4>
                  </div>
                )
              })
            ) 
            :
            <h1 style={{ width: '100%', textAlign: 'center', marginTop: '20px', fontWeight: '400' }}>No Users</h1>
        } */}

        <table id='view-user-table'>
          <thead id='view-user-table-header-container'>
            <tr id='veiw-users-information-header'>
              <th id='user-id'>ID</th>
              <th id='user-name'>user-name</th>
              <th id='user-email'>Email ID</th>
              <th id='user-address'>Address</th>
              <th id='user-mobile-no'>Mobile Number</th>
            </tr>
          </thead>
          <tbody id='view-user-table-body-container'>
            {
              // console.log(users)
              (users != "")
                ?
                (users.map(
                  (user, i) => {
                    return (
                      <tr key={i} id='veiw-users-information'>
                        <td id='user-id'>{user.userId}</td>
                        <td id='user-name'>{user.userName}</td>
                        <td id='user-email'>{user.email}</td>
                        <td id='user-address'>{user.address}</td>
                        <td id='user-mobile-no'>{user.mobileNumber}</td>
                      </tr>
                    )
                  })
                )
                :
                <h1 style={{ width: '100%', textAlign: 'center', marginTop: '20px', fontWeight: '400' }}>No Users</h1>
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default VeiwUsers