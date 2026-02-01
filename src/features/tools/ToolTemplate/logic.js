/**
 * TOOL TEMPLATE - Business Logic
 * 
 * This file contains all the business logic for your tool.
 * 
 * SEPARATION OF CONCERNS:
 * - UI components (ToolTemplate.jsx) handle rendering and user interactions
 * - Business logic (this file) handles data processing and operations
 * 
 * BENEFITS:
 * - Easy to unit test (pure functions)
 * - Reusable in other tools or contexts
 * - Can be replaced with API calls if needed
 * - Clear separation makes code maintainable
 * 
 * GUIDELINES:
 * - Write pure functions when possible (no side effects)
 * - Return objects with { success, result, error } pattern
 * - Add JSDoc comments for all exported functions
 * - Keep functions focused and single-purpose
 */

/**
 * Example: Process input data
 * 
 * @param {string} input - Input data to process
 * @returns {Object} { success: boolean, result?: any, error?: string }
 */
export const processData = (input) => {
  try {
    // Validate input
    if (!input || input.trim() === '') {
      return { success: false, error: 'Input is required' };
    }
    
    // Process the data (replace with your logic)
    const result = input.toUpperCase();
    
    return { success: true, result };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

/**
 * Example: Validate input
 * 
 * @param {string} input - Input to validate
 * @returns {Object} { valid: boolean, error?: string }
 */
export const validateInput = (input) => {
  if (!input) {
    return { valid: false, error: 'Input cannot be empty' };
  }
  
  if (input.length > 10000) {
    return { valid: false, error: 'Input too long (max 10,000 characters)' };
  }
  
  return { valid: true };
};

/**
 * Example: Generate sample data
 * 
 * @returns {string} Sample data for demo purposes
 */
export const generateSampleData = () => {
  return 'This is sample data for demonstration purposes.';
};

/**
 * Example: Calculate statistics
 * 
 * @param {string} data - Data to analyze
 * @returns {Object} Statistics object
 */
export const calculateStats = (data) => {
  if (!data) {
    return { characters: 0, words: 0, lines: 0 };
  }
  
  return {
    characters: data.length,
    words: data.split(/\s+/).filter(w => w.length > 0).length,
    lines: data.split('\n').length,
  };
};

/**
 * Example: Format output
 * 
 * @param {any} data - Data to format
 * @returns {string} Formatted string
 */
export const formatOutput = (data) => {
  if (typeof data === 'object') {
    return JSON.stringify(data, null, 2);
  }
  return String(data);
};

/**
 * Example: Transform data (async operation)
 * 
 * @param {string} input - Input data
 * @returns {Promise<Object>} { success: boolean, result?: any, error?: string }
 */
export const transformDataAsync = async (input) => {
  try {
    // Simulate async operation (e.g., API call, heavy computation)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Transform the data
    const result = input.split('').reverse().join('');
    
    return { success: true, result };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// ========================================
// FUTURE: Backend Integration Pattern
// ========================================

/**
 * Example: API-based processing
 * Uncomment and modify when adding backend support
 */
/*
export const processWithAPI = async (input) => {
  try {
    const response = await fetch('/api/your-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });
    
    if (!response.ok) {
      throw new Error('API request failed');
    }
    
    const data = await response.json();
    return { success: true, result: data.result };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
*/

// ========================================
// HELPER FUNCTIONS (Not exported)
// ========================================

/**
 * Private helper function
 * Use for internal logic that doesn't need to be exported
 */
const internalHelper = (value) => {
  return value * 2;
};
