/**
 * Unit Converter - Business Logic
 * 
 * This file contains all unit conversion logic using pure functions.
 * All conversions are performed in the browser with no external dependencies.
 */

// ==================== LENGTH CONVERSIONS ====================

const LENGTH_UNITS = {
  mm: { name: 'Millimeter', symbol: 'mm', toMeters: 0.001 },
  cm: { name: 'Centimeter', symbol: 'cm', toMeters: 0.01 },
  m: { name: 'Meter', symbol: 'm', toMeters: 1 },
  km: { name: 'Kilometer', symbol: 'km', toMeters: 1000 },
  inch: { name: 'Inch', symbol: 'in', toMeters: 0.0254 },
  feet: { name: 'Feet', symbol: 'ft', toMeters: 0.3048 },
  yard: { name: 'Yard', symbol: 'yd', toMeters: 0.9144 },
  mile: { name: 'Mile', symbol: 'mi', toMeters: 1609.344 },
};

export const getLengthUnits = () => LENGTH_UNITS;

/**
 * Convert length from one unit to another
 * @param {number} value - The value to convert
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted value
 */
export const convertLength = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return 0;
  if (fromUnit === toUnit) return parseFloat(value);
  
  const from = LENGTH_UNITS[fromUnit];
  const to = LENGTH_UNITS[toUnit];
  
  if (!from || !to) return 0;
  
  // Convert to meters first, then to target unit
  const meters = parseFloat(value) * from.toMeters;
  return meters / to.toMeters;
};

// ==================== WEIGHT CONVERSIONS ====================

const WEIGHT_UNITS = {
  mg: { name: 'Milligram', symbol: 'mg', toGrams: 0.001 },
  g: { name: 'Gram', symbol: 'g', toGrams: 1 },
  kg: { name: 'Kilogram', symbol: 'kg', toGrams: 1000 },
  lb: { name: 'Pound', symbol: 'lb', toGrams: 453.59237 },
  oz: { name: 'Ounce', symbol: 'oz', toGrams: 28.349523125 },
  ton: { name: 'Metric Ton', symbol: 't', toGrams: 1000000 },
};

export const getWeightUnits = () => WEIGHT_UNITS;

/**
 * Convert weight from one unit to another
 * @param {number} value - The value to convert
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted value
 */
export const convertWeight = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return 0;
  if (fromUnit === toUnit) return parseFloat(value);
  
  const from = WEIGHT_UNITS[fromUnit];
  const to = WEIGHT_UNITS[toUnit];
  
  if (!from || !to) return 0;
  
  // Convert to grams first, then to target unit
  const grams = parseFloat(value) * from.toGrams;
  return grams / to.toGrams;
};

// ==================== TEMPERATURE CONVERSIONS ====================

const TEMPERATURE_UNITS = {
  celsius: { name: 'Celsius', symbol: '°C' },
  fahrenheit: { name: 'Fahrenheit', symbol: '°F' },
  kelvin: { name: 'Kelvin', symbol: 'K' },
};

export const getTemperatureUnits = () => TEMPERATURE_UNITS;

/**
 * Convert temperature from one unit to another
 * @param {number} value - The value to convert
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted value
 */
export const convertTemperature = (value, fromUnit, toUnit) => {
  if (value === '' || value === null || value === undefined || isNaN(value)) return 0;
  if (fromUnit === toUnit) return parseFloat(value);
  
  const val = parseFloat(value);
  
  // Convert to Celsius first
  let celsius;
  if (fromUnit === 'celsius') {
    celsius = val;
  } else if (fromUnit === 'fahrenheit') {
    celsius = (val - 32) * 5 / 9;
  } else if (fromUnit === 'kelvin') {
    celsius = val - 273.15;
  } else {
    return 0;
  }
  
  // Convert from Celsius to target unit
  if (toUnit === 'celsius') {
    return celsius;
  } else if (toUnit === 'fahrenheit') {
    return celsius * 9 / 5 + 32;
  } else if (toUnit === 'kelvin') {
    return celsius + 273.15;
  }
  
  return 0;
};

// ==================== AREA CONVERSIONS ====================

const AREA_UNITS = {
  sqmm: { name: 'Square Millimeter', symbol: 'mm²', toSqMeters: 0.000001 },
  sqcm: { name: 'Square Centimeter', symbol: 'cm²', toSqMeters: 0.0001 },
  sqm: { name: 'Square Meter', symbol: 'm²', toSqMeters: 1 },
  sqkm: { name: 'Square Kilometer', symbol: 'km²', toSqMeters: 1000000 },
  sqin: { name: 'Square Inch', symbol: 'in²', toSqMeters: 0.00064516 },
  sqft: { name: 'Square Feet', symbol: 'ft²', toSqMeters: 0.09290304 },
  sqyd: { name: 'Square Yard', symbol: 'yd²', toSqMeters: 0.83612736 },
  acre: { name: 'Acre', symbol: 'ac', toSqMeters: 4046.8564224 },
  hectare: { name: 'Hectare', symbol: 'ha', toSqMeters: 10000 },
};

