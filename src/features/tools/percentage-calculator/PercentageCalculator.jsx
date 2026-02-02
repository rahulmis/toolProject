/**
 * Percentage Calculator - UI Component
 * 
 * This component provides a user-friendly interface for various percentage calculations.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import {
  calculatePercentageOf,
  calculateWhatPercentage,
  calculatePercentageChange,
  addPercentage,
  subtractPercentage,
  formatNumber,
  formatPercentage
} from './logic';
import metadata from './metadata';

const PercentageCalculator = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState('percentOf');
  
  // Tab 1: What is X% of Y?
  const [percentOf_percent, setPercentOf_percent] = useState('');
  const [percentOf_value, setPercentOf_value] = useState('');
  
  // Tab 2: X is what percentage of Y?
  const [whatPercent_part, setWhatPercent_part] = useState('');
  const [whatPercent_whole, setWhatPercent_whole] = useState('');
  
  // Tab 3: Percentage increase/decrease
  const [change_old, setChange_old] = useState('');
  const [change_new, setChange_new] = useState('');
  
  // Tab 4: Add percentage
  const [add_value, setAdd_value] = useState('');
  const [add_percent, setAdd_percent] = useState('');
  
  // Tab 5: Subtract percentage
  const [sub_value, setSub_value] = useState('');
  const [sub_percent, setSub_percent] = useState('');

  // Calculate results
  const percentOfResult = calculatePercentageOf(
    parseFloat(percentOf_percent) || 0,
    parseFloat(percentOf_value) || 0
  );
  
  const whatPercentResult = calculateWhatPercentage(
    parseFloat(whatPercent_part) || 0,
    parseFloat(whatPercent_whole) || 0
  );
  
  const changeResult = calculatePercentageChange(
    parseFloat(change_old) || 0,
    parseFloat(change_new) || 0
  );
  
  const addResult = addPercentage(
    parseFloat(add_value) || 0,
    parseFloat(add_percent) || 0
  );
  
  const subResult = subtractPercentage(
    parseFloat(sub_value) || 0,
    parseFloat(sub_percent) || 0
  );

  // Tab configuration
  const tabs = [
    { id: 'percentOf', label: 'X% of Y', icon: '🔢' },
    { id: 'whatPercent', label: 'What %?', icon: '❓' },
    { id: 'change', label: 'Increase/Decrease', icon: '📊' },
    { id: 'add', label: 'Add %', icon: '➕' },
    { id: 'subtract', label: 'Subtract %', icon: '➖' },
  ];

  // Load example for current tab
  const loadExample = () => {
    switch (activeTab) {
      case 'percentOf':
        setPercentOf_percent('20');
        setPercentOf_value('150');
        break;
      case 'whatPercent':
        setWhatPercent_part('30');
        setWhatPercent_whole('150');
        break;
      case 'change':
        setChange_old('50');
        setChange_new('75');
        break;
      case 'add':
        setAdd_value('100');
        setAdd_percent('25');
        break;
      case 'subtract':
        setSub_value('80');
        setSub_percent('25');
        break;
      default:
        break;
    }
  };

  // Clear current tab
  const clearCurrent = () => {
    switch (activeTab) {
      case 'percentOf':
        setPercentOf_percent('');
        setPercentOf_value('');
        break;
      case 'whatPercent':
        setWhatPercent_part('');
        setWhatPercent_whole('');
        break;
      case 'change':
        setChange_old('');
        setChange_new('');
        break;
      case 'add':
        setAdd_value('');
        setAdd_percent('');
        break;
      case 'subtract':
        setSub_value('');
        setSub_percent('');
        break;
      default:
        break;
    }
  };

  return (
    <ToolLayout
      toolId="percentage-calculator"
      title="Percentage Calculator"
      description="Calculate percentages, increases, decreases, and more. Simple and fast percentage calculations for everyday use."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-6">
        {/* Tabs */}
        <div>
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={loadExample}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              📝 Load Example
            </button>
            <button
              onClick={clearCurrent}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* Tab 1: What is X% of Y? */}
        {activeTab === 'percentOf' && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                What is X% of Y?
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Calculate what percentage of a number equals. For example: "What is 20% of 150?"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Percentage (%)
                </label>
                <input
                  type="number"
                  value={percentOf_percent}
                  onChange={(e) => setPercentOf_percent(e.target.value)}
                  placeholder="e.g., 20"
                  className="input-field text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Of Value
                </label>
                <input
                  type="number"
                  value={percentOf_value}
                  onChange={(e) => setPercentOf_value(e.target.value)}
                  placeholder="e.g., 150"
                  className="input-field text-lg"
                />
              </div>
            </div>

            {(percentOf_percent || percentOf_value) && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-700 rounded-lg p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result:</div>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {formatNumber(percentOfResult)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  {percentOf_percent}% of {percentOf_value} = <strong>{formatNumber(percentOfResult)}</strong>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: X is what percentage of Y? */}
        {activeTab === 'whatPercent' && (
          <div className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                X is what percentage of Y?
              </h3>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                Find what percentage one number represents of another. For example: "30 is what percent of 150?"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Part (X)
                </label>
                <input
                  type="number"
                  value={whatPercent_part}
                  onChange={(e) => setWhatPercent_part(e.target.value)}
                  placeholder="e.g., 30"
                  className="input-field text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Whole (Y)
                </label>
                <input
                  type="number"
                  value={whatPercent_whole}
                  onChange={(e) => setWhatPercent_whole(e.target.value)}
                  placeholder="e.g., 150"
                  className="input-field text-lg"
                />
              </div>
            </div>

            {(whatPercent_part || whatPercent_whole) && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-700 rounded-lg p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result:</div>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {formatPercentage(whatPercentResult)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  {whatPercent_part} is <strong>{formatPercentage(whatPercentResult)}</strong> of {whatPercent_whole}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Percentage Change */}
        {activeTab === 'change' && (
          <div className="space-y-4">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                Percentage Increase / Decrease
              </h3>
              <p className="text-sm text-orange-800 dark:text-orange-200">
                Calculate the percentage change between two values. Shows both increase and decrease.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Original Value
                </label>
                <input
                  type="number"
                  value={change_old}
                  onChange={(e) => setChange_old(e.target.value)}
                  placeholder="e.g., 50"
                  className="input-field text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Value
                </label>
                <input
                  type="number"
                  value={change_new}
                  onChange={(e) => setChange_new(e.target.value)}
                  placeholder="e.g., 75"
                  className="input-field text-lg"
                />
              </div>
            </div>

            {(change_old || change_new) && (
              <div className={`border-2 rounded-lg p-6 ${
                changeResult.isIncrease
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-700'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-700'
              }`}>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {changeResult.isIncrease ? 'Increase:' : 'Decrease:'}
                </div>
                <div className={`text-4xl font-bold ${
                  changeResult.isIncrease
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {changeResult.isIncrease ? '↗' : '↘'} {formatPercentage(changeResult.percentage)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-3 space-y-1">
                  <div>
                    Change: <strong>{formatNumber(changeResult.change)}</strong>
                  </div>
                  <div>
                    From {change_old} to {change_new} is a <strong>{formatPercentage(changeResult.percentage)}</strong> {changeResult.isIncrease ? 'increase' : 'decrease'}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Add Percentage */}
        {activeTab === 'add' && (
          <div className="space-y-4">
            <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
              <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">
                Add X% to Value
              </h3>
              <p className="text-sm text-teal-800 dark:text-teal-200">
                Increase a value by a percentage. For example: "Add 25% to 100" (useful for calculating markups or tips).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Base Value
                </label>
                <input
                  type="number"
                  value={add_value}
                  onChange={(e) => setAdd_value(e.target.value)}
                  placeholder="e.g., 100"
                  className="input-field text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Percentage to Add (%)
                </label>
                <input
                  type="number"
                  value={add_percent}
                  onChange={(e) => setAdd_percent(e.target.value)}
                  placeholder="e.g., 25"
                  className="input-field text-lg"
                />
              </div>
            </div>

            {(add_value || add_percent) && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-700 rounded-lg p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result:</div>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {formatNumber(addResult)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-3 space-y-1">
                  <div>
                    Amount added: <strong>{formatNumber(calculatePercentageOf(parseFloat(add_percent) || 0, parseFloat(add_value) || 0))}</strong>
                  </div>
                  <div>
                    {add_value} + {add_percent}% = <strong>{formatNumber(addResult)}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Subtract Percentage */}
        {activeTab === 'subtract' && (
          <div className="space-y-4">
            <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-4">
              <h3 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">
                Subtract X% from Value
              </h3>
              <p className="text-sm text-pink-800 dark:text-pink-200">
                Decrease a value by a percentage. For example: "Subtract 25% from 80" (useful for calculating discounts).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Base Value
                </label>
                <input
                  type="number"
                  value={sub_value}
                  onChange={(e) => setSub_value(e.target.value)}
                  placeholder="e.g., 80"
                  className="input-field text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Percentage to Subtract (%)
                </label>
                <input
                  type="number"
                  value={sub_percent}
                  onChange={(e) => setSub_percent(e.target.value)}
                  placeholder="e.g., 25"
                  className="input-field text-lg"
                />
              </div>
            </div>

            {(sub_value || sub_percent) && (
              <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 dark:border-green-700 rounded-lg p-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Result:</div>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {formatNumber(subResult)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-3 space-y-1">
                  <div>
                    Amount subtracted: <strong>{formatNumber(calculatePercentageOf(parseFloat(sub_percent) || 0, parseFloat(sub_value) || 0))}</strong>
                  </div>
                  <div>
                    {sub_value} - {sub_percent}% = <strong>{formatNumber(subResult)}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Common Use Cases */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            💡 Common Use Cases:
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>• <strong>Shopping Discounts:</strong> Use "Subtract %" to find sale prices</li>
            <li>• <strong>Tips & Gratuity:</strong> Use "Add %" to calculate tips on restaurant bills</li>
            <li>• <strong>Sales Tax:</strong> Use "Add %" to calculate total with tax</li>
            <li>• <strong>Grade Scores:</strong> Use "What %?" to find your percentage score</li>
            <li>• <strong>Price Increases:</strong> Use "Increase/Decrease" to track price changes</li>
            <li>• <strong>Business Metrics:</strong> Calculate growth rates and KPI changes</li>
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            📚 Quick Tips:
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Results update instantly as you type</li>
            <li>• Use "Load Example" to see how each calculator works</li>
            <li>• All calculations are done in your browser - no data is sent anywhere</li>
            <li>• You can use decimal numbers for more precise calculations</li>
          </ul>
        </div>
      </div>

      {/* SEO CONTENT */}
      <section className="mt-20 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          How to Use the Percentage Calculator
        </h2>

        <p className="mb-4">
          This free online percentage calculator helps you solve the most common percentage problems quickly and accurately.
          Whether you're calculating discounts while shopping, figuring out tips at restaurants, analyzing business metrics,
          or solving math homework, this tool makes it easy.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Common Percentage Calculations
        </h3>

        <div className="space-y-4 mb-6">
          <div>
            <strong>What is X% of Y?</strong>
            <p>Perfect for calculating discounts, tips, and portions. Example: What is 20% of $150? Answer: $30</p>
          </div>
          
          <div>
            <strong>X is what percentage of Y?</strong>
            <p>Find what percentage one number represents of another. Example: 30 is what percent of 150? Answer: 20%</p>
          </div>
          
          <div>
            <strong>Percentage Increase/Decrease</strong>
            <p>Track changes between two values. Example: From 50 to 75 is a 50% increase.</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">
          Real-World Applications
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li><strong>Shopping:</strong> Calculate sale prices and discounts</li>
          <li><strong>Dining:</strong> Figure out tips and split bills</li>
          <li><strong>Finance:</strong> Track investment returns and interest rates</li>
          <li><strong>Business:</strong> Analyze growth rates and profit margins</li>
          <li><strong>Education:</strong> Convert test scores to percentages</li>
          <li><strong>Health:</strong> Track progress in fitness and nutrition goals</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          Why Use This Calculator?
        </h3>

        <p>
          This percentage calculator provides instant, accurate results for all common percentage calculations.
          It's completely free, works offline, and doesn't store any of your data. Perfect for students, professionals,
          shoppers, or anyone who needs quick percentage calculations.
        </p>
      </section>
    </ToolLayout>
  );
};

export default PercentageCalculator;
