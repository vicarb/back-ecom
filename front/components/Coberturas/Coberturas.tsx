'use client'
import axios from 'axios';
import { useState } from 'react';

export default function Coberturas() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/coberturas/streets', {
        params: {
          countyName: 'SANTIAGO CENTRO',
          streetName: 'DOCTOR ALLENDE PADIN'
        }
      });
      setResponse(response.data);
      console.log(response);
      
      setError(null);
    } catch (error) {
      setError('Failed to search streets.');
    }
  };

  return (
    <div>
      <button onClick={handleSearch} className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
        Search Streets
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {response && (
        <div className="mt-4">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
