import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './SellerMainPage.css'
import AddProduct from './AddProduct';
import ViewProducts from './ViewProducts';
import ViewSales from './ViewSales';
import { useGSAP } from '@gsap/react';
import 'remixicon/fonts/remixicon.css'
import gsap from 'gsap';
import { useRef, useState } from 'react';
const SellerMainPage = () => {
    const location = useLocation();
    const { seller } = location.state || {}; // Access the seller object passed from the previous component

    let [slidingValue, setSlidingValue] = useState(-110)
    let [displayOfAdminProfileContainer, setDisplayOfAdminProfileContainer] = useState('none')
    let [displayOfAdminUpdateContainer, setDisplayOfAdminUpdateContainer] = useState('none')
    let inputRefs = useRef([])

    const [newSeller, setNewSeller] = useState({
        sellerId: seller.sellerId,
        sellerName: "",
        storeName: "",
    });

    let setNewSellerName = (evt) => {
        setNewSeller(prevAdmin => ({
            ...prevAdmin, // Keep other properties
            sellerName: evt.target.value // Update only the name
        }));
    }
    let setNewStoreName = (evt) => {
        setNewSeller(prevAdmin => ({
            ...prevAdmin, // Keep other properties
            storeName: evt.target.value // Update only the name
        }));
    }


    // let sellerID= (seller.sellerId) ? seller.sellerId : 0 

    let navigate = useNavigate()

    useGSAP(() => {
        let tl1 = gsap.timeline()

        tl1.from("#seller-main-page-nav", {
            y: -100,
            duration: 1,
            opacity: 0
        })
        tl1.from(".seller-nav-items", {
            y: -10,
            duration: .5,
            opacity: 0,
            stagger: .3
        })
    })


    let handleUpdateAdminDetail = (evt) => {
        setDisplayOfAdminUpdateContainer("flex")
    }

    let resetUpdateAdminForm = () => {
        inputRefs.current.forEach((inputBox) => {
            inputBox.value = ""
        })
    }

    let handleUpdateAdmin = (evt) => {
        alert('काम चालू आहे .. !')
        // console.log(newAdmin);
        // if(newAdmin.name != "" && newAdmin.email != "") {
        //     if(newAdmin.email.includes('@gmail.com')) {
        //         axios.put('http://localhost:8080/admin/updateAdmin', newAdmin)
        //         .then(response => {
        //             console.log("Admin updated:", response.data)
        //             setOldAdmin(newAdmin)
        //             setDisplayOfAdminUpdateContainer("none")

        //             resetUpdateAdminForm()
        //         })
        //         .catch(error => console.error("Error updating admin:", error));
        //     }
        //     else {
        //         alert('Invalid Email Id..')
        //     }
        // }
        // else {
        //     alert("Fields Cannot be empty..")
        // }
    }

    let handleCancelUpdateAdmin = (evt) => {
        setDisplayOfAdminUpdateContainer("none")
    }


    return (
        <div id='seller-main-page-container'>

            <div id="admin-profile-container" style={{ display: displayOfAdminProfileContainer }}>
                <div id="admin-profile" style={{ transform: `translateX(${slidingValue}%)` }}>
                    <img src='/src/assets/profile.webp' alt="Profile" id='admin-profile' style={{ cursor: 'pointer', height: '100px', width: '100px', borderRadius: '100%', margin: '5px 0px 0px 0px' }} />

                    {/* <input type="text" className='admin-profile-inputs' id='admin-profile-name' value={admin.name} />
                    <input type="text" className='admin-profile-inputs' id='admin-profile-email' value={admin.email} /> */}
                    <input type="text" className='admin-profile-inputs' id='admin-profile-name' value={seller.sellerName} />
                    <input type="text" className='admin-profile-inputs' id='admin-profile-email' value={seller.storeName} />

                    <button id='admin-edit-profile-button' onClick={(evt) => { handleUpdateAdminDetail(evt) }}>Edit Profile</button>

                    <i
                        className="ri-close-line"
                        id='admin-profile-minimize'
                        onClick={(e) => {
                            setSlidingValue(-110)
                            setTimeout(() => {
                                setDisplayOfAdminProfileContainer('none')
                            }, 400)
                        }}
                    ></i>
                </div>
            </div>

            <div id='update-admin-details-container' style={{ display: displayOfAdminUpdateContainer,}}>
                <div 
                    id='update-admin-form'
                    style={{
                        width : "50vw"
                    }}
                >
                    <label htmlFor="adminName">
                        Name <input type="text" ref={(el) => inputRefs.current[0] = el} onChange={(evt) => { setNewAdminName(evt) }} placeholder='Admin Name..' />
                    </label>
                    <label htmlFor="storeName">
                        StoreName <input type="Store Name" ref={(el) => inputRefs.current[1] = el} onChange={(evt) => { setNewAdminEmail(evt) }} placeholder='Email..' />
                    </label>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={(evt) => { handleUpdateAdmin(evt) }}>Update</button>
                        <button style={{ backgroundColor: 'crimson' }} onClick={(evt) => { handleCancelUpdateAdmin(evt) }}>Cancel</button>
                    </div>
                </div>
            </div>

            <nav id='seller-main-page-nav'>
                <img
                    className='seller-nav-items'
                    src="/src/assets/profile.webp"
                    id='seller-profile-pic'
                    alt="Profile"
                    width='60px'
                    onClick={() => {
                        setDisplayOfAdminProfileContainer('inline-block')
                        // setTimeout(setSlidingValue(0),400)
                        setTimeout(() => {
                            setSlidingValue(0)
                        }, 400)
                    }}
                />
                <div id='seller-main-page-link-container'>
                    <h4 className='seller-nav-items seller-main-page-links' onClick={(e) => { navigate('/sellerHome/addproduct', { state: { seller: seller } }) }}>Add Product</h4>
                    <h4 className='seller-nav-items seller-main-page-links' onClick={(e) => { navigate('/sellerHome/veiwproducts', { state: { seller: seller } }) }}>Veiw Products</h4>
                    <h4 className='seller-nav-items seller-main-page-links' onClick={(e) => { navigate('/sellerHome/veiwsales', { state: { seller: seller } }) }}>Veiw Sales</h4>
                </div>
            </nav>

            <Routes>
                <Route path='/addproduct' element={<AddProduct />} />
                <Route path='/veiwproducts' element={<ViewProducts />} />
                <Route path='/veiwsales' element={<ViewSales />} />
            </Routes>
        </div>
    );
};

export default SellerMainPage