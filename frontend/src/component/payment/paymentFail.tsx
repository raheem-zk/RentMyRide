import React from 'react'

const PaymentFail = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-200">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Payment Failed</h2>
        <p>Sorry, your payment could not be processed.</p>
        <p>Please check your payment details and try again.</p>
        <p>If the problem persists, contact our support team for assistance.</p>
      </div>
    </div>
  )
}

export default PaymentFail
