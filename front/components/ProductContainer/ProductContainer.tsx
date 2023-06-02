'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ProductDisplay from '../ProductDisplay/ProductDisplay';
import ProductForm from '../ProductForm/ProductForm';

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormVisible, setFormVisible] = useState(false); // New state variable

  const fetchProducts = async () => {
    const response = await axios.get('http://127.0.0.1:3000/products');
    setProducts(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:3000/products/${id}`);
    setProducts(products.filter((product) => product._id !== id));
  };

  // Function to handle button click
  const handleButtonClick = () => {
    setFormVisible(!isFormVisible);
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
    <button onClick={handleButtonClick} className="px-4 py-2 bg-blue-500 text-white rounded">
    {isFormVisible ? 'Hide Form' : 'Add New Product'}
    </button>
    {isFormVisible && <ProductForm />}  {/* Form will be shown if isFormVisible is true */}
    <h2 className="text-3xl font-semibold text-center py-4">Available Products</h2>
      <div className="max-w-2xl mx-auto">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-0 justify-center items-center">
          {products.map((product, index) => (
            <ProductDisplay
              key={index}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
