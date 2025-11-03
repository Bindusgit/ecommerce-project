import axios from 'axios'
import { useState, useEffect } from 'react'
import { OrderSummary } from './OrderSummary'
import { PaymentSummary } from './PaymentSummary'
import './CheckoutPage.css'
import CheckoutHeader from './CheckoutHeader'

function CheckoutPage({ cart, loadCart}) {
  const [deliveryOptions, setDeliveryOptions] = useState([])
  const [paymentSummary, setPaymentSummary] = useState(null)

  // useEffect(() => {
  //   const fetchCheckoutData = async () => {
  //     let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
  //     setDeliveryOptions(response.data)
  //     response = await axios.get('./api/payment-summary')
  //     setPaymentSummary(response.data)
  //   }
  //   fetchCheckoutData()
  // }, [cart])
 
  //updating the original useEffect to use the dependency array[]
 // seperating the code that reloads the paymentSummary into another useEffect(this should use dependency array[cart])
 
 //This useEffect will only run once.
 useEffect(() => {
    const fetchCheckoutData = async () => {
        const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
        setDeliveryOptions(response.data)
    }
    fetchCheckoutData()
  },[])

  // This useEffect will run every time the cart changes.
  useEffect(() => {
      const fetchPaymentSummary = async () => {
          const response = await axios.get('/api/payment-summary')
          setPaymentSummary(response.data)
      }
      fetchPaymentSummary()
  }, [cart])


  return (
    <>
      <title>Checkout</title>
      <CheckoutHeader cart={cart}/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        </div>
      </div>
    </>
  )
}
export default CheckoutPage