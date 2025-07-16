import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useStore } from '../store/useStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      <Link to={`/products/${product.id}`}>
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col space-y-1">
            {product.featured && (
              <span className="bg-accent-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                -{discountPercentage}%
              </span>
            )}
            {!product.inStock && (
              <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Out of Stock
              </span>
            )}
          </div>

          {/* Hover Actions */}
          <div className="absolute top-2 right-2 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 capitalize">
              {product.category.replace('-', ' ')}
            </span>
            <span className="text-sm text-gray-500">{product.brand}</span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center mb-2">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-primary-600">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${
              product.inStock
                ? 'bg-primary-600 text-white hover:bg-primary-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          </motion.button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
