import React from "react";
import { GrClose } from "react-icons/gr";
const WalletHistory = ({ handleClick }) => {
  const transactions = [
    {
      amount: 100, // Positive for income, negative for expenses
      description: "Salary Deposit",
      date: "2023-10-26",
    },
    {
      amount: -50,
      description: "Grocery Shopping",
      date: "2023-10-25",
    },
    {
      amount: -20,
      description: "Restaurant Dinner",
      date: "2023-10-24",
    },
    {
      amount: 75,
      description: "Freelance Payment",
      date: "2023-10-23",
    },
    {
      amount: 100, // Positive for income, negative for expenses
      description: "Salary Deposit",
      date: "2023-10-26",
    },
    {
      amount: -50,
      description: "Grocery Shopping",
      date: "2023-10-25",
    },
    {
      amount: -20,
      description: "Restaurant Dinner",
      date: "2023-10-24",
    },
    {
      amount: 75,
      description: "Freelance Payment",
      date: "2023-10-23",
    },
    {
      amount: 100, // Positive for income, negative for expenses
      description: "Salary Deposit",
      date: "2023-10-26",
    },
    {
      amount: -50,
      description: "Grocery Shopping",
      date: "2023-10-25",
    },
    {
      amount: -20,
      description: "Restaurant Dinner",
      date: "2023-10-24",
    },
    {
      amount: 75,
      description: "Freelance Payment",
      date: "2023-10-23",
    },
    {
      amount: 100, // Positive for income, negative for expenses
      description: "Salary Deposit",
      date: "2023-10-26",
    },
    {
      amount: -50,
      description: "Grocery Shopping",
      date: "2023-10-25",
    },
    {
      amount: -20,
      description: "Restaurant Dinner",
      date: "2023-10-24",
    },
    {
      amount: 75,
      description: "Freelance Payment",
      date: "2023-10-23",
    },
    {
      amount: 100, // Positive for income, negative for expenses
      description: "Salary Deposit",
      date: "2023-10-26",
    },
    {
      amount: -50,
      description: "Grocery Shopping",
      date: "2023-10-25",
    },
    {
      amount: -20,
      description: "Restaurant Dinner",
      date: "2023-10-24",
    },
    {
      amount: 75,
      description: "Freelance Payment",
      date: "2023-10-23",
    },
    {
      amount: 100, // Positive for income, negative for expenses
      description: "Salary Deposit",
      date: "2023-10-26",
    },
    {
      amount: -50,
      description: "Grocery Shopping",
      date: "2023-10-25",
    },
    {
      amount: -20,
      description: "Restaurant Dinner",
      date: "2023-10-24",
    },
    {
      amount: 75,
      description: "Freelance Payment",
      date: "2023-10-23",
    },
    {
      amount: 100, // Positive for income, negative for expenses
      description: "Salary Deposit",
      date: "2023-10-26",
    },
    {
      amount: -50,
      description: "Grocery Shopping",
      date: "2023-10-25",
    },
    {
      amount: -20,
      description: "Restaurant Dinner",
      date: "2023-10-24",
    },
    {
      amount: 75,
      description: "Freelance Payment",
      date: "2023-10-23",
    },
    {
      amount: 100, // Positive for income, negative for expenses
      description: "Salary Deposit",
      date: "2023-10-26",
    },
    {
      amount: -50,
      description: "Grocery Shopping",
      date: "2023-10-25",
    },
    {
      amount: -20,
      description: "Restaurant Dinner",
      date: "2023-10-24",
    },
    {
      amount: 75,
      description: "Freelance Payment",
      date: "2023-10-23",
    },
  ];
  return (
    <div className="bg-white w-full rounded-lg shadow-md p-4 mx-5">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">Wallet History</h2>
        <button
          onClick={handleClick}
          className="m-3 p-2 rounded-lg hover:bg-red-500 hover:text-white focus:outline-none"
        >
          <GrClose size={20} />
        </button>
      </div>
      <ul className="max-h-screen min-h-fit overflow-y-scroll">
        {transactions.length == 0 ? (
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">Wallet is Empty</p>
            <p className="text-gray-500">
              You have no wallet history at the moment.
            </p>
          </div>
        ) : (
          transactions.map((transaction, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2"
            >
              <div className="flex items-center">
                <span
                  className={`${
                    transaction.amount > 0 ? "text-green-500" : "text-red-500"
                  } mr-2 font-semibold`}
                >
                  {transaction.amount > 0 ? "+" : "-"} ₹
                  {Math.abs(transaction.amount)}
                </span>
                <span className="text-gray-700">{transaction.description}</span>
              </div>
              <span className="text-gray-500">{transaction.date}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WalletHistory;
