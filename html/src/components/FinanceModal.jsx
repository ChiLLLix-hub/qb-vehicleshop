import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../utils/misc';

const FinanceModal = ({ vehicle, onSubmit, onClose, config }) => {
  const [downPayment, setDownPayment] = useState(config?.minimumDown || 10);
  const [paymentAmount, setPaymentAmount] = useState(12);

  const vehiclePrice = vehicle?.price || 0;
  const downPaymentAmount = (vehiclePrice * downPayment) / 100;
  const remainingAmount = vehiclePrice - downPaymentAmount;
  const monthlyPayment = remainingAmount / paymentAmount;

  const handleSubmit = () => {
    onSubmit({
      downPayment: downPaymentAmount,
      paymentAmount: paymentAmount,
      monthlyPayment: monthlyPayment,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="glass-dark rounded-2xl p-8 max-w-lg w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Finance Options</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Vehicle Info */}
        <div className="glass rounded-lg p-4 mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">
            {vehicle?.brand} {vehicle?.name}
          </h3>
          <p className="text-2xl font-bold text-primary-400">
            {formatCurrency(vehiclePrice)}
          </p>
        </div>

        {/* Down Payment Slider */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-white font-semibold">Down Payment</label>
            <span className="text-primary-400 font-bold">{downPayment}%</span>
          </div>
          <input
            type="range"
            min={config?.minimumDown || 10}
            max="100"
            value={downPayment}
            onChange={(e) => setDownPayment(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <p className="text-right text-gray-400 mt-1">
            {formatCurrency(downPaymentAmount)}
          </p>
        </div>

        {/* Payment Amount Slider */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-white font-semibold">Number of Payments</label>
            <span className="text-primary-400 font-bold">{paymentAmount}</span>
          </div>
          <input
            type="range"
            min="1"
            max={config?.maximumPayments || 24}
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
        </div>

        {/* Summary */}
        <div className="glass rounded-lg p-4 mb-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Down Payment:</span>
            <span className="text-white font-semibold">{formatCurrency(downPaymentAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Remaining:</span>
            <span className="text-white font-semibold">{formatCurrency(remainingAmount)}</span>
          </div>
          <div className="border-t border-gray-600 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-white font-semibold">Monthly Payment:</span>
              <span className="text-primary-400 font-bold text-lg">{formatCurrency(monthlyPayment)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Finance Vehicle
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FinanceModal;
