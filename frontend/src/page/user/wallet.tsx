import React from 'react'
import WalletHistory from '../../component/user/walletHistory'

const Wallet = () => {
    const sampleTransactions = [
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
  return <WalletHistory />
}

export default Wallet;
