import React from 'react';
import { motion } from 'framer-motion';

const TestDriveOverlay = ({ timeRemaining, onReturn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="glass-dark rounded-2xl px-8 py-4 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white font-semibold">Test Drive</span>
          </div>
          
          <div className="border-l border-gray-600 pl-4">
            <span className="text-2xl font-bold text-primary-400">{timeRemaining}</span>
            <span className="text-gray-400 ml-2">remaining</span>
          </div>

          <button
            onClick={onReturn}
            className="ml-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            End Test Drive
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TestDriveOverlay;
