'use client'
import React, { useState } from 'react';
import axios from 'axios';

function CreateProduct() {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    mainImage: null,
    extraImages: [],
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProduct(prevProduct => ({ ...prevProduct, mainImage: e.target.files[0] }));
  };

  const handleExtraImagesChange = (e) => {
    setProduct(prevProduct => ({ ...prevProduct, extraImages: [...e.target.files] }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('mainImage', product.mainImage);
    console.log('extraImages', product.extraImages);

    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', String(product.price));

    if (product.mainImage) {
      formData.append('mainImage', product.mainImage);
    }
    if (product.extraImages) {
      for (const image of product.extraImages) {
        formData.append('extraImages', image);
      }
    }

    console.log("Sending the following data to the server:");
    console.log(formData);

    try {
      await axios.post('http://127.0.0.1:3000/products', formData);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
};

  
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" onChange={handleChange} />
      </label>
      <label>
        Description:
        <input type="text" name="description" onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="price" onChange={handleChange} />
      </label>
      <label>
        Main Image:
        <input type="file" onChange={handleImageChange} />
      </label>
      <label>
        Extra Images:
        <input type="file" multiple onChange={handleExtraImagesChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateProduct;
