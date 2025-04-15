import React, { useEffect, useRef, useState } from 'react'
import './UserWomens.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const UserWomens = () => {

    let location = useLocation()
    let {user} = location.state || {}

    let womensCardRef = useRef([])

    let handleCardMouseMove = (cardRef,evt, index) => {
        if (!cardRef.current[index]) return;

        let { clientX, clientY } = evt;
        let { width, height, left, top } = cardRef.current[index].getBoundingClientRect();

        let x = ((clientX - (left + width / 2)) / width) * 20;
        let y = ((clientY - (top + height / 2)) / height) * 20;

        cardRef.current[index].style.transition = "none";
        cardRef.current[index].style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
        console.log("Enter In mens")
    }
    
    let handleCardMouseLeave = (cardRef ,evt, index) => {
        // cardRef.current[index].style.transition = "transform .5s ease 0s"
        // cardRef.current[index].style.transform = `rotateX(${0}deg) rotateY(${0}deg)`
        
        if (!cardRef.current[index]) return;
        
        cardRef.current[index].style.transition = "transform 0.5s ease-out";
        cardRef.current[index].style.transform = "rotateX(0deg) rotateY(0deg)";
        console.log("leave In mens")
    }

    const [orgWomensList, setOrgWomensList] = useState([])

    const [womensList, setWomensList] = useState([])
    const [categoryList, setCategoryList] = useState([])

    const [sortHeightStyle, setsortHeightStyle] = useState('0px')
    const [sortInnerText, setsortInnerText] = useState('+')

    let navigateTo = useNavigate()

    useEffect(() => {
        console.log("Updated orgWomensList:", orgWomensList);
        console.log("User From Womens : ", user)
    }, [orgWomensList]);  // Runs when orgWomensList updates


    let fetchWomensData = () => {
        axios.get(`http://localhost:8080/product/getAllProductByCategroy/womens`)
            .then((response) => {
                if (response.data == "") {
                    alert('womens category is not valid')
                } else {
                    // alert('setting womens data')
                    setWomensList(response.data)
                    setOrgWomensList(response.data)
                    return response.data
                }
            })
            .catch(err => alert('Error while fetching womens Data..'))
    }

    let fetchCategories = () => {
        axios.get(`http://localhost:8080/product/getProductsByDistinctCategory/womens`)
            .then((response) => {
                if (response.data == "") {
                    alert('Dont have products')
                } else {
                    // alert('setting womens data')
                    setCategoryList(response.data)
                    return response.data
                }
            })
            .catch(err => alert('Error while fetching womens Data..'))
    }

    useEffect(() => {
        fetchWomensData()
        fetchCategories()
    }, [])

    let handleSortExpand = (e) => {
        setsortHeightStyle((prev) => (prev == '0px' ? 'fit-content' : '0px'))
    }

    let handleHighToLowSorting = () => {
        // console.log("before : ", womensList);
        let sortedList = [...womensList].sort((prev, next) => next.sellingPrice - prev.sellingPrice);
        // console.log("after : ", sortedList);
        setWomensList(sortedList);
    }

    let handleLowToHighSorting = () => {
        // let sortedList = [...womensList].sort((prev, next) => prev.sellingPrice - next.sellingPrice);
        // setWomensList(sortedList);
        setWomensList([...womensList].sort((prev, next) => prev.sellingPrice - next.sellingPrice));
    }

    let redirectToProductPage = (productData) => {
        navigateTo('/productpage', {state : {productData,user}})
    }


    let renderWomensProduct = () => {
        return (
            womensList.map((womenData,index) => {
                return (
                    <div id='user-main-page-card' ref={(el) => (womensCardRef.current[index] = el)} onMouseMove={(evt) => { handleCardMouseMove(womensCardRef,evt, index) }} onMouseLeave={(evt) => { handleCardMouseLeave(womensCardRef,evt, index) }} onClick={()=>{redirectToProductPage(womenData)}}>
                        <div id='user-main-page-card-image-container'>
                            <img src={womenData.frontImageUrl} width='240px' alt={womenData.categoryType} />
                        </div>
                        <div id="user-main-page-product-price-container">
                            <div style={{ display: 'flex', gap: '20px', marginLeft: '10px' }}>
                                <h4 style={{ color: 'grey', fontSize: 'small', fontWeight: '400' }} className='user-main-page-prices'>Rs <strike>{womenData.actualPrice}</strike></h4>
                                <h4 style={{ color: 'green', fontSize: 'small', fontWeight: '400' }} className='user-main-page-prices'>Rs {womenData.sellingPrice}</h4>
                                <h4 style={{ color: 'black', fontSize: 'small', fontWeight: '400' }} className='user-main-page-prices'>Rs {womenData.discout} Off</h4>
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
            setWomensList(orgWomensList)
        }
        else {
            setWomensList([...orgWomensList].filter((elem) => (elem.categoryType) == e.target.textContent))
        }
    }

    useGSAP(()=>{
        let tl = gsap.timeline()

        tl
        .from("#user-womens-page-right-top-section", {
            y:-50,
            opacity:0
        })
        .from("#user-womens-page-right-bottom-section", {
            y:50,
            opacity:0
        })
        .from("#user-womens-page-left-section", {
            x:-50,
            opacity:0
        })
    })

    return (
        <div id='user-womens-page-container'>
            <div id="user-womens-page-left-section">

                <div id="user-womens-page-left-top-section">
                    <h4 style={{ fontWeight: 'bold', fontSize: '14px', marginLeft: '10px' }}>Womens Clothing</h4>
                    <h4 style={{ fontWeight: '400', fontSize: '14px', marginLeft: '10px' }}>{womensList.length} products</h4>
                </div>

                <div id="user-womens-page-left-bottom-section">

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

                    <div id="user-womens-page-left-bottom-section-filter-Container">

                        <div id="user-womens-page-left-sortBy-container">

                            <h4 style={{ fontWeight: '500', width: '100%', fontSize: '14px' }}>
                                Sort By
                                <span style={{ float: 'right', paddingRight: '5px', cursor: 'pointer' }} onClick={(e) => {
                                    handleSortExpand(e)
                                    setsortInnerText((prev) => (prev === "+" ? "-" : "+"))
                                }}> {sortInnerText} </span>
                            </h4>

                            <div id="user-womens-page-left-sortBy-content" style={{ height: sortHeightStyle }}>
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

            <div id="user-womens-page-right-section">
                <div id="user-womens-page-right-top-section">
                    <span
                        id='user-womens-page-right-top-categories'
                        style={{ cursor: 'pointer'}}
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
                                    id='user-womens-page-right-top-categories'
                                    style={{ cursor: 'pointer'}}
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

                <div id='user-womens-page-right-bottom-section'>
                    {
                        renderWomensProduct()
                    }
                </div>
            </div>
        </div>
    )
}

export default UserWomens