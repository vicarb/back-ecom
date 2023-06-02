'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const ProductDetailU = ({params}) => {
    
  const id  = params.id

  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    const response = await axios.get(`http://127.0.0.1:3000/products/${id}`)
    setProduct(response.data)
  }

  const addToCart = async () => {
    if (quantity < 1) {
      alert('Quantity must be at least 1');
      return;
    }

    // Replace 'userId' with the actual user ID
    const userId = id;
    await axios.post(`http://127.0.0.1:3000/cart`, {
      userId,
      productId: id,
      quantity
    });
    alert('Product added to cart');
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="mb-2">{product.description}</p>
      <p className="mb-2">${product.price}</p>
      <input 
        type="number" 
        min="1"
        value={quantity} 
        onChange={e => setQuantity(Number(e.target.value))} 
        className="mr-2" 
      />
      <button onClick={addToCart} className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Add to Cart
      </button>
    </div>
  )
}

export default ProductDetailU;
