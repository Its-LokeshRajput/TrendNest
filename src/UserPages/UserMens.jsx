import React, { useEffect, useRef, useState } from 'react'
import './UserMens.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const UserMens = () => {

    let location = useLocation()
    let { user } = location.state || {}

    const [orgMensList, setOrgMensList] = useState([])

    const [mensList, setMensList] = useState([])
    const [categoryList, setCategoryList] = useState([])

    const [sortHeightStyle, setsortHeightStyle] = useState('0px')
    const [sortInnerText, setsortInnerText] = useState('+')

    let navigateTo = useNavigate()

    let mensCardRef = useRef([])

    let handleCardMouseMove = (cardRef, evt, index) => {
        if (!cardRef.current[index]) return;

        let { clientX, clientY } = evt;
        let { width, height, left, top } = cardRef.current[index].getBoundingClientRect();

        let x = ((clientX - (left + width / 2)) / width) * 20;
        let y = ((clientY - (top + height / 2)) / height) * 20;

        cardRef.current[index].style.transition = "none";
        cardRef.current[index].style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
        console.log("Enter In mens")
    }

    let handleCardMouseLeave = (cardRef, evt, index) => {
        // cardRef.current[index].style.transition = "transform .5s ease 0s"
        // cardRef.current[index].style.transform = `rotateX(${0}deg) rotateY(${0}deg)`

        if (!cardRef.current[index]) return;

        cardRef.current[index].style.transition = "transform 0.5s ease-out";
        cardRef.current[index].style.transform = "rotateX(0deg) rotateY(0deg)";
        console.log("leave In mens")
    }

    useEffect(() => {
        console.log("Updated orgMensList:", orgMensList);
    }, [orgMensList]);  // Runs when orgMensList updates


    let fetchMensData = () => {
        axios.get(`http://localhost:8080/product/getAllProductByCategroy/mens`)
            .then((response) => {
                if (response.data == "") {
                    alert('mens category is not valid')
                } else {
                    // alert('setting mens data')
                    setMensList(response.data)
                    setOrgMensList(response.data)
                    return response.data
                }
            })
            .catch(err => alert('Error while fetching mens Data..'))
    }

    let fetchCategories = () => {
        axios.get(`http://localhost:8080/product/getProductsByDistinctCategory/mens`)
            .then((response) => {
                if (response.data == "") {
                    alert('Dont have products')
                } else {
                    // alert('setting mens data')
                    setCategoryList(response.data)
                    return response.data
                }
            })
            .catch(err => alert('Error while fetching mens Data..'))
    }

    useEffect(() => {
        fetchMensData()
        fetchCategories()
        console.log("User From Mens Page : ", user)
    }, [])

    let handleSortExpand = (e) => {
        setsortHeightStyle((prev) => (prev == '0px' ? 'fit-content' : '0px'))
    }

    let handleHighToLowSorting = () => {
        // console.log("before : ", mensList);
        let sortedList = [...mensList].sort((prev, next) => next.sellingPrice - prev.sellingPrice);
        // console.log("after : ", sortedList);
        setMensList(sortedList);
    }

    let handleLowToHighSorting = () => {
        // let sortedList = [...mensList].sort((prev, next) => prev.sellingPrice - next.sellingPrice);
        // setMensList(sortedList);
        setMensList([...mensList].sort((prev, next) => prev.sellingPrice - next.sellingPrice));
    }


    let renderMensProduct = () => {
        return (
            mensList.map((menData, index) => {
                return (
                    <div id='user-main-page-card' ref={(el) => (mensCardRef.current[index] = el)} onMouseMove={(evt) => { handleCardMouseMove(mensCardRef, evt, index) }} onMouseLeave={(evt) => { handleCardMouseLeave(mensCardRef, evt, index) }} onClick={() => { redirectToProductPage(menData) }}>
                        <div id='user-main-page-card-image-container'>
                            <img src={menData.frontImageUrl} width='240px' alt={menData.categoryType} />
                        </div>
                        <div id="user-main-page-product-price-container">
                            <div style={{ display: 'flex', gap: '20px', marginLeft: '10px' }}>
                                <h4 style={{ color: 'grey', fontSize: 'small', fontWeight: '400' }} className='user-main-page-prices'>Rs <strike>{menData.actualPrice}</strike></h4>
                                <h4 style={{ color: 'green', fontSize: 'small', fontWeight: '400' }} className='user-main-page-prices'>Rs {menData.sellingPrice}</h4>
                                <h4 style={{ color: 'black', fontSize: 'small', fontWeight: '400' }} className='user-main-page-prices'>Rs {menData.discout} Off</h4>
                            </div>
                            <i style={{ marginRight: '10px', fontSize: '2vw' }} className="ri-shopping-cart-2-fill"></i>
                        </div>
                    </div>
                )
            })
        )
    }

    let sortingBySubCategory = (e) => {
        if (e.target.textContent == 'All') {
            setMensList(orgMensList)
        }
        else {
            setMensList([...orgMensList].filter((elem) => (elem.categoryType).toLowerCase() == e.target.textContent.toLowerCase()))
        }
    }

    let redirectToProductPage = (productData) => {
        navigateTo('/productpage', { state: { productData, user } })
    }

    useGSAP(() => {
        let tl = gsap.timeline()

        tl
            .from("#user-mens-page-right-top-section", {
                y: -50,
                opacity: 0
            })
            .from("#user-mens-page-right-bottom-section", {
                y: 50,
                opacity: 0
            })
            .from("#user-mens-page-left-section", {
                x: -50,
                opacity: 0
            })
    })

    return (
        <div id='user-mens-page-container'>
            <div id="user-mens-page-left-section">

                <div id="user-mens-page-left-top-section">
                    <h4 style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '10px' }}>Mens Clothing</h4>
                    <h4 style={{ fontWeight: '400', fontSize: '14px', marginLeft: '10px' }}>{mensList.length} products</h4>
                </div>

                <div id="user-mens-page-left-bottom-section">

                    <h4 style={{ fontWeight: 'bold', fontSize: '14px', position: 'absolute', top: '5px', left: '10px' }}>Filter & Sort</h4>

                    <button style={{
                        fontWeight: '400',
                        fontSize: '12px',
                        position: 'absolute',
                        top: '5px',
                        right: '10px',
                        padding: '1px 12px',
                        border: 'none',
                        backgroundColor: 'lightgrey',
                        color: 'black',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    }}
                        onClick={(e) => {
                            window.location.reload()
                        }}
                    >Clear</button>

                    <div id="user-mens-page-left-bottom-section-filter-Container">

                        <div id="user-mens-page-left-sortBy-container">

                            <h4 style={{ fontWeight: '500', width: '100%', fontSize: '14px' }}>
                                Sort By
                                <span style={{ float: 'right', paddingRight: '5px', cursor: 'pointer' }} onClick={(e) => {
                                    handleSortExpand(e)
                                    setsortInnerText((prev) => (prev === "+" ? "-" : "+"))
                                }}> {sortInnerText} </span>
                            </h4>

                            <div id="user-mens-page-left-sortBy-content" style={{ height: sortHeightStyle }}>
                                <label htmlFor="high-to-low" style={{ fontSize: 'small', textAlign: 'center' }} onClick={(e) => { handleHighToLowSorting() }}>
                                    <input type="radio" name="sortBy" id="high-to-low" style={{ transform: 'scale(0.8)', margin: '.5px 0px 0px 0px' }} />
                                    High To Low
                                </label>
                                <label htmlFor="low-to-high" style={{ fontSize: 'small', textAlign: 'center' }} onClick={(e) => { handleLowToHighSorting() }}>
                                    <input type="radio" name="sortBy" id="low-to-high" style={{ transform: 'scale(0.8)', margin: '.5px 0px 0px 0px' }} />
                                    Low To High
                                </label>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <div id="user-mens-page-right-section">
                <div id="user-mens-page-right-top-section">
                    <span
                        id='user-mens-page-right-top-categories'
                        style={{ cursor: 'pointer', transition: 'box-shadow .5s ease' }}
                        onClick={(e) => { sortingBySubCategory(e) }}
                        onMouseOver={(e) => { e.target.style.boxShadow = '0px 0px .5cap grey' }}
                        onMouseLeave={(e) => { e.target.style.boxShadow = 'none' }}
                    >
                        All
                    </span>
                    {
                        categoryList.map((elem) => {
                            return (
                                <span
                                    id='user-mens-page-right-top-categories'
                                    style={{ cursor: 'pointer', transition: 'box-shadow .5s ease' }}
                                    onClick={(e) => { sortingBySubCategory(e) }}
                                    onMouseOver={(e) => { e.target.style.boxShadow = '0px 0px .5cap grey' }}
                                    onMouseLeave={(e) => { e.target.style.boxShadow = 'none' }}
                                >
                                    {elem.categoryType}
                                </span>
                            )
                        })
                    }
                </div>

                <div id='user-mens-page-right-bottom-section'>
                    {
                        renderMensProduct()
                    }
                </div>
            </div>
        </div>
    )
}

export default UserMens