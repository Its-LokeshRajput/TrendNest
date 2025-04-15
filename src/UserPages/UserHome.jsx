import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import './UserHome.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import TrendNestSVG from '../TrendNestSVG'

import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const UserHome = () => {

    let location = useLocation()
    let { user } = location.state || {}

    let womensCardRef = useRef([])
    let mensCardRef = useRef([])
    let kidsCardRef = useRef([])

    let [svgPath, setSvgPath] = useState('M 10 25 Q 600 25 1200 25')
    let [svgFinalPath, setSvgFinalPath] = useState('M 10 25 Q 600 25 1200 25')

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


    const [womensList, setWomensList] = useState([])
    const [mensList, setMensList] = useState([])
    const [kidsList, setKidsList] = useState([])

    const [womensCategoryList, setWomensCategoryList] = useState([])
    const [mensCategoryList, setMensCategoryList] = useState([])
    const [kidsCategoryList, setKidsCategoryList] = useState([])



    let navigateTo = useNavigate()

    let fetchWomensDistinctCategory = () => {
        axios.get(`http://localhost:8080/product/getProductsByDistinctCategory/womens`)
            .then((response) => {
                if (response.data == "") {
                    // alert('womens Distinct category is not valid')
                } else {
                    // alert('setting womens data')
                    setWomensCategoryList(response.data)
                    return response.data
                }
            })
            .catch(err => alert('Error while fetching womens Distinct category Data..'))
    }

    let fetchWomensData = () => {
        axios.get(`http://localhost:8080/product/getAllProductByCategroy/womens`)
            .then((response) => {
                if (response.data == "") {
                    // alert('womens category is not valid')
                } else {
                    // alert('setting womens data')
                    setWomensList(response.data)
                    return response.data
                }
            })
            .catch(err => alert('Error while fetching womens Data..'))
    }

    let fetchMensData = () => {
        axios.get(`http://localhost:8080/product/getAllProductByCategroy/mens`)
            .then((response) => {
                if (response.data == "") {
                    // alert('mens category is not valid')
                } else {
                    // alert('setting womens data')
                    setMensList(response.data)
                    return response.data
                }
            })
            .catch(err => alert('Error while fetching mens Data..'))
    }

    let fetchMensDistinctCategory = () => {
        axios.get(`http://localhost:8080/product/getProductsByDistinctCategory/mens`)
            .then((response) => {
                if (response.data == "") {
                    // alert('Mens Distinct category is not valid')
                } else {
                    // alert('setting womens data')
                    setMensCategoryList(response.data)
                    return response.data
                }
            })
            .catch(err => alert('Error while fetching mens Distinct category Data..'))
    }

    let fetchKidsData = () => {
        axios.get(`http://localhost:8080/product/getAllProductByCategroy/kids`)
            .then((response) => {
                if (response.data == "") {
                    // alert('kids category is not valid')
                } else {
                    // alert('setting womens data')
                    setKidsList(response.data)
                    return response.data
                }
            })
            .catch(err => alert('Error while fetching kids Data..'))
    }

    let fetchKidsDistinctCategory = () => {
        axios.get(`http://localhost:8080/product/getProductsByDistinctCategory/kids`)
            .then((response) => {
                if (response.data == "") {
                    // alert('kids Distinct category is not valid')
                } else {
                    // alert('setting womens data')
                    setKidsCategoryList(response.data)
                    return response.data
                }
            })
            .catch(err => alert('Error while fetching kids Distinct category Data..'))
    }

    useEffect(() => {
        fetchWomensData()
        fetchMensData()
        fetchKidsData()
        fetchKidsDistinctCategory()
        fetchMensDistinctCategory()
        fetchWomensDistinctCategory()
    }, [])

    let redirectToProductPage = (productData) => {
        console.log("clicked, Ready To go on product page")
        console.log(productData)
        navigateTo('/productpage', { state: { productData, user } })
    }

    const [images, setImages] = useState([
        "https://img.freepik.com/premium-vector/elegant-fashion-sale-banner-template_585785-57.jpg?semt=ais_hybrid",
        "https://i.pinimg.com/736x/b4/6e/b7/b46eb746f7664083877a42aa05062dfe.jpg",
        "https://img.freepik.com/premium-vector/men-fashion-collection-social-media-banner-template-design_596383-181.jpg?semt=ais_hybrid",
        "https://img.freepik.com/premium-vector/men-fashion-collection-social-media-banner-template-design_596383-109.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoOIzm7tpalOPxE5092UQZdA-LoTQzaB4WHw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbfTpCwYFXUXIWL5rRZ363vR7_j_v_gAWBiG19arDmk-eHJshuEEaOCgu1jmUsBUOwxfA&usqp=CAU"
    ]);

    const settings = {
        dots: true,               // Shows navigation dots below the slider
        infinite: true,           // Enables infinite scrolling
        speed: 1000,               // Transition speed in milliseconds
        slidesToShow: 1,          // Number of slides visible at a time
        slidesToScroll: 1,        // Number of slides to scroll at a time
        autoplay: true,           // Enables auto-play mode
        autoplaySpeed: 3000,      // Time interval for auto-scroll (in ms)
        cssEase: "ease-in-out",   // Smooth transition effect
        pauseOnHover: true,       // Pauses auto-scroll when hovered
        arrows: true,           // Shows left/right navigation arrows
        swipe: true,              // Enables swipe functionality on touch devices
        adaptiveHeight: true,      // Adjusts height based on content
        // rtl: true
    };

    useGSAP(() => {
        let tl = gsap.timeline()

        tl.from("#user-main-page-distinct-categories-section", {
            y: 50,
            opacity: 0,
            // duration:.5,
            delay: 1
        })
        tl.from("#user-main-page-slider-container", {
            y: 50,
            opacity: 0
        })
        gsap.from("#user-main-page-womens-section", {
            y: 50,
            opacity: 0,
            scrollTrigger: {
                trigger: "#user-main-page-womens-section",
                start: "top 80%",
                end: "top 30%",
                scrub: 1,
                markers: false,
            }
        })
    })

    let handleSVGMouseMove = (e) => {
        const { left, top, height } = e.currentTarget.getBoundingClientRect();

        // Calculate mouse coordinates relative to the container
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top + 50;

        setSvgPath(`M 10 25 Q ${mouseX} ${mouseY - height} 1200 25`);

        gsap.to('svg path', {
            attr: { d: svgPath }
        })
    }

    let handleSVGMouseLeave = (e) => {
        setSvgPath(svgFinalPath)

        gsap.to('svg path', {
            attr: { d: svgFinalPath },
            duration: 1,
            ease: "elastic.out(1,0.2)",
        })
    }

    return (
        <div id="user-main-page-sections-container">

            <div className="user-main-page-sections" style={{ width: '70vw', border: '.5px solid #D4AF37' }} id="user-main-page-distinct-categories-section">
                {/* {console.log("womensDistinctCategory", womensCategoryList)} */}
                {
                    womensCategoryList.map((womensDistinctCategoryProduct) => {
                        return (
                            <div id='user-main-page-distinct-category-container' onClick={(e) => { navigateTo('/userhome/womens', { state: { user } }) }}>
                                <div id='user-main-page-distinct-category-image-container'>
                                    <img src={womensDistinctCategoryProduct.frontImageUrl} alt="Failed" />
                                </div>
                                <h5 style={{ fontWeight: 400, textTransform: 'capitalize', width: '150px', textAlign: 'center' }}>{womensDistinctCategoryProduct.categoryType}</h5>
                            </div>
                        )
                    })
                }
                {
                    mensCategoryList.map((mensDistinctCategoryProduct) => {
                        return (
                            <div id='user-main-page-distinct-category-container' onClick={(e) => { navigateTo('/userhome/mens', { state: { user } }) }}>
                                <div id='user-main-page-distinct-category-image-container'>
                                    <img src={mensDistinctCategoryProduct.frontImageUrl} alt="Failed" />
                                </div>
                                <h5 style={{ fontWeight: 400, textTransform: 'capitalize', width: '150px', textAlign: 'center' }}>{mensDistinctCategoryProduct.categoryType}</h5>
                            </div>
                        )
                    })
                }
                {
                    kidsCategoryList.map((kidsDistinctCategoryProduct) => {
                        return (
                            <div id='user-main-page-distinct-category-container' onClick={(e) => { navigateTo('/userhome/kids', { state: { user } }) }}>
                                <div id='user-main-page-distinct-category-image-container'>
                                    <img src={kidsDistinctCategoryProduct.frontImageUrl} alt="Failed" />
                                </div>
                                <h5 style={{ fontWeight: 400, textTransform: 'capitalize', width: '150px', textAlign: 'center' }}>{kidsDistinctCategoryProduct.categoryType}</h5>
                            </div>
                        )
                    })
                }
            </div>

            <div className="user-main-page-sections" id="user-main-page-slider-container" style={{ width: '60%' }}>
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index} className="slider-image-container">
                            <img src={image} alt={`Slide ${index}`} />
                        </div>
                    ))}
                </Slider>
            </div>


            <div className='user-main-page-sections' id='user-main-page-womens-section' style={{ marginTop: '30px' }}>
                <h1 style={{ fontWeight: '400', fontSize: 'XX-large', padding: '0px 10px', color: 'silver' }}>Womens</h1>
                <div id="user-main-page-card-container">
                    {
                        womensList.map((womenData, index) => {
                            return (
                                <div id='user-main-page-card' ref={(el) => (womensCardRef.current[index] = el)} onMouseMove={(evt) => { handleCardMouseMove(womensCardRef, evt, index) }} onMouseLeave={(evt) => { handleCardMouseLeave(womensCardRef, evt, index) }} style={{ backgroundColor: 'rgb(213, 213, 213)' }} onClick={() => { redirectToProductPage(womenData) }}>
                                    <div id='user-main-page-card-image-container' style={{ backgroundImage: `url(${womenData.frontImageUrl})` }}>
                                        <img src={womenData.frontImageUrl} width='240px' alt={womenData.categoryType} />
                                    </div>
                                    <div id="user-main-page-product-price-container">
                                        <div style={{ display: 'flex', gap: '20px', marginLeft: '10px' }}>
                                            <h4 style={{ color: 'grey' }} className='user-main-page-prices'>Rs <strike>{womenData.actualPrice}</strike></h4>
                                            <h4 style={{ color: 'green' }} className='user-main-page-prices'>Rs {womenData.sellingPrice}</h4>
                                            <h4 style={{ color: 'black' }} className='user-main-page-prices'>Rs {womenData.discout} Off</h4>
                                        </div>
                                        <i style={{ marginRight: '10px', fontSize: '2vw' }} className="ri-shopping-cart-2-fill"></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div id="string"
                onMouseMove={(e) => { handleSVGMouseMove(e) }}
                onMouseLeave={(e) => { handleSVGMouseLeave(e) }}
                style={{ cursor: 'grab' }}
            >
                <svg id='first-SVG' width="500" height="100">
                    <path d="M 10 25 Q 600 25 1200 25" stroke="white" strokeWidth={2} fill="transparent" />
                </svg>
            </div>

            <div className='user-main-page-sections' id='user-main-page-mens-section'>
                <h1 style={{ fontWeight: '400', fontSize: 'XX-large', padding: '0px 10px', color: 'silver' }}>Mens</h1>
                <div id="user-main-page-card-container">
                    {
                        mensList.map((mensData, index) => {
                            return (
                                <div id='user-main-page-card' ref={(el) => (mensCardRef.current[index] = el)} onMouseMove={(evt) => { handleCardMouseMove(mensCardRef, evt, index) }} onMouseLeave={(evt) => { handleCardMouseLeave(mensCardRef, evt, index) }} style={{ backgroundColor: 'rgb(213, 213, 213)' }} onClick={() => { redirectToProductPage(mensData) }}>
                                    <div id='user-main-page-card-image-container'>
                                        <img src={mensData.frontImageUrl} width='240px' alt={mensData.categoryType} />
                                    </div>
                                    <div id="user-main-page-product-price-container">
                                        <div style={{ display: 'flex', gap: '20px', marginLeft: '10px' }}>
                                            <h4 style={{ color: 'grey' }} className='user-main-page-prices'>Rs <strike>{mensData.actualPrice}</strike></h4>
                                            <h4 style={{ color: 'green' }} className='user-main-page-prices'>Rs {mensData.sellingPrice}</h4>
                                            <h4 style={{ color: 'black' }} className='user-main-page-prices'>Rs {mensData.discout} Off</h4>
                                        </div>
                                        <i style={{ marginRight: '10px', fontSize: '2vw' }} className="ri-shopping-cart-2-fill"></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div id="string" style={{ cursor: 'grab' }} onMouseMove={(e) => { handleSVGMouseMove(e) }} onMouseLeave={(e) => { handleSVGMouseLeave(e) }}>
                <svg id='second-SVG' width="500" height="200">
                    <path d="M 10 50 Q 600 50 1200 50" stroke="white" strokeWidth={2} fill="transparent" />
                </svg>
            </div>

            <div className='user-main-page-sections' id='user-main-page-kids-section'>
                <h1 style={{ fontWeight: '400', fontSize: 'XX-large', padding: '0px 10px', color: 'silver' }}>Kids</h1>
                <div id="user-main-page-card-container">
                    {
                        kidsList.map((kidsData, index) => {
                            return (
                                <div id='user-main-page-card' ref={(el) => (kidsCardRef.current[index] = el)} onMouseMove={(evt) => { handleCardMouseMove(kidsCardRef, evt, index) }} onMouseLeave={(evt) => { handleCardMouseLeave(kidsCardRef, evt, index) }} style={{ backgroundColor: 'rgb(213, 213, 213)' }} onClick={() => { redirectToProductPage(kidsData) }}>
                                    <div id='user-main-page-card-image-container'>
                                        <img src={kidsData.frontImageUrl} width='240px' alt={kidsData.categoryType} />
                                    </div>
                                    <div id="user-main-page-product-price-container">
                                        <div style={{ display: 'flex', gap: '20px', marginLeft: '10px' }}>
                                            <h4 style={{ color: 'grey' }} className='user-main-page-prices'>Rs <strike>{kidsData.actualPrice}</strike></h4>
                                            <h4 style={{ color: 'green' }} className='user-main-page-prices'>Rs {kidsData.sellingPrice}</h4>
                                            <h4 style={{ color: 'black' }} className='user-main-page-prices'>Rs {kidsData.discout} Off</h4>
                                        </div>
                                        <i style={{ marginRight: '10px', fontSize: '2vw' }} className="ri-shopping-cart-2-fill"></i>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <Footer />
        </div>
    )
}


export default UserHome