import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductById, Product } from '../services/api';
import { useCart } from '../contexts/CartContext';
import { Star, ShoppingCart, ArrowLeft, Check, ShieldCheck, Truck } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);

  useEffect(() => {
    let active = true;
    if (!id) return;

    setLoading(true);
    setError(null);

    fetchProductById(id)
      .then((data) => {
        if (active) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err: any) => {
        if (active) {
          setError(err.message || 'Failed to load product details.');
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    
    // Provide a neat visual feedback
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="loader-container" id="detail-loader">
        <div className="spinner"></div>
        <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
          Retrieving specification details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container" id="detail-error">
        <h3>Oops! Product Not Found</h3>
        <p>{error || 'The requested product detail could not be loaded.'}</p>
        <button onClick={() => navigate('/')} className="error-btn">
          Back to Catalog
        </button>
      </div>
    );
  }

  // Stock status simulation based on product ID odd/even
  const isOutOfStock = product.id === 17 || product.id === 9; // simulate stockout for some IDs
  const stockCount = isOutOfStock ? 0 : (product.id * 7) % 25 + 2;

  return (
    <div id="product-detail-page-view">
      {/* Back to Home Button */}
      <Link to="/" className="back-btn">
        <ArrowLeft size={18} />
        <span>Back to Catalog</span>
      </Link>

      <div className="product-detail-container">
        {/* Left Side: Product Image wrapper */}
        <div className="product-detail-image-sec">
          <img
            src={product.image}
            alt={product.title}
            className="product-detail-img"
            loading="lazy"
          />
        </div>

        {/* Right Side: Product Details info */}
        <div className="product-detail-info-sec">
          <span className="product-detail-cat">{product.category}</span>
          <h1 className="product-detail-title">{product.title}</h1>

          {/* Rating */}
          <div className="product-detail-rating-row">
            <div className="product-detail-rating">
              <Star size={16} style={{ fill: '#d97706', color: '#d97706' }} />
              <span>{product.rating.rate.toFixed(1)}</span>
            </div>
            <span className="product-detail-reviews">
              Based on {product.rating.count} verified customer reviews
            </span>
          </div>

          {/* Price */}
          <div className="product-detail-price">
            ${product.price.toFixed(2)}
          </div>

          {/* Description */}
          <p className="product-detail-desc">
            {product.description}
          </p>

          {/* Stock Status Simulation */}
          <div className="product-detail-stock">
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)', marginRight: '0.5rem' }}>Availability:</span>
            {isOutOfStock ? (
              <span className="stock-badge" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
                Temporarily Out Of Stock
              </span>
            ) : (
              <span className="stock-badge in-stock">
                In Stock ({stockCount} units left)
              </span>
            )}
          </div>

          {/* Shopping Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={15} style={{ color: 'var(--primary-color)' }} />
              <span>Complimentary insured express shipping for orders above $100</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ShieldCheck size={15} style={{ color: 'var(--primary-color)' }} />
              <span>Full 2-Year authorized warranty & secure checkout coverage</span>
            </div>
          </div>

          {/* Actions: Quantity + Add button */}
          {!isOutOfStock && (
            <div className="product-detail-actions">
              <div className="quantity-controller">
                <button className="quantity-btn" onClick={handleDecrease} aria-label="Reduce count">
                  <ArrowLeft size={16} />
                </button>
                <span className="quantity-display">{quantity}</span>
                <button className="quantity-btn" onClick={handleIncrease} aria-label="Increase count">
                  <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
                </button>
              </div>

              <button
                className="add-to-cart-big-btn"
                onClick={handleAddToCart}
                style={{ background: isAddedFeedback ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'var(--primary-gradient)' }}
              >
                {isAddedFeedback ? (
                  <>
                    <Check size={20} />
                    <span>Added To Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>Add {quantity} To Cart</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
