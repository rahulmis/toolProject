/**
 * Base64 Encode / Decode - Business Logic
 * 
 * This file contains all the business logic for Base64 operations.
 * Separated from UI for testability and reusability.
 */

/**
 * Encode text to Base64
 * Handles UTF-8 properly using TextEncoder
 * @param {string} text - Text to encode
 * @returns {Object} { success: boolean, result?: string, error?: string }
 */
export const encodeToBase64 = (text) => {
  try {
    if (!text) {
      return { success: false, error: 'Input text is empty' };
    }

    // Use TextEncoder for proper UTF-8 handling
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    
    // Convert Uint8Array to base64 string
    let binary = '';
    data.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    
    const base64 = btoa(binary);
    return { success: true, result: base64 };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

/**
 * Decode Base64 to text
 * Handles UTF-8 properly using TextDecoder
 * @param {string} base64String - Base64 string to decode
 * @returns {Object} { success: boolean, result?: string, error?: string }
 */
export const decodeFromBase64 = (base64String) => {
  try {
    if (!base64String) {
      return { success: false, error: 'Input Base64 string is empty' };
    }

    // Remove whitespace and newlines
    const cleanBase64 = base64String.replace(/\s/g, '');
    
    // Validate Base64 format
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(cleanBase64)) {
      return { success: false, error: 'Invalid Base64 format' };
    }

    // Decode base64 to binary string
    const binary = atob(cleanBase64);
    
    // Convert binary string to Uint8Array
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    
    // Use TextDecoder for proper UTF-8 handling
    const decoder = new TextDecoder('utf-8');
    const text = decoder.decode(bytes);
    
    return { success: true, result: text };
  } catch (err) {
    return { 
      success: false, 
      error: 'Failed to decode Base64. Make sure the input is valid Base64-encoded text.' 
    };
  }
};

/**
 * Validate if a string is valid Base64
 * @param {string} str - String to validate
 * @returns {boolean} True if valid Base64
 */
export const isValidBase64 = (str) => {
  if (!str || typeof str !== 'string') return false;
  
  // Remove whitespace
  const cleanStr = str.replace(/\s/g, '');
  
  // Check format: only valid Base64 characters and proper padding
  return /^[A-Za-z0-9+/]*={0,2}$/.test(cleanStr);
};

/**
 * Generate sample text for demo purposes
 * @returns {string} Sample text
 */
export const generateSampleText = () => {
  return 'Hello, World! 👋\nThis is a sample text with UTF-8 characters: café, naïve, 日本語';
};

/**
 * Get text statistics
 * @param {string} text - Text to analyze
 * @returns {Object} Statistics about the text
 */
export const getTextStats = (text) => {
  if (!text) {
    return {
      characters: 0,
      bytes: 0,
      lines: 0
    };
  }

  const encoder = new TextEncoder();
  const encoded = encoder.encode(text);
  
  return {
    characters: text.length,
    bytes: encoded.length,
    lines: text.split('\n').length
  };
};
