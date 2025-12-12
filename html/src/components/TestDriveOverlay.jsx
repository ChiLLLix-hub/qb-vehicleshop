import React from 'react';
import { motion } from 'framer-motion';

const TestDriveOverlay = ({ timeRemaining, onReturn }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-4 left-4 z-40"
    >
      <div className="glass-dark rounded-xl px-6 py-3 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white font-semibold text-sm">Test Drive</span>
          </div>
          
          <div className="border-l border-gray-600 pl-3">
            <span className="text-xl font-bold text-primary-400">{timeRemaining}</span>
            <span className="text-gray-400 ml-1 text-sm">left</span>
          </div>

          <button
            onClick={onReturn}
            className="ml-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-3 rounded-lg transition-all duration-200 text-sm"
          >
            End Drive
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TestDriveOverlay;
