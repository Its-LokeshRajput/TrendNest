import React, { useEffect, useState } from 'react'
import './ViewProducts.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ViewProducts = () => {
    const location = useLocation();
    const { seller } = location.state || {};

    const [products, setProducts] = useState([])
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

    let [add_product_form_container_display, setAdd_product_form_container_display] = useState('none')


    let fetchAllProducts = () => {
        axios.get(`http://localhost:8080/product/getAllProductBySellerId/${seller.sellerId}`)
            .then((response) => {
                if (response.data == "") {
                    alert('Products Are not added by You')
                }
                else {
                    setProducts(response.data)
                }
            })
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])

    let handleDeleteProduct = (e) => {
        axios
            .delete(`http://localhost:8080/order/deleteOrderByProductId/${e.target.name}`)
            .then((response) => {
                alert("Product, placed Orders, Cart Items deleted Successfully...", response.data);
                fetchAllProducts()
            })
            .catch((err) => {
                console.error("Error occurred:", err);
            });
    };

    let handleUpdateProduct = (product) => {
        // alert("काम चालू आहे .. !")
        setProduct(product)
        setAdd_product_form_container_display('inline-block')
    }

    let updateProduct = (product) => {

        product.discout = product.actualPrice - product.sellingPrice;

        axios.put('http://localhost:8080/product/updateProduct', product)
            .then((response) => {
                if (response.data = "") {
                    alert('Please Enter valid Data')
                }
                else {
                    alert('successfully Updated')
                    setProduct(response.data)
                    setAdd_product_form_container_display('none')
                    fetchAllProducts()
                }
            })
    }

    let handleUpdateProductInputChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    useGSAP(() => {
        let tl1 = gsap.timeline()

        tl1.from(".seller-view-products-items", {
            y: 50,
            opacity: 0,
            stagger: .3
        })
    })


    return (
        <div id='view-products-container' style={{ backgroundColor: 'rgba(20, 20, 20, 0.925)' }}>

            <div id='add-product-form-container' style={{ display: add_product_form_container_display }}>
                <form id='add-product-form'>
                    <h1 className='seller-add-product-form-items' style={{ textAlign: 'center', width: '100%', marginBottom: '10px', fontWeight: '400' }}>Update Product Details</h1>

                    <div className='seller-add-product-form-items' id="add-product-first-second-container">

                        <div className='childof-first-second-container' id='add-product-first'>

                            <div id="product-name-container">
                                <label htmlFor="name">Product Name</label>
                                <input required type="text" placeholder='Enter Product Name..' name='name' value={product.name} onChange={(e) => { handleUpdateProductInputChange(e) }} />
                            </div>

                            <div id="product-actual-price-container">
                                <label htmlFor="actualPrice">Actual Price</label>
                                <input required type="number" onChange={(e) => { handleUpdateProductInputChange(e) }} placeholder='Enter Actual Price..' name='actualPrice' value={product.actualPrice} />
                            </div>

                            <div id="product-selling-price-container">
                                <label htmlFor="sellingPrice">Selling Price</label>
                                <input required type="number" onChange={(e) => { handleUpdateProductInputChange(e) }} placeholder='Enter Selling Price..' value={product.sellingPrice} name='sellingPrice' />
                            </div>

                            <div id="product-discount-container">
                                <label htmlFor="discount">Discount</label>
                                <input
                                    required
                                    type="text"
                                    value='auto calculated'
                                    readOnly
                                    name='discout'
                                    style={{ color: 'black', backgroundColor: 'lightgrey', border: 'none' }}
                                />
                            </div>

                        </div>

                        <div className='childof-first-second-container' id="add-product-second">
                            <div id="product-stock-quantity-container">
                                <label htmlFor="stockQuantity">Stock Quantity</label>
                                <input required type="number" placeholder='Enter Stock Quantity..' value={product.stockQuantity} name='stockQuantity' onChange={(e) => { handleUpdateProductInputChange(e) }} />
                            </div>

                            <div id="product-front-image-url-container">
                                <label htmlFor="frontImageUrl">Front Image</label>
                                <input required type="text" placeholder='Enter Front Image URL..' value={product.frontImageUrl} name='frontImageUrl' onChange={(e) => { handleUpdateProductInputChange(e) }} />
                            </div>

                            <div id="product-back-image-url-container">
                                <label htmlFor="backImageUrl">Back Image</label>
                                <input required type="text" placeholder='Enter Back Image URL..' value={product.backImageUrl} name='backImageUrl' onChange={(e) => { handleUpdateProductInputChange(e) }} />
                            </div>

                            <div id="product-image-url-container">
                                <label htmlFor="imageUrl">Image URL</label>
                                <input required type="text" placeholder='Enter Image URL for Category..' value={product.imageUrl} name='imageUrl' onChange={(e) => { handleUpdateProductInputChange(e) }} />
                            </div>
                        </div>
                    </div>

                    <div className='seller-add-product-form-items' id="add-product-third">
                        <div id="product-category-type-container">
                            <label htmlFor="categoryType">Sub-Category Type</label>
                            <input required type="text" placeholder='Enter Sub Category..' value={product.categoryType} name='categoryType' onChange={(e) => { handleUpdateProductInputChange(e) }} />
                        </div>

                        <div id="product-category-type-container">
                            <label htmlFor="categoryType">Suitable For</label>
                            <input required type="text" placeholder='(mens, womens or kids)' value={product.suitableFor} name='suitableFor' onChange={(e) => { handleUpdateProductInputChange(e) }} />
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
                            style={{ color: 'black', backgroundColor: 'lightgrey', border: 'none' }}
                        />
                        {console.log(product)}
                    </div>

                    <div className='seller-add-product-form-items' id="product-product-description-container">
                        <textarea type="text" value={product.productDescription} placeholder='Describe Your Product In short (min 20 words)..' rows='5' name='productDescription' onChange={(e) => { handleUpdateProductInputChange(e) }} />
                    </div>

                    <button className='seller-add-product-form-items' id='add-product-btnUpdate' onClick={(e) => {
                        e.preventDefault()
                        updateProduct(product)
                    }}>Update Product</button>
                    <button className='seller-add-product-form-items' id='add-product-btnCancel' onClick={(e) => {
                        e.preventDefault()
                        setAdd_product_form_container_display('none')
                    }}>Cancel</button>
                </form>
            </div>

            <h1 className='seller-view-products-items' id='view-products-heading' style={{ textAlign: 'center', padding: '20px 0px' }}>List Of Products</h1>
            <table className='seller-view-products-items' id='view-products-table'>
                <thead id='view-products-table-headers-container'>
                    <tr id='view-products-table-headers'>
                        <th>ProductId</th>
                        <th>Product Name</th>
                        <th>Product MRP</th>
                        <th>Selling Price</th>
                        <th>Discount</th>
                        <th>Details</th>
                        <th>Front Image</th>
                        <th>Back Image</th>
                        <th>Category Image</th>
                        <th>Sub Category</th>
                        <th>Suitable For</th>
                        <th>Seller Name</th>
                        <th>Available Stock</th>
                        <th>Operations</th>
                    </tr>
                </thead>

                <tbody id='view-products-table-data'>
                    {
                        products.map((product) => {
                            return (
                                <tr id='view-products-table-data'>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.actualPrice}</td>
                                    <td>{product.sellingPrice}</td>
                                    <td>{product.discout}</td>
                                    <td style={{ fontSize: 'x-small' }}>{product.productDescription}</td>
                                    <td><img src={product.frontImageUrl} alt="frontImage" width='100px' /></td>
                                    <td><img src={product.backImageUrl} alt="frontImage" width='100px' /></td>
                                    <td><img src={product.imageUrl} alt="frontImage" width='100px' /></td>
                                    <td>{product.categoryType}</td>
                                    <td>{product.suitableFor}</td>
                                    <td>{product.seller.sellerName}</td>
                                    <td>{product.stockQuantity}</td>
                                    <td>
                                        {/* <button id='view-products-table-data-btnDelete' name={product.id} onClick={(e) => { handleDeleteProduct(e) }}>Delete</button> */}
                                        <button id='view-products-table-data-btnUpdate' name={product.id} onClick={(e) => { handleUpdateProduct(product) }}>Update</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ViewProducts

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