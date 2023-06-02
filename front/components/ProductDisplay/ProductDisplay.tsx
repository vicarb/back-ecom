'use client'
// ProductDisplay.js

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ProductDisplay = ({ product, onDelete }) => {
    const { _id, title, description, price, mainImage } = product;

    const [editing, setEditing] = useState(false);
    const [descriptionText, setDescriptionText] = useState(description);

    const handleDescriptionClick = () => {
        setEditing(true);
    };

    const handleDescriptionChange = (e) => {
        setDescriptionText(e.target.value);
    };

    const handleDescriptionBlur = async () => {
        try {
            await axios.put(`https://composterasur.cl/products/${_id}`, {
                description: descriptionText
            });
            setEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-md mx-auto rounded overflow-hidden shadow-lg m-2">
            <img className="w-full h-64 object-cover" src={mainImage} alt="Main product" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                {editing ? (
                    <textarea
                        value={descriptionText}
                        onChange={handleDescriptionChange}
                        onBlur={handleDescriptionBlur}
                        autoFocus
                        className="w-full mt-3 px-4 py-2 border border-gray-300 rounded shadow-sm"
                    />
                ) : (
                    <p onClick={handleDescriptionClick} className="text-gray-700 text-base cursor-pointer">{descriptionText}</p>
                )}
                <p className="text-gray-900 text-xl">Price: ${price}</p>
                <button
                    onClick={() => onDelete(_id)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Delete
                </button>
                <button
  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
>
<Link href={`/product/${_id}`}> 
<span className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Details</span>
</Link>
</button>

            </div>
        </div>
    );
};

export default ProductDisplay;
