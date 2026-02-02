/**
 * Percentage Calculator - Business Logic
 * 
 * This file contains all the calculation logic for percentage operations.
 * All functions are pure and handle edge cases gracefully.
 */

/**
 * Calculate what is X% of Y
 * @param {number} percentage - The percentage (X)
 * @param {number} value - The value (Y)
 * @returns {number} The result
 */
export const calculatePercentageOf = (percentage, value) => {
  if (isNaN(percentage) || isNaN(value)) return 0;
  return (percentage / 100) * value;
};

/**
 * Calculate X is what percentage of Y
 * @param {number} part - The part value (X)
 * @param {number} whole - The whole value (Y)
 * @returns {number} The percentage
 */
export const calculateWhatPercentage = (part, whole) => {
  if (isNaN(part) || isNaN(whole) || whole === 0) return 0;
  return (part / whole) * 100;
};

/**
 * Calculate percentage increase from X to Y
 * @param {number} oldValue - The original value (X)
 * @param {number} newValue - The new value (Y)
 * @returns {Object} { increase: number, percentage: number }
 */
export const calculatePercentageIncrease = (oldValue, newValue) => {
  if (isNaN(oldValue) || isNaN(newValue) || oldValue === 0) {
    return { increase: 0, percentage: 0 };
  }
  
  const increase = newValue - oldValue;
  const percentage = (increase / oldValue) * 100;
  
  return { increase, percentage };
};

/**
 * Calculate percentage decrease from X to Y
 * @param {number} oldValue - The original value (X)
 * @param {number} newValue - The new value (Y)
 * @returns {Object} { decrease: number, percentage: number }
 */
export const calculatePercentageDecrease = (oldValue, newValue) => {
  if (isNaN(oldValue) || isNaN(newValue) || oldValue === 0) {
    return { decrease: 0, percentage: 0 };
  }
  
  const decrease = oldValue - newValue;
  const percentage = (decrease / oldValue) * 100;
  
  return { decrease, percentage };
};

/**
 * Calculate percentage change (increase or decrease)
 * @param {number} oldValue - The original value
 * @param {number} newValue - The new value
 * @returns {Object} { change: number, percentage: number, isIncrease: boolean }
 */
export const calculatePercentageChange = (oldValue, newValue) => {
  if (isNaN(oldValue) || isNaN(newValue) || oldValue === 0) {
    return { change: 0, percentage: 0, isIncrease: true };
  }
  
  const change = newValue - oldValue;
  const percentage = (change / oldValue) * 100;
  const isIncrease = change >= 0;
  
  return { change: Math.abs(change), percentage: Math.abs(percentage), isIncrease };
};

/**
 * Add percentage to a value
 * @param {number} value - The base value
 * @param {number} percentage - The percentage to add
 * @returns {number} The result
 */
export const addPercentage = (value, percentage) => {
  if (isNaN(value) || isNaN(percentage)) return 0;
  return value + (value * percentage / 100);
};

/**
 * Subtract percentage from a value
 * @param {number} value - The base value
 * @param {number} percentage - The percentage to subtract
 * @returns {number} The result
 */
export const subtractPercentage = (value, percentage) => {
  if (isNaN(value) || isNaN(percentage)) return 0;
  return value - (value * percentage / 100);
};

/**
 * Format number with commas and decimal places
 * @param {number} num - The number to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted number
 */
export const formatNumber = (num, decimals = 2) => {
  if (isNaN(num)) return '0';
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

/**
 * Format percentage with symbol
 * @param {number} percentage - The percentage value
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (percentage, decimals = 2) => {
  if (isNaN(percentage)) return '0%';
  return `${formatNumber(percentage, decimals)}%`;
};
