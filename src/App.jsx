import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import CategoryFilter from './components/CategoryFilter';
import SortMenu from './components/SortMenu';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // change as needed

  // Fetch categories
  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then(res => setCategories(res.data))
      .catch(() => console.error('Failed to fetch categories'));
  }, []);

  // Fetch products
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    let url = 'https://dummyjson.com/products';
    if (selectedCategory !== 'all') url = `https://dummyjson.com/products/category/${selectedCategory}`;
    axios.get(url)
      .then(res => {
        setProducts(res.data.products);
        setIsLoading(false);
        setCurrentPage(1); // 🔹 reset to first page on category change
      })
      .catch(() => {
        setError('Failed to fetch products');
        setIsLoading(false);
      });
  }, [selectedCategory]);

  // Sort products
  const sortedProducts = [...products];
  if (sortOption === 'price-asc') sortedProducts.sort((a, b) => a.price - b.price);
  else if (sortOption === 'price-desc') sortedProducts.sort((a, b) => b.price - a.price);
  else if (sortOption === 'title-asc') sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  else if (sortOption === 'title-desc') sortedProducts.sort((a, b) => b.title.localeCompare(a.title));

  // 🔹 Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // View details
  const viewDetails = (productId) => {
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then(res => setSelectedProduct(res.data))
      .catch(() => alert('Failed to fetch product details'));
  };

  // Stagger variants for product grid
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="container">
      <motion.h1
        className="my-4 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        Product Showcase Explorer
      </motion.h1>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <SortMenu
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && (
        <>
          <motion.div className="row" variants={containerVariants} initial="hidden" animate="visible">
            {currentProducts.map(product => (
              <div key={product.id} className="col-md-4 mb-4">
                <ProductCard product={product} viewDetails={viewDetails} />
              </div>
            ))}
          </motion.div>

          {/* 🔹 Pagination controls */}
          <div className="d-flex justify-content-center my-4">
            <button
              className="btn btn-outline-primary mx-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Prev
            </button>
            <span className="align-self-center">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-outline-primary mx-2"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedProduct && (
        <ProductDetail product={selectedProduct} closeDetail={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}

export default App;
