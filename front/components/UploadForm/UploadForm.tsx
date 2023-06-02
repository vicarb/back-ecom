'use client'
import React, { useState } from 'react';

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', selectedFile);

    const response = await fetch('http://127.0.0.1:3000/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('File uploaded successfully');
    } else {
      console.error('Error uploading file', response);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 shadow-sm mt-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Select a File</label>
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="block w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
