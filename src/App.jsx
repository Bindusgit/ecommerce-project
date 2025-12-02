import axios from 'axios'
import { Routes, Route } from 'react-router'
import { useState, useEffect } from 'react'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrdersPage from './pages/orders/OrdersPage'
import TrackingPage from './pages/TrackingPage'
import './App.css'



function App() {
  const [cart, setCart] = useState([]) //lifted up state from homepage
  
      const loadCart = async () => {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || ''
      const response = await axios.get(`${API_BASE}/api/cart-items?expand=product`)
      setCart(response.data)
    }

  useEffect(() => {
    loadCart()
  }, [])


  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
      <Route path="orders" element={<OrdersPage cart={cart} loadCart={loadCart} />} />
      <Route path="/tracking/:orderId/:productId" element={<TrackingPage cart={cart}/>} />
    </Routes>
  )
}
export default App
