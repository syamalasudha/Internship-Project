import React from 'react';
import { ProductList } from '../components/ProductList/ProductList';
import { Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="home-container" id="home-page-view">
      {/* Hero Header Banner */}
      <header className="catalog-header" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-color)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          <Sparkles size={16} />
          <span>New Summer Collection 2026</span>
        </div>
        <h1 className="catalog-title" style={{ fontSize: '2.5rem', lineHeight: 1.15, fontWeight: 800 }}>
          Discover Limitless Styles. <br />
          Seamless Shopping.
        </h1>
        <p className="catalog-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Browse curated high-quality goods across jewelry, fashion, apparel, and premium electronics with ultra-fast secure checkout.
        </p>
      </header>

      {/* Main Catalog View with Filters */}
      <ProductList />
    </div>
  );
};

export default Home;
