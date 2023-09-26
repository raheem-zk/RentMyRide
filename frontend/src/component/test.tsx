import React, { useState } from 'react';

// Define a TypeScript interface for the data.

const Test: React.FC = () => {
  const [data, setData] = useState<String | number>(1);

  const handleClick = () => {
    setData('helo');
  };

  return (
    <div>
      <h1>Data:</h1>
      <p>{data}</p>
      <button onClick={handleClick}>Change Data</button>
    </div>
  );
};

export default Test;
