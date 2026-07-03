import wLogo from '../assets/w_logo.png'
import React from 'react'
import Footer from './Footer'

const Practice = () => {
  return (
   <div className="page">
      <div className="hero">
        <h1>Client <span>Order</span> Form</h1>

        <p>
          Welcome to Sorbetes Apparel Studio...
        </p>

        <section className="form-container">
          <h3>Basic Information</h3>
          <hr />
          <br />

          <form className="form-grid">
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="form-group">
              <label>Brand Name</label>
              <input type="text" placeholder="Enter your brand name" />
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <input type="text" placeholder="Enter your contact number" />
            </div>
          </form>
        </section>
      </div>

      <Footer logoSrc={wLogo} />
    </div>
  )
}

export default Practice