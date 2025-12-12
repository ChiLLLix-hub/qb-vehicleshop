import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../utils/misc';

const VehicleCard = ({ vehicle, onTestDrive, onBuy, onFinance, onSwap }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-dark rounded-2xl p-6 w-full max-w-md mx-auto"
    >
      {/* Vehicle Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">
          {vehicle.brand} {vehicle.name}
        </h2>
        <p className="text-4xl font-bold text-primary-400">
          {formatCurrency(vehicle.price)}
        </p>
      </div>

      {/* Vehicle Stats */}
      {vehicle.stats && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          {vehicle.stats.speed && (
            <div className="glass rounded-lg p-3">
              <p className="text-gray-400 text-sm">Speed</p>
              <p className="text-white font-semibold">{vehicle.stats.speed}</p>
            </div>
          )}
          {vehicle.stats.acceleration && (
            <div className="glass rounded-lg p-3">
              <p className="text-gray-400 text-sm">Acceleration</p>
              <p className="text-white font-semibold">{vehicle.stats.acceleration}</p>
            </div>
          )}
          {vehicle.stats.braking && (
            <div className="glass rounded-lg p-3">
              <p className="text-gray-400 text-sm">Braking</p>
              <p className="text-white font-semibold">{vehicle.stats.braking}</p>
            </div>
          )}
          {vehicle.stats.handling && (
            <div className="glass rounded-lg p-3">
              <p className="text-gray-400 text-sm">Handling</p>
              <p className="text-white font-semibold">{vehicle.stats.handling}</p>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onTestDrive}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Test Drive
        </button>

        <button
          onClick={onBuy}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Buy Now
        </button>

        <button
          onClick={onFinance}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Finance
        </button>

        <button
          onClick={onSwap}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Swap Vehicle
        </button>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
