import React, { useEffect, useState } from 'react'
import './ProductPage.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../navBar/Navbar'
import 'remixicon/fonts/remixicon.css'
import axios from 'axios'

const ProductPage = () => {

    let location = useLocation()
    let productData = location.state.productData || {}

    let user = location.state.user || {}

    let [sellerDetailsToggle, setSellerDetailsToggle] = useState('none')
    let [relatedCategories, setRelatedCategories] = useState([])

    let [zoomStylefront, setZoomStylefront] = useState({ display: 'none' });
    let [zoomStyleback, setZoomStyleback] = useState({ display: 'none' });
    // let [cursorStyleback, setCursorStyleback] = useState({ display: 'none' });

    let [quantity, setQuantity] = useState(1)

    let navigateTo = useNavigate()

    let handleSellerDetails = (e) => {
        if (sellerDetailsToggle == 'none') {
            setSellerDetailsToggle('block')
        }
        else {
            setSellerDetailsToggle('none')
        }
    }

    let fetRelatedCategory = () => {
        axios.get(`http://localhost:8080/product/getAllProductBySubCategroy/${productData.categoryType}/${productData.suitableFor}`)
            .then((response) => {
                console.log(response.data)
                setRelatedCategories(response.data)
                return response.data
            })
            .catch((err) => {
                alert('Error while fetching related categories in product page')
                // alert('Error while fetching related categories in product page')
            })
    }

    const handleMouseMovefront = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomStylefront({
            backgroundImage: `url(${e.target.src})`,
            backgroundPosition: `${x}% ${y}%`,
            display: 'block',
            top: e.clientY - top + 'px',
            left: e.clientX - left + 'px'
        });
    };

    const handleMouseLeavefront = () => {
        setZoomStylefront({ display: 'none' });
    };

    const handleMouseMoveback = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomStyleback({
            backgroundImage: `url(${e.target.src})`,
            backgroundPosition: `${x}% ${y}%`,
            display: 'block',
            top: e.clientY - top + 'px',
            left: e.clientX - left + 'px'
        });
    };

    const handleMouseLeaveback = () => {
        setZoomStyleback({ display: 'none' });
        // setCursorStyleback({display : 'none'})
    };

    let redirectToProductPage = (productData) => {
        console.log("clicked, Ready To go on product page")
        console.log(productData)
        navigateTo('/productpage', { state: { productData } })
    }

    useEffect(() => {
        fetRelatedCategory()
        console.log("User From Product Page", user)
    }, [])

    let increaseQuantity = (e) => {
        setQuantity(quantity + 1)
    }

    let decreaseQuantity = (e) => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    let handleAddToCart = () => {
        if (!user || !user.userId || !productData || !productData.id) {
            alert('Invalid user or product details.');
            return;
        }

        let obj = {
            quantity: quantity,
            user: { userId: user.userId },  // Backend expects only userId
            product: { id: productData.id } // Backend expects only product id
        };

        console.log("Payload sent to API:", obj); // Debugging log

        axios.post('http://localhost:8080/cart/addCart', obj)
            .then((response) => {
                alert('Product added to cart successfully!');
            })
            .catch((err) => {
                console.error("Error while adding to cart:", err.response?.data || err.message);
                alert(`Error: ${err.response?.data?.message || 'Failed to add product to cart.'}`);
            });
    };

    let handleStockQuantity = () => {
        console.log(productData.stockQuantity)

        if (productData.stockQuantity <= 0 || productData.stockQuantity < quantity) {
            alert('product is out of stock')
        }
        else {
            productData.stockQuantity -= quantity
            axios.put('http://localhost:8080/product/updateProduct', productData)
            console.log("after Adding Product : ", productData)

            handleAddToCart();
        }
    }

    return (
        <div id='product-page-container'>
            <div id='product-page-sellerDetails-main-container' style={{ display: sellerDetailsToggle }}>
                <div id='product-page-sellerDetails-container'>
                    <h3 style={{ fontSize: 'x-large' }}>Manufacturer details</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th style={{ backgroundColor: 'transparent', borderRight: 'none' }}>Seller Name</th>
                                <td style={{ borderRight: 'none' }}>:</td>
                                <td style={{ textAlign: 'left', borderRight: 'none' }}>{productData.seller.sellerName}</td>
                            </tr>
                            <tr>
                                <th style={{ backgroundColor: 'transparent', borderRight: 'none' }}>Store Name</th>
                                <td style={{ borderRight: 'none' }}>:</td>
                                <td style={{ textAlign: 'left', borderRight: 'none' }}>{productData.seller.storeName}</td>
                            </tr>
                            <tr>
                                <th style={{ backgroundColor: 'transparent', borderRight: 'none' }}>Address</th>
                                <td style={{ borderRight: 'none' }}>:</td>
                                <td style={{ textAlign: 'left', borderRight: 'none' }}>{productData.seller.sellerAddress}</td>
                            </tr>
                            <tr>
                                <th style={{ backgroundColor: 'transparent', borderRight: 'none' }}>Mobile Number</th>
                                <td style={{ borderRight: 'none' }}>:</td>
                                <td style={{ textAlign: 'left', borderRight: 'none' }}>{productData.seller.sellerMobNumber}</td>
                            </tr>
                        </tbody>
                    </table>
                    <i className="ri-close-line" id='product-page-seller-info-minimize' onClick={() => { handleSellerDetails() }}></i>
                </div>
            </div>

            <Navbar user={user} />

            <div id="product-page-content-container">
                <div id="product-page-content-right-section">
                    <div id="product-image-container">
                        <div id="product-front-image-container" className="zoom-front-container">
                            <img src={productData.frontImageUrl} id='product-front-image' alt="frontImage"
                                onMouseMove={handleMouseMovefront} onMouseLeave={handleMouseLeavefront} />
                            <div className="zoom-front-lens" style={zoomStylefront}></div>
                            {/* <div className="zoom-front-lens-cursor" style={zoomStylefront}></div> */}
                        </div>

                        <div id="product-back-image-container" className="zoom-back-container">
                            <img src={productData.backImageUrl} id='product-back-image' alt="backImage"
                                onMouseMove={handleMouseMoveback} onMouseLeave={handleMouseLeaveback} />
                            <div className="zoom-back-lens" style={zoomStyleback}></div>
                            {/* <div className="zoom-front-lens-cursor" ></div> */}
                        </div>
                    </div>

                    <div id="related-categories-product-list">
                        <h1 id='related-categories-product-list-heading' style={{ color: 'silver' }}>Similar Category</h1>
                        {
                            relatedCategories.map((elem) => {
                                return (

                                    <div id='product-page-card' onClick={() => { redirectToProductPage(elem) }}>
                                        <div id='product-page-card-image-container'>
                                            <img src={elem.frontImageUrl} alt={elem.categoryType} />
                                        </div>
                                        <div id="product-page-product-price-container">
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <h6 style={{ color: 'grey', fontWeight: '400' }} className='product-page-prices'>Rs <strike>{elem.actualPrice}</strike></h6>
                                                <h6 style={{ color: 'green', fontWeight: '400' }} className='product-page-prices'>Rs {elem.sellingPrice}</h6>
                                                <h6 style={{ color: 'black', fontWeight: '400' }} className='product-page-prices'>Rs {elem.discout} Off</h6>
                                            </div>
                                            <i style={{ marginRight: '5px', fontSize: '15px' }} className="ri-shopping-cart-2-fill"></i>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>

                <div id="product-page-content-left-section">
                    <h1 style={{ fontWeight: '400', fontSize: 'x-large', textTransform: 'capitalize' }}>{productData.name}</h1>
                    <h4 className='GrayColor' style={{ fontWeight: '400' }}>{productData.seller.storeName}</h4>

                    <div id="product-page-content-left-size-container">
                        <h4 className='GrayColor' style={{ fontWeight: '500', fontSize: '14px' }}>Size</h4>
                        <h3 style={{ backgroundColor: '#333', color: '#fff', padding: '5px 10px', borderRadius: '5px', fontWeight: '400' }}>One Size</h3>
                    </div>

                    <div id="product-page-content-left-price-container">
                        <div id="left-price-heading">
                            <h4>M.R.P</h4>
                            <h4>Price</h4>
                            <h4>You Save</h4>
                        </div>
                        <div id="left-price">
                            <h4>: ₹<del>{productData.actualPrice}</del></h4>
                            <h4>: ₹{productData.sellingPrice}</h4>
                            <h4 style={{ color: 'crimson' }}>: ₹{productData.discout}</h4>
                        </div>
                    </div>

                    <p style={{ fontSize: '12px' }} id='product-page-content-left-Note' className='lightGrayColor'>M.R.P. inclusive of all taxes</p>

                    <div id="product-page-content-left-quantity-container">
                        <i class="ri-subtract-line" onClick={(e) => { decreaseQuantity(e) }}></i>
                        <h1 style={{ backgroundColor: 'lightgrey', padding: '0px 10px', fontWeight: '400', fontSize: '1rem' }}>{quantity}</h1>
                        <i class="ri-add-line" onClick={(e) => { increaseQuantity(e) }}></i>
                    </div>

                    <div style={{width:'100%', height:'10vh', display:'flex', flexDirection:'column', position:'relative'}}>
                        {
                            (productData.stockQuantity > 0)
                            ? <button style={{display:'inline'}} id='product-page-content-left-btn-add-to-cart' onClick={(e) => { handleStockQuantity() }}>Add To Cart</button>
                            :
                            <button style={{display:'inline'}} id='product-page-content-left-btn-outofstock' disabled>Out Of Stock</button>
                        }
                    </div>

                    <div id="product-page-content-left-delivary-process-info-container">
                        <h4 className='GrayColor' style={{ textTransform: 'uppercase', fontSize: '14px', marginBottom: '5px' }}>Delivary & Return</h4>
                        <div id="product-page-content-left-delivary-process-in-metro-info">
                            <h5 style={{ fontWeight: '400' }} className='lightGrayColor'>metros :</h5>
                            <p className='GrayColor' style={{ fontSize: '14px' }}>3-5 working days</p>
                        </div>
                        <div id="product-page-content-left-delivary-process-in-other-info">
                            <h5 style={{ fontWeight: '400' }} className='lightGrayColor'>other cities :</h5>
                            <p className='GrayColor' style={{ fontSize: '14px' }}>5-7 working days</p>
                        </div>
                        <div id="product-page-content-left-delivary-process-in-speed-post-info">
                            <h5 style={{ fontWeight: '400' }} className='lightGrayColor'>areas serviceable only by speed post :</h5>
                            <p className='GrayColor' style={{ fontSize: '14px' }}>15 working days</p>
                        </div>
                    </div>

                    <div id="product-page-content-left-product-description">
                        <h4 className='GrayColor' style={{ textTransform: 'uppercase', fontSize: '14px', marginBottom: '5px' }}>Description</h4>
                        <div id="product-page-content-left-description-suitableFor-container">
                            <h5 className='lightGrayColor' style={{ fontWeight: '400' }}>Suitable for :</h5>
                            <p className='GrayColor' style={{ fontSize: '14px', fontWeight: 'bold' }}>{productData.suitableFor}</p>
                        </div>
                        <div id="product-page-content-left-category-type-container">
                            <h5 className='lightGrayColor' style={{ fontWeight: '400' }}>Category :</h5>
                            <p className='GrayColor' style={{ fontSize: '14px', fontWeight: 'bold' }}>{productData.categoryType}</p>
                        </div>
                        <div id="product-page-content-left-description-container">
                            <h5 className='lightGrayColor' style={{ fontWeight: '400' }}>Product Description :</h5>
                            <p style={{ fontSize: '14px' }}>{productData.productDescription}</p>
                        </div>
                    </div>

                    <button id='product-page-content-left-btn-seller-details' onClick={(e) => { handleSellerDetails() }}>Seller Details</button>
                </div>
            </div>
        </div>
    )
}

export default ProductPage