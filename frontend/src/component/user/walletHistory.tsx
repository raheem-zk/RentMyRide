import React from 'react';

const WalletHistory = () => {
  const transactions = [
    {
      amount: 100, // Positive for income, negative for expenses
      description: 'Salary Deposit',
      date: '2023-10-26',
    },
    {
      amount: -50,
      description: 'Grocery Shopping',
      date: '2023-10-25',
    },
    {
      amount: -20,
      description: 'Restaurant Dinner',
      date: '2023-10-24',
    },
    {
      amount: 75,
      description: 'Freelance Payment',
      date: '2023-10-23',
    },
  ];
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-semibold mb-4">Wallet History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span
                className={`${
                  transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                } mr-2`}
              >
                {transaction.amount > 0 ? '+' : '-'}
                {Math.abs(transaction.amount)}
              </span>
              <span>{transaction.description}</span>
            </div>
            <span className="text-gray-500">{transaction.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletHistory;
