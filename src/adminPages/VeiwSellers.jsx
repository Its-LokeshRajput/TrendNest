import React, { useEffect, useState } from 'react'
import './VeiwSellers.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const VeiwSellers = () => {
  const [sellers, setSellers] = useState([])

  let fetchSellers = () => {
    axios.get('http://localhost:8080/seller/getAllSellers')
      .then((response) => {
        // console.log("In Response Block, printing response : ")
        console.log(response.data)
        return response.data
      })
      .then((data) => {
        // console.log("In Response.Data Block, printing data : ")
        // console.log(data)
        setSellers(data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchSellers()
  }, [])

  useGSAP(() => {
    let tl1 = gsap.timeline()
    tl1.from("#veiw-sellers-title", {
      y: 50,
      duration: .5,
      opacity: 0,
    })
    tl1.from("#view-sellers-table", {
      y: 50,
      duration: .5,
      opacity: 0,
      stagger: .3,
    })
  })

  return (
    <div id='veiw-sellers-container'>
      <h1 id='veiw-sellers-title'>Sellers Information</h1>
      <div id='veiw-sellers-information-container'>
        <table id='view-sellers-table'>
          <thead id='view-sellers-table-header-container'>
            <tr id='veiw-sellers-information-header'>
              <th id='seller-id'>ID</th>
              <th id='seller-name'>Seller-name</th>
              <th id='seller-store-name'>Store-Name</th>
              <th id='seller-address'>Seller-Address</th>
              <th id='seller-store-description'>Store-Description</th>
              <th id='seller-store-gstin-no'>GSTIN Number</th>
            </tr>
          </thead>
          <tbody id='view-sellers-table-body-container'>
            {
              (sellers != "")
                ?
                (sellers.map(
                  (seller, i) => {
                    return (
                      <tr key={i} id='veiw-sellers-information'>
                        <td id='seller-id'>{seller.sellerId}</td>
                        <td id='seller-name' style={{ fontWeight: 'bold' }}>{seller.sellerName}</td>
                        <td id='seller-email'>{seller.storeName}</td>
                        <td id='seller-address'>{seller.sellerAddress}</td>
                        <td id='seller-mobile-no'>{seller.storeDesc}</td>
                        <td id='seller-mobile-no'>{seller.gstinNumber}</td>
                      </tr>
                    )
                  })
                )
                :
                <h1 style={{ width: '100%', textAlign: 'center', marginTop: '20px', fontWeight: '400' }}>No Sellers</h1>
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default VeiwSellers