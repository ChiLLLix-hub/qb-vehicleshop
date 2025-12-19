import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../utils/misc';

const VehicleCard = ({ vehicle, onTestDrive, onBuy, onFinance, onSwap }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="glass-dark rounded-2xl p-5 w-full max-w-xs"
    >
      {/* Vehicle Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">
          {vehicle.brand} {vehicle.name}
        </h2>
        <p className="text-3xl font-bold text-primary-400">
          {formatCurrency(vehicle.price)}
        </p>
      </div>

      {/* Vehicle Stats */}
      {vehicle.stats && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {vehicle.stats.speed && (
            <div className="glass rounded-lg p-2">
              <p className="text-gray-400 text-xs">Speed</p>
              <p className="text-white font-semibold text-sm">{vehicle.stats.speed}</p>
            </div>
          )}
          {vehicle.stats.acceleration && (
            <div className="glass rounded-lg p-2">
              <p className="text-gray-400 text-xs">Acceleration</p>
              <p className="text-white font-semibold text-sm">{vehicle.stats.acceleration}</p>
            </div>
          )}
          {vehicle.stats.braking && (
            <div className="glass rounded-lg p-2">
              <p className="text-gray-400 text-xs">Braking</p>
              <p className="text-white font-semibold text-sm">{vehicle.stats.braking}</p>
            </div>
          )}
          {vehicle.stats.handling && (
            <div className="glass rounded-lg p-2">
              <p className="text-gray-400 text-xs">Handling</p>
              <p className="text-white font-semibold text-sm">{vehicle.stats.handling}</p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={onSwap}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Swap Vehicle
        </button>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
