import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export const Cart: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    tax,
    shipping,
    cartTotal,
  } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-view glass-panel" id="empty-cart-component">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <ShoppingBag size={80} style={{ color: 'var(--text-light)' }} />
        </div>
        <h2 className="empty-cart-title">Your Cart is Empty</h2>
        <p className="empty-cart-subtitle">
          Looks like you haven't added anything to your cart yet. Explore our top products and find something you love!
        </p>
        <Link to="/" className="shop-now-btn">
          <span>Explore Products</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div id="cart-component">
      <div className="cart-header">
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Shopping Bag</h2>
        <button onClick={clearCart} className="clear-cart-btn">
          <Trash2 size={16} />
          <span>Clear Cart</span>
        </button>
      </div>

      <div className="cart-layout">
        {/* Cart Items List */}
        <div className="cart-items-panel">
          {cartItems.map((item) => (
            <div className="cart-item-card" key={item.product.id} id={`cart-item-${item.product.id}`}>
              <div className="cart-item-image-box">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="cart-item-img"
                />
              </div>

              <div className="cart-item-details">
                <h4 className="cart-item-title">{item.product.title}</h4>
                <p className="cart-item-category">{item.product.category}</p>
                <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
              </div>

              {/* Quantity Selector */}
              <div className="quantity-controller">
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                className="cart-item-remove-btn"
                onClick={() => removeFromCart(item.product.id)}
                aria-label="Remove item from cart"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary Side Panel */}
        <div className="summary-panel glass-panel">
          <h3 className="summary-title">Order Summary</h3>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          
          <div className="summary-row">
            <span>Simulated Tax (8%)</span>
            <strong>${tax.toFixed(2)}</strong>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <strong>
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </strong>
          </div>
          
          {shipping > 0 && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '-0.5rem', marginBottom: '1rem' }}>
              Free shipping on orders over $100.00! Add <strong>${(100 - subtotal).toFixed(2)}</strong> more to unlock.
            </p>
          )}

          <div className="summary-row total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <button onClick={() => navigate('/checkout')} className="checkout-btn">
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
