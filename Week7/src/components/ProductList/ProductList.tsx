import React from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductCard } from '../ProductCard/ProductCard';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const ProductList: React.FC = () => {
  const {
    products,
    allCategories,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  } = useProducts();

  if (loading) {
    return (
      <div className="loader-container" id="product-list-loader">
        <div className="spinner"></div>
        <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
          Fetching premium catalog...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" id="product-list-error">
        <h3>Oops! Failed to load products.</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="error-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div id="product-list-component">
      {/* Filters Bar */}
      <div className="filters-bar">
        {/* Search Bar */}
        <div className="search-wrapper">
          <Search size={18} className="search-icon-svg" />
          <input
            type="text"
            className="search-input"
            placeholder="Search products by title, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SlidersHorizontal size={18} style={{ color: 'var(--text-secondary)' }} />
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {allCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Selection */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowUpDown size={18} style={{ color: 'var(--text-secondary)' }} />
          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="no-products glass-panel">
            <h2>No Products Found</h2>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
              We couldn't find any products matching your filters. Try clearing search or category filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
