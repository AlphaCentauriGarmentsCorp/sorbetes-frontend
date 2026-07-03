import '../design/ClientOrderForm.css'

import card1 from '../assets/card 1.png'
import card2 from '../assets/card 2.png'
import card3 from '../assets/card 3.png'
import card4 from '../assets/card 4.png'
import card5  from '../assets/card 5.png'
import Image_vector from '../assets/Image_vector.png'
import React from 'react'
import Footer from './Footer'
// import { Navigate } from 'react-router-dom'

const ClientOrderForm = () => {
  return (
   <div>
    <div className='page'>
        <br />
        <section className = "hero">
            <h1>Client <span> Orde</span>r Form</h1>
            <p>
                Welcome to Sorbetes Apparel Studio. We're happy to have you here 
                and excited to help bring your apparel ideas to life. Please take a moment to complete the form below with your order details so our team can accurately 
                understand your vision and assist you with care and precision.
            </p>
         

        </section>

        <section className = "form-container">
            <h5>Basic Information</h5>
            <hr />
            <br />


            <form action="" className = "form-grp">

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
                

            </form>

            <br />

            <h5>Order Details</h5>
            <hr />
            <br />

            <h4><span className="step">1</span> Garment Selection </h4>
            <br />

            <div className="option-row">
                <label className="pill">
                    <input type="radio" name="garment"  />
                    <span>T-shirt</span>
                </label>
                <label className="pill">
                    <input type="radio" name="garment"  />
                    <span>Hoodie</span>
                </label>
                <label className="pill ">
                    <input type="radio" name="garment"  />
                    <span>Others:</span>
                    <input type="text" placeholder='Please Specify' />
                </label>
            </div>
            <br />

            <div className="section">
                <h4><span className="step">2</span> Type</h4>
                <br />
                <div className="card-row">

                    

                    <label className="card">
                        <input type="radio" name="type" />
                        

                        <div className="image">
                            <img src={card1} alt="" />
                            
                        </div>

                        <div className="card-footer">
                            <span className="radio"></span>
                            <p>Standard (₱ 370-400)</p>
                            <span className="info">?</span>
                        </div>
                    </label>

                    <label className="card">
                        <input type="radio" name="type" />

                        <div className="image">
                            <img src={card3} alt="" />
                            
                        </div>

                        <div className="card-footer">
                            <span className="radio"></span>
                            <p>Oversized (₱ 370-430)</p>
                            <span className="info">?</span>
                        </div>
                    </label>

                    <label className="card">
                        <input type="radio" name="type" />

                        <div className="image">
                            <img src={card2} alt="" />
                            
                        </div>

                        <div className="card-footer">
                            <span className="radio"></span>
                            <p>Boxy (₱ 350-430)</p>
                            <span className="info">?</span>
                        </div>
                    </label>

                </div>

            </div>

            <br />

            <div className="radio-group">
                <label className="radio-card">
                    <input type="radio" name="print" />
                    <span> Others/Customization: </span>
                    <input type="text" className='custom-input ' placeholder='Please specify' />

                </label>

            </div>
            <br />

            <h4><span className = "step">3</span> Print Method</h4>

            <div className="radio-group">
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
            </div>

            <br />

            <h4><span className="step">4</span> Specification</h4>
            <br />

            <div className="specs">
                
                <label className="product-card ">
                    <input type="radio" name='print' />

                    <div className='image-wrapper'>
                        <img src={card4} alt="" />
                        <div className='img-icon'></div>
                    </div>

                    <div className="card-footer">
                        <span className="radio"></span>
                        <p>Standard</p>
                        <span className="info">?</span>
                    </div>
                </label>

                <label className="product-card ">
                    <input type="radio" name='print' />

                    <div className="image-wrapper">
                        <img src={card5} alt="" />
                        <div className = "img-icon"></div>
                    </div>

                    <div className = "card-footer">
                        <span className="radio"></span>
                        <p>Pro Club</p>
                        <span className = "info">?</span>

                    </div>

                </label>
            </div>

            

            <h5>Fabric Selection </h5>

            <div className="option-row">

                <label className="pill">
                    <input type="radio" name='garment' />
                    <span> Pemium</span>
                </label>
                 <label className="pill">
                    <input type="radio" name='garment' />
                    <span> Heavyweight</span>
                </label>

            </div>

            <br />

            <h5>Shirt Color</h5>
            <select className='choose-color'>
                <option >Choose Shirt Color</option>
                <option value="">Black</option>
                <option value="">White</option>
                <option value="">Beige</option>
            </select>

            <br />
            <br />

            <h4><span className="step">5</span> Mockup Files</h4>
            <br />
             <h5>How many colors for the front print?</h5>
            <br />
            <h5>Mockup Front</h5>
            <br />

           <input className="input" type="number" placeholder='Enter number of front print colors here' />

            <br />
            <br />

            <div className = "upload-box">
                <input type="file" id='fileInput' hidden />

                <div className="upload-content">
                    <div className="icon"><img src={Image_vector} alt="" /></div>
                    <p>Drop your image here,or upload</p>
                    <span>Supports: jpg, png</span>
                    <br />
                    <button >
                        Browse File
                    </button>
                </div>
            </div>

            <div className="file-list">
                <div className="file-item">
                    <span>frontprint.png</span>
                    <button className="remove-btn">x</button>

                </div>
            </div>

            <br />
            <h5>Front Print</h5>
            <br />
            <br />


            <div className = "upload-box">
                <input type="file" id='fileInput' hidden />

                <div className="upload-content">
                    <div className="icon"><img src={Image_vector} alt="" /></div>
                    <p>Drop your image here,or upload</p>
                    <span>Supports: jpg, png</span>
                    <br />
                    <button >
                        Browse File
                    </button>
                </div>
            </div>

            <div className="file-list">
                <div className="file-item">
                    <span>frontprint.png</span>
                    <button className="remove-btn"> x </button>

                </div>
            </div>
            <br />
            <br />
             <br />
             <h5>How many colors for the Back print?</h5>
            
             <br />

           <input className="input" type="number" placeholder='Enter number of front print colors here' />

            <br />

            <br />
            <h5>Mockup Back</h5>
            <br />

           <input className="input" type="number" placeholder='Enter number of front print colors here' />

            <br />
            <br />

            <div className = "upload-box">
                <input type="file" id='fileInput' hidden />

                <div className="upload-content">
                    <div className="icon"><img src={Image_vector} alt="" /></div>
                    <p>Drop your image here,or upload</p>
                    <span>Supports: jpg, png</span>
                    <br />
                    <button >
                        Browse File
                    </button>
                </div>
            </div>

            <div className="file-list">
                <div className="file-item">
                    <span>backprint.png</span>
                    <button className="remove-btn">x</button>

                </div>
            </div>

            <br />
            <h5>Back Print</h5>
            <br />

           <input className="input" type="number" placeholder='Enter number of front print colors here' />

            <br />
            <br />

            <div className = "upload-box">
                <input type="file" id='fileInput' hidden />

                <div className="upload-content">
                    <div className="icon"><img src={Image_vector} alt="" /></div>
                    <p>Drop your image here,or upload</p>
                    <span>Supports: jpg, png</span>
                    <br />
                    <button >
                        Browse File
                    </button>
                </div>
            </div>

            <div className="file-list">
                <div className="file-item">
                    <span>backprint.png</span>
                    <button className="remove-btn">x</button>

                </div>
            </div>
            
            <br />

            
                <div className="order-card">
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
                            <span>100.00 PHP</span>
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
                </div>

                <div className="button-group">
                    <button className="btn btn-submit" >Submit Form</button>
                    <button className="btn btn-download">
                        <span className="download-icon"></span> Download
                    </button>

                </div>

               

           


        </section>
         <Footer></Footer>
        
    </div>
   </div>
  )
}

export default ClientOrderForm