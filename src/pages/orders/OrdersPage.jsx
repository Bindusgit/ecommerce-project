import axios from 'axios'
import { useState, useEffect } from 'react';
import Header from '../../components/Header'
import './OrdersPage.css'
import OrdersGrid from './OrdersGrid';

function OrdersPage({ cart, loadCart }) {

  const [orders, setOrders] = useState([])
  useEffect(() => {
    const fetchOrdersdata = async () => {
      const response = await axios.get('/api/orders?expand=products')
      setOrders(response.data)
    }
    fetchOrdersdata()
  }, [])
  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  )
}
export default OrdersPage