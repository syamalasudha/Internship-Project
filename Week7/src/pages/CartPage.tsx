import React from 'react';
import { Cart } from '../components/Cart/Cart';

const CartPage: React.FC = () => {
  return (
    <div className="cart-page-container" id="cart-page-view" style={{ minHeight: '60vh' }}>
      {/* Primary Cart view container */}
      <Cart />
    </div>
  );
};

export default CartPage;
