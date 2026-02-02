/**
 * Word & Character Counter - Business Logic
 * 
 * This file contains all the business logic for counting text statistics.
 * Pure functions without side effects.
 */

/**
 * Count words in text
 * @param {string} text - Input text
 * @returns {number} Word count
 */
export const countWords = (text) => {
  if (!text || text.trim().length === 0) return 0;
  
  // Split by whitespace and filter empty strings
  const words = text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  return words.length;
};

/**
 * Count characters with spaces
 * @param {string} text - Input text
 * @returns {number} Character count (including spaces)
 */
export const countCharactersWithSpaces = (text) => {
  if (!text) return 0;
  return text.length;
};

/**
 * Count characters without spaces
 * @param {string} text - Input text
 * @returns {number} Character count (excluding spaces)
 */
export const countCharactersWithoutSpaces = (text) => {
  if (!text) return 0;
  return text.replace(/\s/g, '').length;
};

/**
 * Count sentences in text
 * @param {string} text - Input text
 * @returns {number} Sentence count
 */
export const countSentences = (text) => {
  if (!text || text.trim().length === 0) return 0;
  
  // Split by sentence-ending punctuation followed by space or end of string
  const sentences = text
    .trim()
    .split(/[.!?]+/)
    .filter(sentence => sentence.trim().length > 0);
  
  return sentences.length;
};

/**
 * Count paragraphs in text
 * @param {string} text - Input text
 * @returns {number} Paragraph count
 */
export const countParagraphs = (text) => {
  if (!text || text.trim().length === 0) return 0;
  
  // Split by double line breaks or more
  const paragraphs = text
    .trim()
    .split(/\n\s*\n/)
    .filter(paragraph => paragraph.trim().length > 0);
  
  return paragraphs.length;
};

/**
 * Count lines in text
 * @param {string} text - Input text
 * @returns {number} Line count
 */
export const countLines = (text) => {
  if (!text) return 0;
  
  const lines = text.split('\n');
  return lines.length;
};

/**
 * Calculate average word length
 * @param {string} text - Input text
 * @returns {number} Average word length
 */
export const getAverageWordLength = (text) => {
  if (!text || text.trim().length === 0) return 0;
  
  const words = text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0);
  
  if (words.length === 0) return 0;
  
  const totalLength = words.reduce((sum, word) => sum + word.length, 0);
  return Math.round(totalLength / words.length * 10) / 10; // Round to 1 decimal
};

/**
 * Estimate reading time (average 200 words per minute)
 * @param {string} text - Input text
 * @returns {Object} Reading time { minutes, seconds }
 */
export const getReadingTime = (text) => {
  const wordCount = countWords(text);
  const wordsPerMinute = 200;
  
  const totalMinutes = wordCount / wordsPerMinute;
  const minutes = Math.floor(totalMinutes);
  const seconds = Math.round((totalMinutes - minutes) * 60);
  
  return { minutes, seconds, totalSeconds: Math.round(totalMinutes * 60) };
};

/**
 * Estimate speaking time (average 130 words per minute)
 * @param {string} text - Input text
 * @returns {Object} Speaking time { minutes, seconds }
 */
export const getSpeakingTime = (text) => {
  const wordCount = countWords(text);
  const wordsPerMinute = 130;
  
  const totalMinutes = wordCount / wordsPerMinute;
  const minutes = Math.floor(totalMinutes);
  const seconds = Math.round((totalMinutes - minutes) * 60);
  
  return { minutes, seconds, totalSeconds: Math.round(totalMinutes * 60) };
};

/**
 * Get all text statistics
 * @param {string} text - Input text
 * @returns {Object} All statistics
 */
export const getAllStats = (text) => {
  const words = countWords(text);
  const charsWithSpaces = countCharactersWithSpaces(text);
  const charsWithoutSpaces = countCharactersWithoutSpaces(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const lines = countLines(text);
  const avgWordLength = getAverageWordLength(text);
  const readingTime = getReadingTime(text);
  const speakingTime = getSpeakingTime(text);
  
  return {
    words,
    charactersWithSpaces: charsWithSpaces,
    charactersWithoutSpaces: charsWithoutSpaces,
    sentences,
    paragraphs,
    lines,
    averageWordLength: avgWordLength,
    readingTime,
    speakingTime
  };
};

/**
 * Generate sample text for demo purposes
 * @returns {string} Sample text
 */
export const generateSampleText = () => {
  return `Welcome to the Word Counter!

This is a powerful tool that helps you analyze your text in real-time. As you type or paste content, it instantly calculates various statistics about your text.

The tool counts words, characters (with and without spaces), sentences, and paragraphs. It also estimates reading and speaking times based on average speeds.

This is perfect for writers, students, bloggers, content creators, and anyone who needs to track text statistics. Try it out by typing or pasting your own content!`;
};

/**
 * Format time for display
 * @param {Object} time - Time object with minutes and seconds
 * @returns {string} Formatted time string
 */
export const formatTime = (time) => {
  if (time.minutes === 0 && time.seconds === 0) {
    return '< 1 second';
  }
  
  if (time.minutes === 0) {
    return `${time.seconds} second${time.seconds !== 1 ? 's' : ''}`;
  }
  
  if (time.seconds === 0) {
    return `${time.minutes} minute${time.minutes !== 1 ? 's' : ''}`;
  }
  
  return `${time.minutes} min ${time.seconds} sec`;
};
