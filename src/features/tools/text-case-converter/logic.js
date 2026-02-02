/**
 * Text Case Converter - Business Logic
 * 
 * This file contains all the business logic for text case conversions.
 * Pure functions without side effects.
 */

/**
 * Convert text to UPPER CASE
 * @param {string} text - Input text
 * @returns {string} Uppercase text
 */
export const toUpperCase = (text) => {
  if (!text) return '';
  return text.toUpperCase();
};

/**
 * Convert text to lower case
 * @param {string} text - Input text
 * @returns {string} Lowercase text
 */
export const toLowerCase = (text) => {
  if (!text) return '';
  return text.toLowerCase();
};

/**
 * Convert text to Title Case (First Letter Of Each Word Capitalized)
 * @param {string} text - Input text
 * @returns {string} Title case text
 */
export const toTitleCase = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

/**
 * Convert text to Sentence case (First letter of first word capitalized)
 * @param {string} text - Input text
 * @returns {string} Sentence case text
 */
export const toSentenceCase = (text) => {
  if (!text) return '';
  
  // Split by sentence-ending punctuation
  const sentences = text.split(/([.!?]\s+)/);
  
  return sentences
    .map((sentence, index) => {
      // Skip punctuation parts
      if (sentence.match(/^[.!?]\s+$/)) return sentence;
      
      sentence = sentence.toLowerCase();
      
      // Capitalize first letter
      if (sentence.length > 0) {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
      }
      return sentence;
    })
    .join('');
};

/**
 * Convert text to camelCase
 * @param {string} text - Input text
 * @returns {string} camelCase text
 */
export const toCamelCase = (text) => {
  if (!text) return '';
  
  // Remove special characters and split into words
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  if (words.length === 0) return '';
  
  // First word lowercase, rest title case
  return words
    .map((word, index) => {
      if (index === 0) return word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
};

/**
 * Convert text to snake_case
 * @param {string} text - Input text
 * @returns {string} snake_case text
 */
export const toSnakeCase = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, '')
    .trim()
    .replace(/\s+/g, '_');
};

/**
 * Convert text to kebab-case
 * @param {string} text - Input text
 * @returns {string} kebab-case text
 */
export const toKebabCase = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, '')
    .trim()
    .replace(/\s+/g, '-');
};

/**
 * Convert text to PascalCase (like camelCase but first letter capitalized)
 * @param {string} text - Input text
 * @returns {string} PascalCase text
 */
export const toPascalCase = (text) => {
  if (!text) return '';
  
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  if (words.length === 0) return '';
  
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

/**
 * Convert text to CONSTANT_CASE (UPPER_SNAKE_CASE)
 * @param {string} text - Input text
 * @returns {string} CONSTANT_CASE text
 */
export const toConstantCase = (text) => {
  if (!text) return '';
  
  return text
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/gi, '')
    .trim()
    .replace(/\s+/g, '_');
};

/**
 * Convert text to dot.case
 * @param {string} text - Input text
 * @returns {string} dot.case text
 */
export const toDotCase = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, '')
    .trim()
    .replace(/\s+/g, '.');
};

/**
 * Convert text to path/case
 * @param {string} text - Input text
 * @returns {string} path/case text
 */
export const toPathCase = (text) => {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, '')
    .trim()
    .replace(/\s+/g, '/');
};

/**
 * Invert case (uppercase becomes lowercase and vice versa)
 * @param {string} text - Input text
 * @returns {string} Case-inverted text
 */
export const toInvertCase = (text) => {
  if (!text) return '';
  
  return text
    .split('')
    .map(char => {
      if (char === char.toUpperCase()) {
        return char.toLowerCase();
      } else {
        return char.toUpperCase();
      }
    })
    .join('');
};

/**
 * Generate sample text for demo purposes
 * @returns {string} Sample text
 */
export const generateSampleText = () => {
  return 'Hello World! This is a SAMPLE text for testing.';
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
      words: 0,
      lines: 0
    };
  }

  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  
  return {
    characters: text.length,
    words: words.length,
    lines: text.split('\n').length
  };
};

/**
 * Get all available case conversions
 * @returns {Array} List of conversion types with metadata
 */
export const getAvailableConversions = () => {
  return [
    { id: 'upper', name: 'UPPER CASE', example: 'HELLO WORLD', fn: toUpperCase },
    { id: 'lower', name: 'lower case', example: 'hello world', fn: toLowerCase },
    { id: 'title', name: 'Title Case', example: 'Hello World', fn: toTitleCase },
    { id: 'sentence', name: 'Sentence case', example: 'Hello world', fn: toSentenceCase },
    { id: 'camel', name: 'camelCase', example: 'helloWorld', fn: toCamelCase },
    { id: 'pascal', name: 'PascalCase', example: 'HelloWorld', fn: toPascalCase },
    { id: 'snake', name: 'snake_case', example: 'hello_world', fn: toSnakeCase },
    { id: 'kebab', name: 'kebab-case', example: 'hello-world', fn: toKebabCase },
    { id: 'constant', name: 'CONSTANT_CASE', example: 'HELLO_WORLD', fn: toConstantCase },
    { id: 'dot', name: 'dot.case', example: 'hello.world', fn: toDotCase },
    { id: 'path', name: 'path/case', example: 'hello/world', fn: toPathCase },
    { id: 'invert', name: 'InVeRt CaSe', example: 'hELLO wORLD', fn: toInvertCase }
  ];
};
