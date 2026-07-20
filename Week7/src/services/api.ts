/**
 * API service for fetching e-commerce data from FakeStoreAPI.
 */

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

const BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products
 */
export async function fetchAllProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id: string | number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}: ${response.statusText}`);
  }
  const data = await response.json();
  if (!data) {
    throw new Error('Product not found');
  }
  return data;
}

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch products within a specific category
 */
export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products for category ${category}: ${response.statusText}`);
  }
  return response.json();
}
