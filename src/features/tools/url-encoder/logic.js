/**
 * URL Encoder / Decoder - Business Logic
 * 
 * This file contains all the business logic for URL encoding/decoding operations.
 * Uses native JavaScript encodeURIComponent/decodeURIComponent functions.
 */

/**
 * Encode text to URL-encoded format
 * @param {string} text - Text to encode
 * @returns {Object} { success: boolean, result?: string, error?: string }
 */
export const encodeURL = (text) => {
  try {
    if (!text) {
      return { success: false, error: 'Input text is empty' };
    }

    const encoded = encodeURIComponent(text);
    return { success: true, result: encoded };
  } catch (err) {
    return { success: false, error: `Encoding failed: ${err.message}` };
  }
};

/**
 * Decode URL-encoded text back to readable format
 * @param {string} encodedText - URL-encoded text to decode
 * @returns {Object} { success: boolean, result?: string, error?: string }
 */
export const decodeURL = (encodedText) => {
  try {
    if (!encodedText) {
      return { success: false, error: 'Input text is empty' };
    }

    const decoded = decodeURIComponent(encodedText);
    return { success: true, result: decoded };
  } catch (err) {
    return { 
      success: false, 
      error: 'Failed to decode URL. Make sure the input is valid URL-encoded text.' 
    };
  }
};

/**
 * Encode entire URL (full URL encoding)
 * @param {string} url - URL to encode
 * @returns {Object} { success: boolean, result?: string, error?: string }
 */
export const encodeFullURL = (url) => {
  try {
    if (!url) {
      return { success: false, error: 'Input URL is empty' };
    }

    const encoded = encodeURI(url);
    return { success: true, result: encoded };
  } catch (err) {
    return { success: false, error: `Encoding failed: ${err.message}` };
  }
};

/**
 * Decode full URL
 * @param {string} encodedUrl - Encoded URL to decode
 * @returns {Object} { success: boolean, result?: string, error?: string }
 */
export const decodeFullURL = (encodedUrl) => {
  try {
    if (!encodedUrl) {
      return { success: false, error: 'Input URL is empty' };
    }

    const decoded = decodeURI(encodedUrl);
    return { success: true, result: decoded };
  } catch (err) {
    return { 
      success: false, 
      error: 'Failed to decode URL. Make sure the input is valid URL-encoded text.' 
    };
  }
};

/**
 * Generate sample text for demo purposes
 * @returns {string} Sample text with special characters
 */
export const generateSampleText = () => {
  return 'Hello World! How are you? #hashtag @mention $100 50% off';
};

/**
 * Generate sample URL for demo purposes
 * @returns {string} Sample URL
 */
export const generateSampleURL = () => {
  return 'https://example.com/search?q=hello world&category=tech&price=$100';
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

/**
 * Validate if text is URL-encoded
 * @param {string} text - Text to validate
 * @returns {boolean} True if appears to be URL-encoded
 */
export const isURLEncoded = (text) => {
  if (!text) return false;
  
  // Check if text contains % followed by two hex digits
  const urlEncodedPattern = /%[0-9A-Fa-f]{2}/;
  return urlEncodedPattern.test(text);
};

/**
 * Get URL encoding information
 * @returns {Object} Information about URL encoding
 */
export const getEncodingInfo = () => {
  return {
    safeChars: 'A-Z a-z 0-9 - _ . ! ~ * \' ( )',
    encodedChars: 'Space, special characters, non-ASCII characters',
    note: 'encodeURIComponent encodes all characters except: A-Z a-z 0-9 - _ . ! ~ * \' ( )'
  };
};
