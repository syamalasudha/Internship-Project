import { useState, useEffect, useMemo } from 'react';
import { fetchAllProducts, fetchProductsByCategory, fetchCategories, Product } from '../services/api';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>(''); // 'price-asc' | 'price-desc' | 'rating-desc' | ''

  // Fetch categories once on mount
  useEffect(() => {
    let active = true;
    fetchCategories()
      .then((data) => {
        if (active) {
          setCategories(data);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch categories:', err);
      });
    return () => {
      active = false;
    };
  }, []);

  // Fetch products when selectedCategory changes
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const loadProducts = async () => {
      try {
        let data: Product[];
        if (selectedCategory) {
          data = await fetchProductsByCategory(selectedCategory);
        } else {
          data = await fetchAllProducts();
        }
        if (active) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err: any) {
        if (active) {
          setError(err.message || 'Something went wrong while fetching products');
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, [selectedCategory]);

  // Derived filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter (title, description, category)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return result;
  }, [products, searchQuery, sortBy]);

  return {
    products: filteredProducts,
    allCategories: categories,
    loading,
    error,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  };
}
