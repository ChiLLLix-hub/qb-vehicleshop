import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fetchNui } from '../utils/misc';

const VehicleControls = ({ enableRotation = true }) => {
  const [rotation, setRotation] = useState(0);
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState(0);
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Common vehicle colors (RGB values represented as single value for simplicity)
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

  const handleRotationChange = (e) => {
    const newRotation = parseFloat(e.target.value);
    setRotation(newRotation);
    fetchNui('rotateVehicle', { rotation: newRotation });
  };

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
      <div className="glass-dark rounded-2xl p-4 space-y-3">
        {/* Rotation Slider */}
        {enableRotation && (
          <div className="w-80">
            <div className="flex items-center justify-between mb-2">
              <label className="text-white text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Rotate Vehicle
              </label>
              <span className="text-gray-400 text-xs">{Math.round(rotation)}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={rotation}
              onChange={handleRotationChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
          </div>
        )}

        {/* Color Picker */}
        <div className="w-80">
          <div className="flex items-center justify-between mb-2">
            <label className="text-white text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Color
            </label>
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="text-xs text-primary-400 hover:text-primary-300"
            >
              {showColorPicker ? 'Hide' : 'Show'} Colors
            </button>
          </div>
          
          {showColorPicker && (
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
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to convert color index to hex (simplified)
const getColorHex = (colorIndex) => {
  const colorMap = {
    0: '#0d1116',    // Black
    111: '#f7f7f7',  // White
    27: '#c00e1a',   // Red
    64: '#0d4585',   // Blue
    89: '#ffb900',   // Yellow
    53: '#155c2d',   // Green
    38: '#f78616',   // Orange
    145: '#7b1fa2',  // Purple
    4: '#c2c4c6',    // Silver
    5: '#979a97',    // Grey
    63: '#003e7e',   // Dark Blue
    51: '#013d20',   // Dark Green
  };
  return colorMap[colorIndex] || '#000000';
};

export default VehicleControls;
