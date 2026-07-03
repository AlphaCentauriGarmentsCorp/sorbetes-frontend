import '../design/OrderForm_ShippingInfo.css'
import React from 'react'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'


const OrderForm_ShippingInfo = () => {
    const navigate = useNavigate();
  return (
    <div>
        <section className='hero'>
            <h1>Or<span>der F</span>orm</h1>
            <p>Please enter your shipping location to ensure accurate delivery and proceed to the payment section.</p>
            <br />
            <hr />

        </section>

        <form action="">
            <section className='container'>
            <div className='content'>

                <h4>Shipping Address</h4>

                <div className='form'>
                    <label>Street</label>
                    <input type="text"  placeholder='Enter your street'/>
                </div>

                <section className='form-grp'>
                    <div className='form'>
                        <label>City</label>
                        <input type="text" placeholder='Enter your city' />

                    </div>

                    <div className='form'>
                        <label>Province</label>
                        <input type="text" placeholder='Enter your province' />

                    </div>

                    <div className='form'>
                        <label>Postal Code</label>
                        <input type="text" placeholder='Enter your postal code' />

                    </div>

                    <div className='form'>
                        <label>Country</label>
                        <input type="text" placeholder='Enter your country' />

                    </div>

                </section>

                 <h4>Courier</h4>

                 <section className='form-grp'>
                    <div className='form'>
                        <label>Preferred Courier</label>
                        <select>
                            <option>Select your preferred courier</option>
                            <option value="">courier 1</option>
                            <option value="">courier 2</option>
                            <option value="">courier 3</option>

                        </select>
                        
                    </div>

                    <div className='form'>
                        <label>Shipping Method</label>
                        <select>
                            <option>Select shipping metod</option>
                            <option value="">Ship 1</option>
                            <option value="">Ship 2</option>
                            <option value="">Ship 3</option>
                        </select>
                    </div>

                    <div className='form'>
                        <label>Reciever's Name</label>
                        <input type="text" placeholder='Enter reciever name' />

                    </div>

                    <div className='form'>
                        <label>Contact Number</label>
                        <input type="number" placeholder='Enter your number' />

                    </div>

                </section>


            </div>
        </section>

        <div className = "notice-bar">
                        
            <p><span className="info-icon">i</span>Please review your order details before proceeding to the next step</p>
        </div>
        <br />

        <section className='button-group'>
            <button className='btn btn-submit' onClick={() => navigate("/shippingForm")} >My Order Details</button>
            <button className='btn btn-download'>
                <span className='download-icon'>Next</span>
            </button>

        </section>


        </form>
        <Footer></Footer>
    </div>
  )
}

export default OrderForm_ShippingInfo