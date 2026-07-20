import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { CreditCard, ShieldCheck, Mail, MapPin, Phone, User, CheckCircle, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

interface FormErrors {
  [key: string]: string;
}

export const Checkout: React.FC = () => {
  const { cartItems, cartTotal, subtotal, tax, shipping, clearCart } = useCart();
  const { currentUser } = useAuth();
  
  // Initialize fields (autofill with currentUser email & name if logged in!)
  const [fields, setFields] = useState<FormFields>({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: currentUser?.name || '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [createdOrderId, setCreatedOrderId] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required fields check
    const required: (keyof FormFields)[] = [
      'fullName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zipCode',
      'cardName',
      'cardNumber',
      'expiry',
      'cvv',
    ];

    required.forEach((f) => {
      if (!fields[f].trim()) {
        newErrors[f] = 'This field is required';
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fields.email && !emailRegex.test(fields.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (7+ digits, digits only or with spaces/dashes)
    const phoneRegex = /^[\d\s\-()+]{7,}$/;
    if (fields.phone && !phoneRegex.test(fields.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Card number validation (standard 16 digit check)
    const cardRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$|^\d{16}$/;
    if (fields.cardNumber && !cardRegex.test(fields.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    // Expiry validation (MM/YY or MM/YYYY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/;
    if (fields.expiry && !expiryRegex.test(fields.expiry)) {
      newErrors.expiry = 'Use MM/YY format';
    }

    // CVV validation (3 or 4 digits)
    const cvvRegex = /^\d{3,4}$/;
    if (fields.cvv && !cvvRegex.test(fields.cvv)) {
      newErrors.cvv = 'Must be 3 or 4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate payment gateway submission latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      customer: {
        fullName: fields.fullName,
        email: fields.email,
        phone: fields.phone,
        address: fields.address,
        city: fields.city,
        state: fields.state,
        zipCode: fields.zipCode,
      },
      items: cartItems,
      total: cartTotal,
      date: new Date().toISOString(),
    };

    // Save order history in Local Storage
    try {
      const existingOrders = JSON.parse(localStorage.getItem('order_history') || '[]');
      existingOrders.push(newOrder);
      localStorage.setItem('order_history', JSON.stringify(existingOrders));
    } catch (err) {
      console.error('Error saving order:', err);
    }

    setCreatedOrderId(orderId);
    setOrderSuccess(true);
    setIsSubmitting(false);
    clearCart();
  };

  // Render Order Success Screen
  if (orderSuccess) {
    return (
      <div className="success-view" id="checkout-success-view">
        <div className="success-icon-container">
          <CheckCircle size={44} />
        </div>
        <h2 className="success-title">Order Placed Successfully!</h2>
        <p className="success-desc">
          Thank you for shopping with us, <strong>{fields.fullName}</strong>. A confirmation email has been sent to {fields.email} with your shipping details.
        </p>
        <div>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Order reference number:</span>
          <br />
          <span className="success-order-id">{createdOrderId}</span>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/" className="shop-now-btn" style={{ background: 'var(--primary-gradient)' }}>
            <ArrowLeft size={18} />
            <span>Return to Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  // Handle empty cart checkout redirect
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-view glass-panel" id="checkout-empty-view">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <ShoppingBag size={80} style={{ color: 'var(--text-light)' }} />
        </div>
        <h2 className="empty-cart-title">No Items for Checkout</h2>
        <p className="empty-cart-subtitle">
          Your shopping cart is currently empty. Please select products to purchase before proceeding to checkout.
        </p>
        <Link to="/" className="shop-now-btn">
          <span>Go to Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div id="checkout-component">
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2.25rem' }}>Secure Checkout</h2>
      
      <form onSubmit={handleSubmit} className="checkout-container">
        
        {/* Checkout Forms Section */}
        <div className="checkout-form-sec">
          
          {/* Shipping Information */}
          <div className="checkout-card glass-panel">
            <h3 className="checkout-card-title">
              <MapPin size={20} style={{ color: 'var(--primary-color)' }} />
              <span>Shipping Address</span>
            </h3>

            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="John Doe"
                  value={fields.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="input-error-msg">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="johndoe@example.com"
                  value={fields.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="input-error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="(555) 019-2834"
                  value={fields.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="input-error-msg">{errors.phone}</span>}
              </div>

              <div className="form-group full-width">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  name="address"
                  className={`form-input ${errors.address ? 'error' : ''}`}
                  placeholder="123 Shopping Blvd"
                  value={fields.address}
                  onChange={handleChange}
                />
                {errors.address && <span className="input-error-msg">{errors.address}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className={`form-input ${errors.city ? 'error' : ''}`}
                  placeholder="Metropolis"
                  value={fields.city}
                  onChange={handleChange}
                />
                {errors.city && <span className="input-error-msg">{errors.city}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">State / Province</label>
                <input
                  type="text"
                  name="state"
                  className={`form-input ${errors.state ? 'error' : ''}`}
                  placeholder="NY"
                  value={fields.state}
                  onChange={handleChange}
                />
                {errors.state && <span className="input-error-msg">{errors.state}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  className={`form-input ${errors.zipCode ? 'error' : ''}`}
                  placeholder="10001"
                  value={fields.zipCode}
                  onChange={handleChange}
                />
                {errors.zipCode && <span className="input-error-msg">{errors.zipCode}</span>}
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="checkout-card glass-panel">
            <h3 className="checkout-card-title">
              <CreditCard size={20} style={{ color: 'var(--primary-color)' }} />
              <span>Credit Card Information</span>
            </h3>

            <div className="form-grid">
              <div className="form-group full-width">
                <label className="form-label">Name on Card</label>
                <input
                  type="text"
                  name="cardName"
                  className={`form-input ${errors.cardName ? 'error' : ''}`}
                  placeholder="John Doe"
                  value={fields.cardName}
                  onChange={handleChange}
                />
                {errors.cardName && <span className="input-error-msg">{errors.cardName}</span>}
              </div>

              <div className="form-group full-width">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  maxLength={19}
                  className={`form-input ${errors.cardNumber ? 'error' : ''}`}
                  placeholder="0000 0000 0000 0000"
                  value={fields.cardNumber}
                  onChange={handleChange}
                />
                {errors.cardNumber && <span className="input-error-msg">{errors.cardNumber}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Expiration Date</label>
                <input
                  type="text"
                  name="expiry"
                  maxLength={5}
                  className={`form-input ${errors.expiry ? 'error' : ''}`}
                  placeholder="MM/YY"
                  value={fields.expiry}
                  onChange={handleChange}
                />
                {errors.expiry && <span className="input-error-msg">{errors.expiry}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">CVV / Security Code</label>
                <input
                  type="password"
                  name="cvv"
                  maxLength={4}
                  className={`form-input ${errors.cvv ? 'error' : ''}`}
                  placeholder="123"
                  value={fields.cvv}
                  onChange={handleChange}
                />
                {errors.cvv && <span className="input-error-msg">{errors.cvv}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Order Summary Panel */}
        <div className="summary-panel glass-panel">
          <h3 className="summary-title">Summary Of Goods</h3>

          <div className="mini-summary-items">
            {cartItems.map((item) => (
              <div className="mini-item" key={item.product.id}>
                <div className="mini-img-box">
                  <img src={item.product.image} alt={item.product.title} className="mini-img" />
                </div>
                <div className="mini-details">
                  <p className="mini-title">{item.product.title}</p>
                  <p className="mini-qty">Qty: {item.quantity}</p>
                </div>
                <span className="mini-price">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>${subtotal.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Estimated Tax (8%)</span>
            <strong>${tax.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</strong>
          </div>

          <div className="summary-row total" style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <span>Final Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <button type="submit" className="checkout-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={20} />
                <span>Place Order Safely</span>
              </>
            )}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1rem', color: 'var(--text-light)', fontSize: '0.75rem' }}>
            <ShieldCheck size={14} style={{ color: 'var(--success-color)' }} />
            <span>Your transaction is encrypted & secure</span>
          </div>
        </div>
      </form>
    </div>
  );
};
