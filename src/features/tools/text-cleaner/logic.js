/**
 * Text Formatter / Cleaner - Business Logic
 * 
 * This file contains all the business logic for text cleaning and formatting.
 * Pure functions without side effects.
 */

/**
 * Remove extra spaces (multiple spaces become single space)
 * @param {string} text - Input text
 * @returns {string} Text with extra spaces removed
 */
export const removeExtraSpaces = (text) => {
  if (!text) return '';
  
  return text
    .split('\n')
    .map(line => line.replace(/\s+/g, ' '))
    .join('\n');
};

/**
 * Remove empty lines
 * @param {string} text - Input text
 * @returns {string} Text without empty lines
 */
export const removeEmptyLines = (text) => {
  if (!text) return '';
  
  return text
    .split('\n')
    .filter(line => line.trim().length > 0)
    .join('\n');
};

/**
 * Trim whitespace from each line
 * @param {string} text - Input text
 * @returns {string} Text with trimmed lines
 */
export const trimLines = (text) => {
  if (!text) return '';
  
  return text
    .split('\n')
    .map(line => line.trim())
    .join('\n');
};

/**
 * Normalize line breaks (convert all to \n)
 * @param {string} text - Input text
 * @returns {string} Text with normalized line breaks
 */
export const normalizeLineBreaks = (text) => {
  if (!text) return '';
  
  // Replace \r\n (Windows) and \r (old Mac) with \n (Unix)
  return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
};

/**
 * Remove all line breaks (convert to single line)
 * @param {string} text - Input text
 * @returns {string} Text as single line
 */
export const removeLineBreaks = (text) => {
  if (!text) return '';
  
  return text.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
};

/**
 * Remove all whitespace (spaces, tabs, line breaks)
 * @param {string} text - Input text
 * @returns {string} Text without any whitespace
 */
export const removeAllWhitespace = (text) => {
  if (!text) return '';
  
  return text.replace(/\s+/g, '');
};

/**
 * Normalize whitespace (trim + remove extra spaces + remove empty lines)
 * @param {string} text - Input text
 * @returns {string} Normalized text
 */
export const normalizeWhitespace = (text) => {
  if (!text) return '';
  
  return text
    .split('\n')
    .map(line => line.trim().replace(/\s+/g, ' '))
    .filter(line => line.length > 0)
    .join('\n');
};

/**
 * Remove duplicate lines
 * @param {string} text - Input text
 * @returns {string} Text without duplicate lines
 */
export const removeDuplicateLines = (text) => {
  if (!text) return '';
  
  const lines = text.split('\n');
  const uniqueLines = [...new Set(lines)];
  return uniqueLines.join('\n');
};

/**
 * Sort lines alphabetically
 * @param {string} text - Input text
 * @param {boolean} ascending - Sort ascending (default) or descending
 * @returns {string} Sorted text
 */
export const sortLines = (text, ascending = true) => {
  if (!text) return '';
  
  const lines = text.split('\n');
  const sorted = ascending 
    ? lines.sort((a, b) => a.localeCompare(b))
    : lines.sort((a, b) => b.localeCompare(a));
  
  return sorted.join('\n');
};

/**
 * Add line numbers
 * @param {string} text - Input text
 * @returns {string} Text with line numbers
 */
export const addLineNumbers = (text) => {
  if (!text) return '';
  
  const lines = text.split('\n');
  return lines
    .map((line, index) => `${index + 1}. ${line}`)
    .join('\n');
};

/**
 * Remove line numbers (if they exist at start of lines)
 * @param {string} text - Input text
 * @returns {string} Text without line numbers
 */
export const removeLineNumbers = (text) => {
  if (!text) return '';
  
  return text
    .split('\n')
    .map(line => line.replace(/^\d+\.\s*/, ''))
    .join('\n');
};

/**
 * Apply all cleanings (comprehensive clean)
 * @param {string} text - Input text
 * @returns {string} Fully cleaned text
 */
export const applyAllCleanings = (text) => {
  if (!text) return '';
  
  let cleaned = text;
  cleaned = normalizeLineBreaks(cleaned);
  cleaned = trimLines(cleaned);
  cleaned = removeExtraSpaces(cleaned);
  cleaned = removeEmptyLines(cleaned);
  
  return cleaned;
};

/**
 * Generate sample text for demo purposes
 * @returns {string} Sample text with issues
 */
export const generateSampleText = () => {
  return `This  text   has    multiple   spaces.

And  some  empty  lines.

    It also has    leading and trailing    spaces.

Perfect for testing the text cleaner!`;
};

/**
 * Get text statistics
 * @param {string} text - Text to analyze
 * @returns {Object} Statistics
 */
export const getTextStats = (text) => {
  if (!text) {
    return {
      characters: 0,
      lines: 0,
      emptyLines: 0
    };
  }

  const lines = text.split('\n');
  const emptyLines = lines.filter(line => line.trim().length === 0).length;
  
  return {
    characters: text.length,
    lines: lines.length,
    emptyLines
  };
};
