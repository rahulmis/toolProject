/**
 * Unit Converter - UI Component
 * 
 * This component provides a user-friendly interface for unit conversions.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState, useEffect } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import {
  getCategories,
  getUnitsForCategory,
  convert,
  formatNumber
} from './logic';
import metadata from './metadata';

const UnitConverter = () => {
  // State management
  const [category, setCategory] = useState('length');
  const [fromValue, setFromValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [result, setResult] = useState('');

  const categories = getCategories();
  const units = getUnitsForCategory(category);
  const unitKeys = Object.keys(units);

  // Initialize default units when category changes
  useEffect(() => {
    const units = getUnitsForCategory(category);
    const keys = Object.keys(units);
    
    if (keys.length >= 2) {
      setFromUnit(keys[0]);
      setToUnit(keys[1]);
    }
    
    // Reset value when changing category
    setFromValue('1');
  }, [category]);

  // Perform conversion whenever inputs change
  useEffect(() => {
    if (fromValue && !isNaN(fromValue) && fromUnit && toUnit) {
      const converted = convert(category, parseFloat(fromValue), fromUnit, toUnit);
      setResult(formatNumber(converted));
    } else {
      setResult('0');
    }
  }, [fromValue, fromUnit, toUnit, category]);

  // Swap from and to units
  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  // Load example conversion
  const loadExample = () => {
    if (category === 'length') {
      setFromValue('100');
      setFromUnit('cm');
      setToUnit('inch');
    } else if (category === 'weight') {
      setFromValue('1');
      setFromUnit('kg');
      setToUnit('lb');
    } else if (category === 'temperature') {
      setFromValue('25');
      setFromUnit('celsius');
      setToUnit('fahrenheit');
    } else if (category === 'area') {
      setFromValue('1000');
      setFromUnit('sqft');
      setToUnit('sqm');
    } else if (category === 'volume') {
      setFromValue('2');
      setFromUnit('cup');
      setToUnit('ml');
    }
  };

  // Clear inputs
  const clearInputs = () => {
    setFromValue('');
    setResult('0');
  };

  return (
    <ToolLayout
      toolId="unit-converter"
      title="Unit Converter"
      description="Convert between different units of length, weight, temperature, area, and volume instantly."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-6">
        {/* Category Tabs */}
        <div>
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                  category === cat.id
                    ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={loadExample}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              📝 Load Example
            </button>
            <button
              onClick={clearInputs}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Converter Interface */}
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              {categories.find(c => c.id === category)?.icon}{' '}
              {categories.find(c => c.id === category)?.name} Converter
            </h3>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Enter a value and select units to convert. Results update instantly.
            </p>
          </div>

          {/* From Section */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              From:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                value={fromValue}
                onChange={(e) => setFromValue(e.target.value)}
                placeholder="Enter value"
                className="input-field text-lg flex-1"
                step="any"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="input-field text-lg sm:w-48"
              >
                {unitKeys.map((key) => (
                  <option key={key} value={key}>
                    {units[key].name} ({units[key].symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSwap}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 font-medium"
              title="Swap units"
            >
              ⇄ Swap
            </button>
          </div>

          {/* To Section */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              To:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <div className="input-field text-lg bg-gray-50 dark:bg-gray-900 font-bold text-primary-600 dark:text-primary-400 cursor-default">
                  {result}
                </div>
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="input-field text-lg sm:w-48"
              >
                {unitKeys.map((key) => (
                  <option key={key} value={key}>
                    {units[key].name} ({units[key].symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Display */}
          {fromValue && result && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500 dark:border-green-700 rounded-lg p-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Conversion Result:
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {fromValue} {units[fromUnit]?.symbol} = {result} {units[toUnit]?.symbol}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {units[fromUnit]?.name} to {units[toUnit]?.name}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Common Conversions Reference */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
            📚 Common Conversions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {category === 'length' && (
              <>
                <div className="text-gray-700 dark:text-gray-300">• 1 inch = 2.54 cm</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 foot = 30.48 cm</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 yard = 0.91 m</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 mile = 1.61 km</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 meter = 3.28 feet</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 km = 0.62 miles</div>
              </>
            )}
            {category === 'weight' && (
              <>
                <div className="text-gray-700 dark:text-gray-300">• 1 pound = 453.59 g</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 kg = 2.20 lbs</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 ounce = 28.35 g</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 ton = 1000 kg</div>
                <div className="text-gray-700 dark:text-gray-300">• 100 g = 3.53 oz</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 lb = 16 oz</div>
              </>
            )}
            {category === 'temperature' && (
              <>
                <div className="text-gray-700 dark:text-gray-300">• 0°C = 32°F (freezing)</div>
                <div className="text-gray-700 dark:text-gray-300">• 100°C = 212°F (boiling)</div>
                <div className="text-gray-700 dark:text-gray-300">• 20°C = 68°F (room temp)</div>
                <div className="text-gray-700 dark:text-gray-300">• 37°C = 98.6°F (body temp)</div>
                <div className="text-gray-700 dark:text-gray-300">• 0 K = -273.15°C (absolute zero)</div>
                <div className="text-gray-700 dark:text-gray-300">• -40°C = -40°F (same value!)</div>
              </>
            )}
            {category === 'area' && (
              <>
                <div className="text-gray-700 dark:text-gray-300">• 1 sq ft = 0.093 m²</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 m² = 10.76 sq ft</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 acre = 4,047 m²</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 hectare = 10,000 m²</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 sq km = 247 acres</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 sq mile = 640 acres</div>
              </>
            )}
            {category === 'volume' && (
              <>
                <div className="text-gray-700 dark:text-gray-300">• 1 cup = 240 ml</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 gallon = 3.79 L</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 quart = 0.95 L</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 fl oz = 29.57 ml</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 liter = 4.23 cups</div>
                <div className="text-gray-700 dark:text-gray-300">• 1 tablespoon ≈ 15 ml</div>
              </>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
            💡 Quick Tips
          </h3>
          <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
            <li>• Click the <strong>Swap</strong> button to quickly reverse the conversion</li>
            <li>• Results update automatically as you type</li>
            <li>• Use the category tabs to switch between different types of conversions</li>
            <li>• Very large or small numbers are shown in exponential notation (e.g., 1.23e+6)</li>
            <li>• All conversions are performed locally in your browser - no data is sent to servers</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  );
};

export default UnitConverter;
