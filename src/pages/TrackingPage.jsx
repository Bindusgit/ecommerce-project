import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import "../components/header.css";
import './TrackingPage.css';

function TrackingPage() {
  // ✅ Get params from URL
  const { orderId, productId } = useParams();

  // ✅ Local state for the tracking data
  const [orderProduct, setOrderProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrackingData() {
      try {
        const response = await axios.get(`/api/orders/${orderId}?expand=products`);
        const orderData = response.data;

        // Find the specific product within the order
        const foundProduct = orderData.products.find(
          (p) => p.product.id === productId
        );

        setOrderProduct(foundProduct);
      } catch (error) {
        console.error('Error fetching tracking data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrackingData();
  }, [orderId, productId]);

  if (loading) {
    return <div className="tracking-page"><p>Loading tracking info...</p></div>;
  }

  if (!orderProduct) {
    return (
      <div className="tracking-page">
        <p>Product not found for this order.</p>
      </div>
    );
  }

  // ✅ Format delivery date
  const formattedDate = dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D');

  return (
    <>
      <title>Tracking</title>

      <div className="header">
        <div className="left-section">
          <a href="/" className="header-link">
            <img className="logo" src="images/logo-white.png" alt="Logo" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" alt="Mobile Logo" />
          </a>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />
          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" alt="Search" />
          </button>
        </div>

        <div className="right-section">
          <a className="orders-link header-link" href="/orders">
            <span className="orders-text">Orders</span>
          </a>

          <a className="cart-link header-link" href="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" alt="Cart" />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          {/* ✅ Dynamic delivery info */}
          <div className="delivery-date">
            Arriving on {formattedDate}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img
            className="product-image"
            src={orderProduct.product.image}
            alt={orderProduct.product.name}
          />

          {/* ✅ Progress section — can later be made dynamic */}
          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;
