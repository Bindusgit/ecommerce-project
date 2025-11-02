import { formatMoney } from '../../utils/money'
import axios from 'axios'
import { useState } from 'react'

function CartItemDetails({ cartItem, loadCart }) {
  const [quantity, setQuantity] = useState(cartItem.quantity)

  const updateCartItem = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, { quantity })
    await loadCart()
  }

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`)
    await loadCart()
  }

  return (
    <>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            <input
              type="number"
              value={quantity}
              min="1"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </span>
          <span className="update-quantity-link link-primary" onClick={updateCartItem}>
            Update
          </span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div>
    </>
  )
}

export default CartItemDetails