import React, { useState } from 'react'
import './AddProduct.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AddProduct = () => {
    const location = useLocation();
    const { seller } = location.state || {};

    const [product, setProduct] = useState({
        name: "",
        actualPrice: 0,
        sellingPrice: 0,
        discout: '',
        stockQuantity: 0,
        frontImageUrl: "",
        backImageUrl: "",
        imageUrl: "",
        categoryType: "",
        suitableFor: "",
        seller: seller,
        productDescription: ""
    });

    let navigate = useNavigate()

    // handling input text change
    let handleInputChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        // console.log(product)
        // console.log(seller)
    }

    // Fetching rest api to post Product
    let postProductData = (newProduct) => {
        axios.post('http://localhost:8080/product/addProduct', newProduct)
        .then((resposnse)=>{
            if(resposnse.data == "") {
                alert("Something wents wrong.. Try again")
            }
            else {
                alert("Submited")
                console.log( "Currently Added Product : " + resposnse.data)
                navigate('/sellerHome/veiwproducts', { state: { seller: seller } })
                return resposnse.data
            }
        })
        .catch(err=>alert(`error : ${err}`))
    }

    // Handle On Submit form
    let handleSubmition = (newProduct) => {
        newProduct.discout = newProduct.actualPrice - newProduct.sellingPrice
        postProductData(newProduct)
    }

    
    // Data Validation : 
    let isValidProductName = () => {
        let productName = product.name
        if (productName == "" || productName == null || productName == undefined || productName == " ") {
            console.log('product name')
            return false
        }
        return true
    }
    
    let isValidActualPrice = () => {
        let actualPrice = product.actualPrice
        if(actualPrice <= 0) {
            console.log('actual price')
            return false
        }
        return true
    }
    
    let isValidSellingPrice = () => {
        let sellingPrice = product.sellingPrice
        if(sellingPrice < 0) {
            console.log('selling price')
            return false
        }
        return true
    }
    
    let isValidStockQuantity = () => {
        let stockQuantity = product.stockQuantity
        if(stockQuantity < 0) {
            console.log('stockQuantity' + stockQuantity)
            return false
        }
        return true
    }
    
    let isValidCategoryType = () => {
        let categoryType = product.categoryType
        if(categoryType == "" || categoryType == " " || categoryType == null || categoryType == undefined) {
            console.log('categoryType')
            return false
        }
        return true
    }
    
    let isValidSuitableFor = () => {
        let suitableFor = product.suitableFor.toLowerCase()
        if(suitableFor == "mens" || suitableFor == "womens" || suitableFor == "kids") {
            console.log('suitableFor' + suitableFor)
            return true
        }
        return false
    }

    useGSAP(()=>{
        let tl1 = gsap.timeline()

        tl1.from(".seller-add-product-form-items", {
            y:50,
            opacity:0,
            stagger:.3,
            duration:.5
        })
    })


    return (
        <div id='add-product-container'>
            <form id='add-product-form'>
                <h1 className='seller-add-product-form-items' style={{ textAlign: 'center', width: '100%', marginBottom: '10px', fontWeight: '400' }}>Fill Product Details</h1>

                <div className='seller-add-product-form-items' id="add-product-first-second-container">

                    <div className='childof-first-second-container' id='add-product-first'>

                        <div id="product-name-container">
                            <label htmlFor="name">Product Name</label>
                            <input required type="text" placeholder='Enter Product Name..' name='name' onChange={(e) => { handleInputChange(e) }} />
                        </div>

                        <div id="product-actual-price-container">
                            <label htmlFor="actualPrice">Actual Price</label>
                            <input required type="number" placeholder='Enter Actual Price..' value={product.actualPrice} name='actualPrice' onChange={(e) => { handleInputChange(e) }} />
                        </div>

                        <div id="product-selling-price-container">
                            <label htmlFor="sellingPrice">Selling Price</label>
                            <input required type="number" placeholder='Enter Selling Price..' value={product.sellingPrice} name='sellingPrice' onChange={(e) => { handleInputChange(e) }} />
                        </div>

                        <div id="product-discount-container">
                            <label htmlFor="discount">Discount</label>
                            <input
                                required
                                type="text"
                                value='auto calculated'
                                readOnly
                                name='discout'
                                style={{ color: 'black', backgroundColor:'lightgrey', border:'none' }}
                            />
                        </div>

                    </div>

                    <div className='childof-first-second-container' id="add-product-second">
                        <div id="product-stock-quantity-container">
                            <label htmlFor="stockQuantity">Stock Quantity</label>
                            <input required type="number" placeholder='Enter Stock Quantity..' name='stockQuantity' onChange={(e) => { handleInputChange(e) }} />
                        </div>

                        <div id="product-front-image-url-container">
                            <label htmlFor="frontImageUrl">Front Image</label>
                            <input required type="text" placeholder='Enter Front Image URL..' name='frontImageUrl' onChange={(e) => { handleInputChange(e) }} />
                        </div>

                        <div id="product-back-image-url-container">
                            <label htmlFor="backImageUrl">Back Image</label>
                            <input required type="text" placeholder='Enter Back Image URL..' name='backImageUrl' onChange={(e) => { handleInputChange(e) }} />
                        </div>

                        <div id="product-image-url-container">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input required type="text" placeholder='Enter Image URL for Category..' name='imageUrl' onChange={(e) => { handleInputChange(e) }} />
                        </div>
                    </div>
                </div>

                <div className='seller-add-product-form-items' id="add-product-third">
                    <div id="product-category-type-container">
                        <label htmlFor="categoryType">Sub-Category Type</label>
                        <input required type="text" placeholder='Enter Sub Category..' name='categoryType' onChange={(e) => { handleInputChange(e) }} />
                    </div>

                    <div id="product-category-type-container">
                        <label htmlFor="categoryType">Suitable For</label>
                        <input required type="text" placeholder='(mens, womens or kids)' name='suitableFor' onChange={(e) => { handleInputChange(e) }} />
                    </div>
                </div>

                <div className='seller-add-product-form-items' id="product-seller-id-container">
                    <label htmlFor="seller-id">Seller Name</label>
                    <input
                        required
                        type="text"
                        placeholder='can not display'
                        value={seller.sellerName}
                        readOnly
                        name='seller_id'
                        style={{ color: 'black', backgroundColor:'lightgrey', border:'none' }}
                    />
                </div>

                <div className='seller-add-product-form-items' id="product-product-description-container">
                    <textarea type="text" placeholder='Describe Your Product In short (min 20 words)..' rows='5' name='productDescription' onChange={(e) => { handleInputChange(e) }} />
                </div>

                <button className='seller-add-product-form-items' id='add-product-btnSubmit' onClick={(e) => {
                    e.preventDefault()
                    if(
                        isValidProductName() &&
                        isValidActualPrice() &&
                        isValidSellingPrice() &&
                        isValidStockQuantity() &&
                        isValidCategoryType() &&
                        isValidSuitableFor()
                    ) {
                        handleSubmition(product)
                    }
                    else {
                        alert('Fill Data Properly..')
                    }
                }}>Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct

/*
    name
    actual_price
    selling_price
    discout
    stock_quantity
    front_image_url
    back_image_url
    image_url
    category_type
    suitable_for
    seller_id
    product_description
*/