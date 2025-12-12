import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../utils/misc';

const VehicleGrid = ({ vehicles, onSelect, onClose, title = "Select Vehicle" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="glass-dark rounded-2xl p-8 max-w-6xl w-full mx-4 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle, index) => (
            <motion.button
              key={vehicle.model}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onSelect(vehicle)}
              className="glass rounded-xl p-5 hover:bg-white/20 transition-all duration-200 transform hover:scale-105 text-left group"
            >
              <div className="mb-3">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">
                  {vehicle.brand} {vehicle.name}
                </h3>
                <p className="text-2xl font-bold text-primary-400">
                  {formatCurrency(vehicle.price)}
                </p>
              </div>
              
              {vehicle.category && (
                <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 mb-2">
                  {vehicle.category}
                </span>
              )}

              <div className="flex items-center justify-between text-sm text-gray-400 mt-3">
                <span>Model: {vehicle.model}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleGrid;
