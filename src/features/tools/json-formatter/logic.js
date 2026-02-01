/**
 * JSON Formatter & Validator - Business Logic
 * 
 * This file contains all the business logic for JSON operations.
 * Separated from UI for testability and reusability.
 */

/**
 * Format JSON with indentation
 * @param {string} jsonString - JSON string to format
 * @param {number} indent - Number of spaces for indentation (default: 2)
 * @returns {Object} { success: boolean, result?: string, error?: string }
 */
export const formatJSON = (jsonString, indent = 2) => {
  try {
    const parsed = JSON.parse(jsonString);
    const formatted = JSON.stringify(parsed, null, indent);
    return { success: true, result: formatted };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

/**
 * Minify JSON to single line
 * @param {string} jsonString - JSON string to minify
 * @returns {Object} { success: boolean, result?: string, error?: string }
 */
export const minifyJSON = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    const minified = JSON.stringify(parsed);
    return { success: true, result: minified };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

/**
 * Validate JSON syntax
 * @param {string} jsonString - JSON string to validate
 * @returns {Object} { success: boolean, valid: boolean, error?: string }
 */
export const validateJSON = (jsonString) => {
  try {
    JSON.parse(jsonString);
    return { success: true, valid: true };
  } catch (err) {
    return { success: true, valid: false, error: err.message };
  }
};

/**
 * Generate sample JSON for demo purposes
 * @returns {string} Sample JSON string
 */
export const generateSampleJSON = () => {
  const sample = {
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com",
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "country": "USA"
    },
    "hobbies": ["reading", "coding", "travel"],
    "active": true,
    "balance": 1250.50
  };
  return JSON.stringify(sample);
};

/**
 * Count JSON statistics
 * @param {string} jsonString - JSON string to analyze
 * @returns {Object} Statistics about the JSON
 */
export const getJSONStats = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    
    const countNodes = (obj) => {
      let count = 1;
      if (typeof obj === 'object' && obj !== null) {
        Object.values(obj).forEach(value => {
          count += countNodes(value);
        });
      }
      return count;
    };
    
    return {
      characters: jsonString.length,
      nodes: countNodes(parsed),
      depth: JSON.stringify(parsed).split('{').length - 1,
    };
  } catch (err) {
    return { error: err.message };
  }
};
