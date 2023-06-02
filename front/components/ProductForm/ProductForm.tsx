'use client'

import React, { useState } from "react";
import axios from "axios";

const ProductForm = () => {
  const [mainImage, setMainImage] = useState(null);
  const [extraImage, setExtraImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [extraImages, setExtraImages] = useState([]);
  const [alertVisible, setAlertVisible] = useState(false); // New state variable

  const addExtraImage = () => {
    setExtraImages([...extraImages, null]);  // Add new file input
  };

  const handleExtraImageChange = (index, file) => {
    const newExtraImages = [...extraImages];
    newExtraImages[index] = file;
    setExtraImages(newExtraImages);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('mainImage', mainImage);
    extraImages.forEach((image, index) => {
        formData.append('extraImages', image);
    });
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', Number(price));

  
    // log formData entries
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', '+ pair[1]); 
    }
  
    try {
      const response = await axios.post('https://composterasur.cl/products', formData);
      console.log('Product uploaded successfully');

      setAlertVisible(true); // Show the alert
      setTimeout(() => setAlertVisible(false), 3000); // Hide the alert after 3 seconds
      setMainImage(null);
        setTitle("");
        setDescription("");
        setPrice("");
        setExtraImages([]);

    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    }
    
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 shadow-sm mt-5">
    {alertVisible && (
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong className="font-bold">Success!</strong>
        <span className="block sm:inline"> Product created successfully.</span>
      </div>
    )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Product Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="block">Product Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="block">Product Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
          <label className="block">Main Image</label>
          <input
            type="file"
            onChange={(e) => setMainImage(e.target.files[0])}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
      <label className="block">Extra Images</label>
      {extraImages.map((extraImage, index) => (
        <input
          key={index}
          type="file"
          onChange={(e) => handleExtraImageChange(index, e.target.files[0])}
          className="block w-full p-2 border border-gray-300 rounded mt-1"
        />
      ))}
      <button type="button" onClick={addExtraImage}>Add+</button>
    </div>

        <div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