export const getAreaUnits = () => AREA_UNITS;

/**
 * Convert area from one unit to another
 * @param {number} value - The value to convert
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted value
 */
export const convertArea = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return 0;
  if (fromUnit === toUnit) return parseFloat(value);
  
  const from = AREA_UNITS[fromUnit];
  const to = AREA_UNITS[toUnit];
  
  if (!from || !to) return 0;
  
  // Convert to square meters first, then to target unit
  const sqMeters = parseFloat(value) * from.toSqMeters;
  return sqMeters / to.toSqMeters;
};

// ==================== VOLUME CONVERSIONS ====================

const VOLUME_UNITS = {
  ml: { name: 'Milliliter', symbol: 'ml', toLiters: 0.001 },
  l: { name: 'Liter', symbol: 'L', toLiters: 1 },
  cubicm: { name: 'Cubic Meter', symbol: 'm³', toLiters: 1000 },
  gallon: { name: 'Gallon (US)', symbol: 'gal', toLiters: 3.785411784 },
  quart: { name: 'Quart (US)', symbol: 'qt', toLiters: 0.946352946 },
  pint: { name: 'Pint (US)', symbol: 'pt', toLiters: 0.473176473 },
  cup: { name: 'Cup (US)', symbol: 'cup', toLiters: 0.2365882365 },
  floz: { name: 'Fluid Ounce (US)', symbol: 'fl oz', toLiters: 0.0295735296 },
};

export const getVolumeUnits = () => VOLUME_UNITS;

/**
 * Convert volume from one unit to another
 * @param {number} value - The value to convert
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted value
 */
export const convertVolume = (value, fromUnit, toUnit) => {
  if (!value || isNaN(value)) return 0;
  if (fromUnit === toUnit) return parseFloat(value);
  
  const from = VOLUME_UNITS[fromUnit];
  const to = VOLUME_UNITS[toUnit];
  
  if (!from || !to) return 0;
  
  // Convert to liters first, then to target unit
  const liters = parseFloat(value) * from.toLiters;
  return liters / to.toLiters;
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Format a number to a reasonable precision
 * @param {number} value - The value to format
 * @param {number} maxDecimals - Maximum decimal places
 * @returns {string} Formatted number
 */
export const formatNumber = (value, maxDecimals = 8) => {
  if (value === 0) return '0';
  if (!value || isNaN(value)) return '0';
  
  // For very small or very large numbers, use exponential notation
  const absValue = Math.abs(value);
  if (absValue < 0.000001 || absValue > 1000000000) {
    return value.toExponential(6);
  }
  
  // Remove trailing zeros
  let formatted = value.toFixed(maxDecimals);
  formatted = formatted.replace(/\.?0+$/, '');
  
  return formatted;
};

/**
 * Get all conversion categories
 * @returns {Array} List of categories
 */
export const getCategories = () => [
  { id: 'length', name: 'Length', icon: '📏' },
  { id: 'weight', name: 'Weight', icon: '⚖️' },
  { id: 'temperature', name: 'Temperature', icon: '🌡️' },
  { id: 'area', name: 'Area', icon: '📐' },
  { id: 'volume', name: 'Volume', icon: '🧪' },
];

/**
 * Get units for a specific category
 * @param {string} category - The category
 * @returns {Object} Units object
 */
export const getUnitsForCategory = (category) => {
  switch (category) {
    case 'length':
      return getLengthUnits();
    case 'weight':
      return getWeightUnits();
    case 'temperature':
      return getTemperatureUnits();
    case 'area':
      return getAreaUnits();
    case 'volume':
      return getVolumeUnits();
    default:
      return {};
  }
};

/**
 * Perform conversion based on category
 * @param {string} category - The category
 * @param {number} value - The value to convert
 * @param {string} fromUnit - Source unit
 * @param {string} toUnit - Target unit
 * @returns {number} Converted value
 */
export const convert = (category, value, fromUnit, toUnit) => {
  switch (category) {
    case 'length':
      return convertLength(value, fromUnit, toUnit);
    case 'weight':
      return convertWeight(value, fromUnit, toUnit);
    case 'temperature':
      return convertTemperature(value, fromUnit, toUnit);
    case 'area':
      return convertArea(value, fromUnit, toUnit);
    case 'volume':
      return convertVolume(value, fromUnit, toUnit);
    default:
      return 0;
  }
};
