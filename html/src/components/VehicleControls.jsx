import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fetchNui } from '../utils/misc';

const VehicleControls = () => {
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState(0);

  // Common vehicle colors using GTA V's standard color indices
  // These indices map to the game's built-in color palette
  // Reference: https://wiki.rage.mp/index.php?title=Vehicle_Colors
  const colors = [
    { name: 'Black', value: 0 },
    { name: 'White', value: 111 },
    { name: 'Red', value: 27 },
    { name: 'Blue', value: 64 },
    { name: 'Yellow', value: 89 },
    { name: 'Green', value: 53 },
    { name: 'Orange', value: 38 },
    { name: 'Purple', value: 145 },
    { name: 'Silver', value: 4 },
    { name: 'Grey', value: 5 },
    { name: 'Dark Blue', value: 63 },
    { name: 'Dark Green', value: 51 },
  ];

  const handleColorSelect = (colorValue) => {
    setSelectedPrimaryColor(colorValue);
    fetchNui('setVehicleColor', { colorIndex: colorValue, colorType: 'primary' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto"
    >
      <div className="glass-dark rounded-2xl p-4">
        {/* Color Picker - Always Visible */}
        <div className="w-80">
          <div className="flex items-center justify-center mb-3">
            <label className="text-white text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Vehicle Color
            </label>
          </div>
          
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorSelect(color.value)}
                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                  selectedPrimaryColor === color.value
                    ? 'border-primary-400 scale-110'
                    : 'border-gray-600 hover:border-gray-400'
                }`}
                style={{
                  backgroundColor: getColorHex(color.value)
                }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to convert GTA V color index to hex for preview
// This mapping provides approximate hex colors for the UI display
// Actual in-game colors are rendered by the game engine using the color indices
const getColorHex = (colorIndex) => {
  const colorMap = {
    0: '#0d1116',    // Black (Metallic Black)
    111: '#f7f7f7',  // White (Frost White)
    27: '#c00e1a',   // Red (Torino Red)
    64: '#0d4585',   // Blue (Diamond Blue)
    89: '#ffb900',   // Yellow (Race Yellow)
    53: '#155c2d',   // Green (Gasoline Green)
    38: '#f78616',   // Orange (Sunrise Orange)
    145: '#7b1fa2',  // Purple (Midnight Purple)
    4: '#c2c4c6',    // Silver (Silver)
    5: '#979a97',    // Grey (Steel Grey)
    63: '#003e7e',   // Dark Blue (Dark Blue)
    51: '#013d20',   // Dark Green (Dark Green)
  };
  return colorMap[colorIndex] || '#000000';
};

export default VehicleControls;
