import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ProductDetail({ product, closeDetail }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="modal show d-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="modal-dialog modal-lg">
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header">
                <h5 className="modal-title">{product.title}</h5>
                <button type="button" className="btn-close" onClick={closeDetail}></button>
              </div>
              <div className="modal-body">
                <img src={product.thumbnail} className="img-fluid mb-3" alt={product.title} />
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Rating:</strong> {product.rating}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p>{product.description}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ProductDetail;
