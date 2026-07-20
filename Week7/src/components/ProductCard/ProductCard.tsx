import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../services/api';
import { useCart } from '../../contexts/CartContext';
import { Star, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click navigation
    addToCart(product, 1);
  };

  return (
    <div className="product-card" id={`product-card-${product.id}`} onClick={handleCardClick}>
      <div className="product-card-image-wrapper">
        <span className="product-card-category">{product.category}</span>
        <img
          src={product.image}
          alt={product.title}
          className="product-card-image"
          loading="lazy"
        />
      </div>

      <div className="product-card-info">
        <h3 className="product-card-title">{product.title}</h3>
        
        <div className="product-card-rating">
          <Star size={16} className="star-icon" />
          <span>{product.rating.rate.toFixed(1)}</span>
          <span style={{ color: 'var(--text-light)', marginLeft: '0.2rem' }}>
            ({product.rating.count})
          </span>
        </div>

        <div className="product-card-footer">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          <button className="product-card-btn" onClick={handleAddToCart}>
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
