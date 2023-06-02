'use client'
import axios from 'axios';
import { useState } from 'react';

export default function Cotizador() {
  const [originCountyCode, setOriginCountyCode] = useState('');
  const [destinationCountyCode, setDestinationCountyCode] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [productType, setProductType] = useState(3);
  const [contentType, setContentType] = useState(1);
  const [declaredWorth, setDeclaredWorth] = useState('');
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [rates, setRates] = useState([]);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:3000/cotizador/rates', {
        originCountyCode,
        destinationCountyCode,
        package: {
          weight,
          height,
          width,
          length,
        },
        productType,
        contentType,
        declaredWorth,
        deliveryTime,
      });

      setRates(response.data.data.courierServiceOptions);
      setError('');
    } catch (error) {
      setError('Failed to get courier rates.');
      setRates([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Origin County Code:</label>
          <input type="text" value={originCountyCode} onChange={(e) => setOriginCountyCode(e.target.value)} required />
        </div>
        <div>
          <label>Destination County Code:</label>
          <input type="text" value={destinationCountyCode} onChange={(e) => setDestinationCountyCode(e.target.value)} required />
        </div>
        <div>
          <label>Weight:</label>
          <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </div>
        <div>
          <label>Height:</label>
          <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} required />
        </div>
        <div>
          <label>Width:</label>
          <input type="text" value={width} onChange={(e) => setWidth(e.target.value)} required />
        </div>
        <div>
          <label>Length:</label>
          <input type="text" value={length} onChange={(e) => setLength(e.target.value)} required />
        </div>
        <div>
          <label>Product Type:</label>
          <select value={productType} onChange={(e) => setProductType(e.target.value)}>
            <option value={1}>Documento</option>
            <option value={3}>Encomienda</option>
          </select>
        </div>
        <div>
          <label>Content Type:</label>
          <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
            <option value={1}>Descripción 1</option>
            <option value={2}>Descripción 2</option>
          </select>
        </div>
        <div>
          <label>Declared Worth:</label>
          <input type="text" value={declaredWorth} onChange={(e) => setDeclaredWorth(e.target.value)} required />
        </div>
        <div>
          <label>Delivery Time:</label>
          <select value={deliveryTime} onChange={(e) => setDeliveryTime(e.target.value)}>
            <option value={0}>Todos</option>
            <option value={1}>Prioritarios</option>
            <option value={2}>No prioritarios</option>
            <option value={3}>De devolución</option>
          </select>
        </div>
        <button type="submit">Get Rates</button>
      </form>
      {error && <p>{error}</p>}
      {rates.length > 0 && (
        <ul>
          {rates.map((rate) => (
            <li key={rate.serviceTypeCode}>
              <div>Service Type Code: {rate.serviceTypeCode}</div>
              <div>Service Description: {rate.serviceDescription}</div>
              <div>Did Use Volumetric Weight: {rate.didUseVolumetricWeight ? 'Yes' : 'No'}</div>
              <div>Final Weight: {rate.finalWeight}</div>
              <div>Service Value: {rate.serviceValue}</div>
              <div>Conditions: {rate.conditions}</div>
              <div>Delivery Type: {rate.deliveryType}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
