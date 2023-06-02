'use client'
import { useState } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [buyOrder, setBuyOrder] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [amount, setAmount] = useState('');
  const [returnUrl, setReturnUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      buy_order: buyOrder,
      session_id: sessionId,
      amount,
      return_url: returnUrl
    };
    try {
      const response = await axios.post('http://localhost:3000/transaction', data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Buy Order:</label>
        <input type="text" value={buyOrder} onChange={(e) => setBuyOrder(e.target.value)} required />
      </div>
      <div>
        <label>Session ID:</label>
        <input type="text" value={sessionId} onChange={(e) => setSessionId(e.target.value)} required />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div>
        <label>Return URL:</label>
        <input type="text" value={returnUrl} onChange={(e) => setReturnUrl(e.target.value)} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Checkout;
