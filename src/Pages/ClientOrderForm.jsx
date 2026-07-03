import '../design/ClientOrderForm.css'


import card1 from '../assets/card 1.png'
import card2 from '../assets/card 2.png'
import card3 from '../assets/card 3.png'
import card4 from '../assets/card 4.png'
import card5  from '../assets/card 5.png'
import Image_vector from '../assets/Image_vector.png'
import React from 'react'
import Footer from './Footer'
import { useNavigate } from "react-router-dom";
// import { Navigate } from 'react-router-dom'

const ClientOrderForm = () => {
     const navigate = useNavigate();
  return (
   <div>
    <section className = "hero">
            <h1>Client <span> Orde</span>r Form</h1>
            <p>
                Welcome to Sorbetes Apparel Studio. We're happy to have you here 
                and excited to help bring your apparel ideas to life. Please take a moment to complete the form below with your order details so our team can accurately 
                understand your vision and assist you with care and precision.
            </p>
            <br />
            <hr />
    </section>
        <form action="">
    
        <section className='container'>
            <div className='content'>
            <p1>Order Details</p1>
           
            <section action="" className = "form-grp">

                <div className = "form">
                    <label>Your Name</label>
                    <input type="text" placeholder='Enter your name' />
                </div>
                <div className = "form">
                    <label>Email</label>
                    <input type="email" placeholder='Enter your email' />
                </div>
                <div className = "form">
                    <label>Brand name</label>
                    <input type="text" placeholder='Enter your brand name' />
                </div>
                <div className = "form">
                    <label>Contact number</label>
                    <input type="email" placeholder='Enter your contact number' />
                </div>
                

            </section>

            <br />

            <p1>Order Details</p1>
             <hr />
           

             <h4><span className="step">1</span> Garment Selection </h4>
            
            <div className='option-row'>
                <label className="pill">
                    <input type="radio" name='garment' />
                    <span>T-shirt</span>
                </label>

                <label className="pill">
                    <input type="radio" name='garment' />
                    <span>T-shirt</span>
                </label>

                <label className="pill">
                    <input type="radio" name='garment' />
                    <span>T-shirt</span>
                </label>

            </div>
            <br />
            <section >
                <h4><span className="step">2</span> Type</h4>
                <div className='card-row'>

                    <label className='card'>
                        
                        <div className='image'>
                            <img src={card1} alt="" />
                        </div>
                        <div className='card-footer'>
                            <input type="radio" name='type' />
                            <p>Standard</p>
                            <span>?</span>
                        </div>
                    </label>

                    <label className='card'>
                       
                        <div className='image'>
                            <img src={card1} alt="" />
                        </div>
                        <div className='card-footer'>
                           <input type="radio" name='type' />
                            <p>Standard</p>
                            <span>?</span>
                        </div>
                    </label>

                    <label className='card'>
                       
                        <div className='image'>
                            <img src={card1} alt="" />
                        </div>
                        <div className='card-footer'>
                           <input type="radio" name='type' />
                            <p>Standard</p>
                            <span>?</span>
                        </div>
                    </label>

                </div>
                 <br />

                <div className="radio-group">
                    <label className="radio-card">
                        <input type="radio" name="type" />
                        <span> Others/Customization: </span>
                        <input type="text" className='custom-input ' placeholder='Please specify' />

                    </label>

                </div>
            </section>

           
            <br />
            <h4><span className = "step">3</span> Print Method</h4>

            <section className="radio-group">
                <label className="radio-card">
                    <input type="radio" name="print" />
                    <span>Silkscreen</span>
                </label>

                <label className="radio-card">
                    <input type="radio" name='print' />
                    <span>DTF</span>
                </label>

                <label className="radio-card">
                    <input type="radio" name='print' />
                    <span>Sublimation</span>
                </label>

                <label className="radio-card">
                    <input type="radio" name='print' />
                    <span>Embroidery</span>
                </label>

                <label className="radio-card">
                    <input type="radio" name='print' />
                    <span>High Density</span>
                </label>
            </section>

            <br />

            <h4><span className="step">4</span> Specification</h4>
            <br />
            <section className='card-row'>
                    <label className='card'>
                        
                        <div className='image'>
                            <img src={card4} alt="" />
                        </div>
                        <div className='card-footer'>
                            <input type="radio" name='type' />
                            <p>Standard</p>
                            <span>?</span>
                        </div>
                    </label>

                    <label className='card'>
                       
                        <div className='image'>
                            <img src={card5} alt="" />
                        </div>
                        <div className='card-footer'>
                           <input type="radio" name='type' />
                            <p>Standard</p>
                            <span>?</span>
                        </div>
                    </label>
                </section>

                <h5>Fabric Selection </h5>
                
                <section className='option-row'>
                    <label className='pill'>
                        <input type="radio" name='garment' />
                        <span>Premium</span>
                    </label>
                    <label className='pill'>
                        <input type="radio" name='garment' />
                        <span>Heavyweight</span>
                    </label>
                </section>

                <h5>Shirt Color</h5>
                
                    <select className='choose-color' >
                        <option >Choose Shirt Color</option>
                        <option value="">Black</option>
                        <option value="">White</option>
                        <option value="">Beige</option>
                    </select>
                <br />

                <h4><span className="step">5</span> Mockup Files</h4>

                <h5>How many colors for the front print?</h5>

                <section className='input-numbers'>
                    <input className="input" type="number" placeholder='Enter number of front print colors here' />
                </section>

                <h5>Mockup Front</h5>

                <section className='upload-box'>
                    <input type="file" id='fileInput' hidden />
                    <div className="upload-content">
                        <div className="icon"><img src={Image_vector} alt="" /></div>
                        <p>Drop your image here,or upload</p>
                        <span>Supports: jpg, png</span>
                        <br />
                        <button >Browse File</button>
                    </div>
                </section>

                <section className='file-list'>
                    <div className='file-item'>
                        <span>frontprint.png</span>
                        <button className='remove-btn'>x</button>
                    </div>
                </section>

                <h5>Mockup Front</h5>

                <section className='upload-box'>
                    <input type="file" id='fileInput' hidden />
                    <div className="upload-content">
                        <div className="icon"><img src={Image_vector} alt="" /></div>
                        <p>Drop your image here,or upload</p>
                        <span>Supports: jpg, png</span>
                        <br />
                        <button >Browse File</button>
                    </div>
                </section>

                <section className='file-list'>
                    <div className='file-item'>
                        <span>frontprint.png</span>
                        <button className='remove-btn'>x</button>
                    </div>
                </section>

                <h5>Mockup Front</h5>

                <section className='upload-box'>
                    <input type="file" id='fileInput' hidden />
                    <div className="upload-content">
                        <div className="icon"><img src={Image_vector} alt="" /></div>
                        <p>Drop your image here,or upload</p>
                        <span>Supports: jpg, png</span>
                        <br />
                        <button >Browse File</button>
                    </div>
                </section>

                <section className='file-list'>
                    <div className='file-item'>
                        <span>frontprint.png</span>
                        <button className='remove-btn'>x</button>
                    </div>
                </section>

                <h5>Mockup Front</h5>

                <section className='upload-box'>
                    <input type="file" id='fileInput' hidden />
                    <div className="upload-content">
                        <div className="icon"><img src={Image_vector} alt="" /></div>
                        <p>Drop your image here,or upload</p>
                        <span>Supports: jpg, png</span>
                        <br />
                        <button >Browse File</button>
                    </div>
                </section>

                <section className='file-list'>
                    <div className='file-item'>
                        <span>frontprint.png</span>
                        <button className='remove-btn'>x</button>
                    </div>
                </section>

                <br />

                <section className="order-card">
                    <div className = "notice-bar">
                        
                        <p><span className="info-icon">i</span>A ₱1,000 sample fee applies. A 50% downpayment is required </p>
                    </div>

                    <div className="summary-content">
                        <h2>Order Summary</h2>
                        <hr />

                        <div className="summary-item">
                            <span>Sample Fee</span>
                            <span>100.00 PHP</span>
                        </div>

                        <div className="summary-item">
                            <span>60% Downpayment</span>
                            <span >100.00 PHP</span>
                        </div>

                         <div className="summary-item">
                            <span>40% Downpayment</span>
                            <span>100.00 PHP</span>
                        </div>

                        <hr />

                        <div className="summary-item total">
                            <strong>Total Price</strong>
                            <strong>100.00PHP</strong>
                        </div>
                    </div>
                </section>

                <section className="button-group">
                    <button className="btn btn-submit" onClick={() => navigate("/orderForm")}>Submit Form</button>
                    <button className="btn btn-download">
                        <span className="download-icon"></span> Download
                    </button>

                </section>



            </div>
           
        </section>

        <Footer></Footer>

        </form>
   </div>
   
  )
}

export default ClientOrderForm