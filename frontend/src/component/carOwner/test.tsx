import React, { useState, useEffect } from 'react';

interface BrandItem {
  name: string;
  _id: string;
}

const Test = () => {
  const [brand, setBrand] = useState<BrandItem[]>([]);

  useEffect(() => {
    const dd = [{ name: 'kk', _id: '12d' }, { name: 'fjkd', _id: '21sd' }];
    setBrand(dd);
  }, []);

  // Render the brand data in your component
  const brandElements = brand.map((item) => (
    <div key={item._id}>
      <p>Name: {item.name}</p>
      <p>ID: {item._id}</p>
    </div>
  ));

  return (
    <div>
      <h1>Brand Data</h1>
      {brandElements}
    </div>
  );
};

export default Test;
