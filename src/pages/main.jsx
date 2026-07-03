import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../design/index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Practice from './practice.jsx'
import About from './About.jsx'
import ClientOrderForm from './ClientOrderForm.jsx'
import Footer from './Footer.jsx'
import OrderForm from './OrderForm.jsx'
import ClientOrderForm1 from './ClientOrderForm1.jsx'
import OrderForm_ShippingInfo from './OrderForm_ShippingInfo.jsx'







createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
       <Route>
        <Route path="/" element={<App />} />
        <Route path="practice" element={<Practice />} />
        <Route path="about" element={<About />} />
        <Route path="clientOrderForm" element={<ClientOrderForm />} />
        
        <Route path="orderForm" element={<OrderForm/>}/>
        <Route path="shippingForm" element={<OrderForm_ShippingInfo/>}/>
        <Route path="footer" element={<Footer />} />

        
       </Route>
      </Routes>
    </BrowserRouter>
   
  </StrictMode>,
)

