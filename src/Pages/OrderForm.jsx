import '../design/OrderForm.css'

import React from 'react'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'

const OrderForm = () => {
    const navigate = useNavigate();
  return (
    <div className='body'>
        <section className='form-container'>
        <h1> Or<span>der F</span>orm </h1>
        <br />
        <p>Please enter your reference to access your shipping and payment details. You can find it in your Orders.</p>
        <hr />
        <br />
        <form action="" className='form-grid'>
            <div className='form-group'>
                <label htmlFor="">Reference Number</label>
                <input type="text" placeholder='Enter your reference number' />

            </div>

        </form>

    </section>

        <div className='button-group'>
            <button className='btn btn-download' onClick={() => navigate("/shippingForm") }>
                    Submit
            </button>
        </div>

        <Footer></Footer>
    </div>
    
  )
}

export default OrderForm