import React from 'react';
import { Checkout } from '../components/Checkout/Checkout';

const CheckoutPage: React.FC = () => {
  return (
    <div className="checkout-page-container" id="checkout-page-view" style={{ minHeight: '65vh' }}>
      {/* Primary Checkout component view */}
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
