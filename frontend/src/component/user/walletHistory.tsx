import React from "react";
import { GrClose } from "react-icons/gr";
import WalletEmpty from "./walletEmpty";

const WalletHistory = ({ handleClick, transactions }) => {
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
          <WalletEmpty />
        ) : (
          transactions.map((transaction, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2 border-b border-gray-300 pb-2"
            >
              <div className="flex items-center">
                <span
                  className={`${
                    transaction?.type === "credit"
                      ? "text-green-500"
                      : "text-red-500"
                  } mr-2 font-semibold`}
                >
                  {transaction?.type === "credit" ? "+" : "-"} ₹
                  {Math.abs(transaction?.amount)}
                </span>

                <span className="text-gray-700">
                  {transaction?.description}
                </span>
              </div>
              <span className="text-gray-500">
                {transaction?.date
                  ? new Date(transaction?.date).toLocaleDateString()
                  : ""}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default WalletHistory;
