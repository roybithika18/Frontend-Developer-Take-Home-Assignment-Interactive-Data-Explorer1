import React from 'react';
import { motion } from 'framer-motion';

function ProductCard({ product, viewDetails }) {
  return (
    <motion.div
      className="card h-100 product-card"
      onClick={() => viewDetails(product.id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 16px rgba(0,0,0,0.2)" }}
    >
      <img src={product.thumbnail} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">${product.price}</p>
      </div>
    </motion.div>
  );
}

export default ProductCard;
