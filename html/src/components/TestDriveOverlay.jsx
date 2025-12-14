import React from 'react';
import { motion } from 'framer-motion';

const TestDriveOverlay = ({ timeRemaining, onReturn }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="pointer-events-auto w-fit"
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white font-semibold text-sm drop-shadow-lg">Test Drive</span>
            <span className="text-lg font-bold text-primary-400 ml-2 drop-shadow-lg">{timeRemaining}</span>
          </div>
          
          <button
            onClick={onReturn}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 text-sm shadow-lg"
          >
            Stop Drive [E]
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default TestDriveOverlay;
