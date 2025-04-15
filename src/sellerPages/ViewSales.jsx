import React, { useEffect, useState } from 'react'
import './ViewSales.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ViewSales = () => {

    let location = useLocation()
    let { seller } = location.state || ""

    let [productList, setProductList] = useState([])
    let [orgProductList, setOrgProductList] = useState([])
    // let [delivaryStatus, setDelivaryStatus] = useState('Pending')
    let [orderStatus, setOrderStatus] = useState({});


    const fetchOrdersBySellerId = async () => {
        try {
            let response = await axios.get(`http://localhost:8080/order/getOrdersBySellerId/${seller.sellerId}`);
            setProductList(response.data);
            setOrgProductList(response.data);
            console.log("Product List : ",response.data)

            // Initialize button states with separate objects
            let initialStatus = {};
            response.data.forEach((order) => {
                if(order.delivery_status == 'Pending') {
                    initialStatus[order.order_id] = {
                        confirmBtnDisable: false,
                        shippedBtnDisable: true,
                        deliverBtnDisable: true,
                        rejectBtnDisable: false,
                    };
                }
                else if(order.delivery_status == 'Confirm') {
                    initialStatus[order.order_id] = {
                        confirmBtnDisable: true,
                        shippedBtnDisable: false,
                        deliverBtnDisable: true,
                        rejectBtnDisable: true,
                    };
                }
                else if(order.delivery_status == 'Shipped') {
                    initialStatus[order.order_id] = {
                        confirmBtnDisable: true,
                        shippedBtnDisable: true,
                        deliverBtnDisable: false,
                        rejectBtnDisable: true,
                    };
                }
                else if(order.delivery_status == 'Delivered') {
                    initialStatus[order.order_id] = {
                        confirmBtnDisable: true,
                        shippedBtnDisable: true,
                        deliverBtnDisable: true,
                        rejectBtnDisable: true,
                    };
                }
                else if(order.delivery_status == 'Reject') {
                    initialStatus[order.order_id] = {
                        confirmBtnDisable: true,
                        shippedBtnDisable: true,
                        deliverBtnDisable: true,
                        rejectBtnDisable: true,
                    };
                }
            });

            console.log("Initial Status:", initialStatus);
            setOrderStatus(initialStatus);
        } catch (err) {
            alert("Error while fetching orders");
        }
    };

    let updateStatus = (e,elem) => {
        if(e.target.name == 'Confirm') {
            elem.delivery_status = 'Confirm'
        }
        else if(e.target.name == 'Shipped') {
            elem.delivery_status = 'Shipped'
        }
        else if(e.target.name == 'Delivered') {
            elem.delivery_status = 'Delivered'
        }
        else if(e.target.name == 'Reject') {
            elem.delivery_status = 'Reject'
        }

        axios.put(`http://localhost:8080/order/updateDeliveryStatusOfOrder`, elem) 
        .then(() => {
            fetchOrdersBySellerId();
        })
        .catch(err => alert(`Error while Updating Status Of Order ID: ${elem.orderId}`));
    }

    useEffect(() => {
        fetchOrdersBySellerId()
    }, [])

    const handleStatusButtons = (e, elem) => {
        let orderId = elem.order_id;
        console.log("Button Clicked:", e.target.name, "Order ID:", orderId);

        setOrderStatus((prevState) => {
            let newState = { ...prevState };

            if (e.target.name === "Confirm") {
                newState[orderId] = {
                    confirmBtnDisable: true,
                    shippedBtnDisable: false,
                    deliverBtnDisable: true,
                    rejectBtnDisable: true,
                };
            } 
            else if (e.target.name === "Shipped") {
                newState[orderId].shippedBtnDisable = true;
                newState[orderId].deliverBtnDisable = false;
            } 
            else if (e.target.name === "Delivered") {
                e.target.style.backgroundColor = 'limegreen';
                newState[orderId].deliverBtnDisable = true;
            } 
            else if (e.target.name === "Reject") {
                e.target.style.opacity = '0.5'
                newState[orderId] = {
                    confirmBtnDisable: true,
                    shippedBtnDisable: true,
                    deliverBtnDisable: true,
                    rejectBtnDisable: true,
                };
            }

            console.log("Updated State:", newState);
            return newState; // This will trigger the re-render
        });
    };

    let handleStatusButtonsOnHover = (e) => {
        if (e.target.disabled) {
            e.target.style = 'cursor: not-allowed;'
        }
        else {
            e.target.style = 'cursor: pointer;'
        }

        if (e.target.name === 'Delivered') {
            e.target.style.backgroundColor = 'limegreen';
            e.target.style.color = 'white';
            if (e.target.disabled) {
                e.target.style.opacity = '0.5'
            }
        } else if (e.target.name === 'Reject') {
            e.target.style.backgroundColor = 'crimson';
            e.target.style.color = 'white';
            if (e.target.disabled) {
                e.target.style.opacity = '0.5'
            }
        }
    }

    let handleFilterByStatus = (e) => {
        if(e.target.innerHTML == 'All') {
            setProductList(orgProductList)
        }
        else if(e.target.innerHTML == 'Pending') {
            console.log("Pending")
            {
                setProductList(orgProductList.filter((order)=>{
                    return order.delivery_status == 'Pending'
                }))
            }
        }
        else if(e.target.innerHTML == 'Confirm') {
            console.log("Confirm")
            {
                setProductList(orgProductList.filter((order)=>{
                    return order.delivery_status == 'Confirm'
                }))
            }
        }
        else if(e.target.innerHTML == 'Shipped') {
            console.log("Shipped")
            {
                setProductList(orgProductList.filter((order)=>{
                    return order.delivery_status == 'Shipped'
                }))
            }
        }
        else if(e.target.innerHTML == 'Delivered') {
            console.log("Delivered")
            {
                setProductList(orgProductList.filter((order)=>{
                    return order.delivery_status == 'Delivered'
                }))
            }
        }
        else if(e.target.innerHTML == 'Rejected') {
            console.log("Rejected")
            {
                setProductList(orgProductList.filter((order)=>{
                    return order.delivery_status == 'Reject'
                }))
            }
        }
    }

    useGSAP(()=>{
        let tl1 = gsap.timeline()

        tl1.from(".view-sales-filterByStatus-statuses", {
            y:-50,
            opacity:0,
            stagger:.2
        })
        tl1.from("#view-sales-order-list-container" , {
            y:50,
            opacity:0,
            stagger:.2
        })
    })

    return (
        <div id='view-sales-container' style={{position:'relative'}}>
            <h4 id='total-sales-text'>Total Sale : {productList.length} products & Amount : {productList.reduce((acc, num) => {
                console.log("Selling Price : ",num.total_amt)
                return (acc + num.total_amt)
            }, 0)}</h4>
            <div id="view-sales-filterByStatus-container">
                <h4 className='view-sales-filterByStatus-statuses' onClick={(e)=>{handleFilterByStatus(e)}}>All</h4>
                <h4 className='view-sales-filterByStatus-statuses' onClick={(e)=>{handleFilterByStatus(e)}}>Pending</h4>
                <h4 className='view-sales-filterByStatus-statuses' onClick={(e)=>{handleFilterByStatus(e)}}>Confirm</h4>
                <h4 className='view-sales-filterByStatus-statuses' onClick={(e)=>{handleFilterByStatus(e)}}>Shipped</h4>
                <h4 className='view-sales-filterByStatus-statuses' onClick={(e)=>{handleFilterByStatus(e)}}>Delivered</h4>
                <h4 className='view-sales-filterByStatus-statuses' onClick={(e)=>{handleFilterByStatus(e)}}>Rejected</h4>
            </div>
            <div id="view-sales-order-list-container">
                {
                    productList.length > 0
                        ?
                        productList.map((elem) => {
                            return (
                                <div className='view-sales-page-order-container' id='view-sales-page-order-container'>
                                    <div id='view-sales-page-order-image-container'>
                                        <img src={elem.product.frontImageUrl} alt="" />
                                    </div>
                                    <div id='view-sales-page-order-details-container'>
                                        <h4>User Id : #{elem.user.userId}</h4>
                                        <h4>Product Name : {elem.product.name}</h4>
                                        <h4>Category : {elem.product.categoryType}</h4>
                                        <h4>Price : ₹{elem.product.sellingPrice}</h4>
                                        <h4>Qty : {elem.quantity}</h4>
                                        <h4>Total Price : <span style={{ color: 'limegreen' }}>₹{elem.quantity * elem.product.sellingPrice}</span></h4>
                                        <h4>Status : {elem.delivery_status}</h4>

                                        <div id='view-sales-page-status-btn-container'>
                                            <button
                                                onClick={(e) => {
                                                    handleStatusButtons(e, elem)
                                                    updateStatus(e,elem)
                                                }}
                                                disabled={orderStatus[elem.order_id]?.confirmBtnDisable}
                                                name="Confirm"
                                                onMouseOver={handleStatusButtonsOnHover}
                                                style={{ backgroundColor: 'lightgoldenrodyellow' }}
                                                >
                                                Confirm
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    handleStatusButtons(e, elem)
                                                    updateStatus(e,elem)
                                                }}
                                                onMouseOver={handleStatusButtonsOnHover}
                                                disabled={orderStatus[elem.order_id]?.shippedBtnDisable}
                                                name="Shipped"
                                                style={{ backgroundColor: 'lightgoldenrodyellow' }}
                                                >
                                                Shipped
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    handleStatusButtons(e, elem)
                                                    updateStatus(e,elem)
                                                }}
                                                onMouseOver={handleStatusButtonsOnHover}
                                                disabled={orderStatus[elem.order_id]?.deliverBtnDisable}
                                                name="Delivered"
                                                style={{ backgroundColor: 'limegreen', color: 'white' }}
                                                >
                                                Delivered
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    handleStatusButtons(e, elem)
                                                    updateStatus(e,elem)
                                                }}
                                                onMouseOver={handleStatusButtonsOnHover}
                                                disabled={orderStatus[elem.order_id]?.rejectBtnDisable}
                                                name="Reject"
                                                style={{ backgroundColor: 'crimson', color: 'white' }}
                                            >
                                                Reject
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <h1 style={{ fontSize: '5vw', textAlign: 'center', color:'white' }}>No Sales</h1>
                }
            </div>
        </div>
    )
}

export default ViewSales