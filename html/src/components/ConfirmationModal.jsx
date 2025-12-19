import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/misc';

const ConfirmationModal = ({ type, vehicle, downPayment, paymentAmount, onConfirm, onCancel }) => {
  const getTitle = () => {
    switch (type) {
      case 'buy':
        return 'Purchase Vehicle';
      case 'finance':
        return 'Finance Vehicle';
      default:
        return 'Confirm Action';
    }
  };

  const getMessage = () => {
    if (type === 'buy') {
      return `Are you sure you want to buy ${vehicle.brand} ${vehicle.name} for ${formatCurrency(vehicle.price)}?`;
    } else if (type === 'finance') {
      return `Are you sure you want to finance ${vehicle.brand} ${vehicle.name}?`;
    }
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-[100] bg-black/50 pointer-events-auto"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-dark rounded-2xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">{getTitle()}</h2>
          <p className="text-gray-300 text-sm">{getMessage()}</p>
        </div>

        {/* Finance Details */}
        {type === 'finance' && (
          <div className="mb-6 space-y-2">
            <div className="glass rounded-lg p-3 flex justify-between">
              <span className="text-gray-400 text-sm">Down Payment:</span>
              <span className="text-white font-semibold">{formatCurrency(downPayment)}</span>
            </div>
            <div className="glass rounded-lg p-3 flex justify-between">
              <span className="text-gray-400 text-sm">Monthly Payments:</span>
              <span className="text-white font-semibold">{paymentAmount}</span>
            </div>
          </div>
        )}

        {/* Vehicle Info */}
        <div className="mb-6 glass rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-xs">Vehicle</p>
              <p className="text-white font-bold text-lg">{vehicle.brand} {vehicle.name}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs">Price</p>
              <p className="text-primary-400 font-bold text-lg">{formatCurrency(vehicle.price)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmationModal;
