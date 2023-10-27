import React from 'react';

const WalletEmpty = () => {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold mb-4">Wallet is Empty</p>
      <p className="text-gray-500">You have no wallet history at the moment.</p>
    </div>
  );
}

export default WalletEmpty;