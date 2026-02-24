import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContactPage from './Pages/ContactPage.jsx'
import { Check } from 'lucide-react'
import CheckoutPage from './components/CheckoutPage.jsx'
import CartPage from './components/CartPage.jsx'
import ShopPage from './components/ShopPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  {/* <ContactPage/> */}
  {/* <CheckoutPage/> */}
  {/* <CartPage/> */}
  {/* <ShopPage/> */}
  </StrictMode>,
)
