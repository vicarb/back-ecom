'use client'
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AddressInput() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (input) {
        try {
          const { data } = await axios.get(`http://127.0.0.1:3000/googlePlaces/autocomplete?input=${input}`);
          setSuggestions(data.predictions);
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.description);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your address"
        className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white shadow-md rounded-lg">
          {suggestions.map((suggestion) => (
            <li 
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="py-2 px-4 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
