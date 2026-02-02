/**
 * Password Generator - Business Logic
 * 
 * This file contains all the business logic for secure password generation.
 * Uses crypto.getRandomValues for cryptographically secure randomness.
 */

// Character sets for password generation
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

// Ambiguous characters that can be confused (O/0, l/I/1, |)
const AMBIGUOUS_CHARS = 'O0lI1|`';

/**
 * Remove ambiguous characters from a character set
 * @param {string} charset - Original character set
 * @returns {string} Filtered character set
 */
const removeAmbiguousChars = (charset) => {
  return charset.split('').filter(char => !AMBIGUOUS_CHARS.includes(char)).join('');
};

/**
 * Generate a secure random password
 * @param {number} length - Password length (6-64)
 * @param {Object} options - Character set options
 * @returns {Object} { success: boolean, password?: string, error?: string }
 */
export const generatePassword = (length, options) => {
  const { includeUppercase, includeLowercase, includeNumbers, includeSymbols, avoidAmbiguous } = options;
  
  // Validate length
  if (length < 6 || length > 64) {
    return { success: false, error: 'Password length must be between 6 and 64 characters' };
  }
  
  // Build character set based on options
  let charset = '';
  if (includeUppercase) charset += UPPERCASE;
  if (includeLowercase) charset += LOWERCASE;
  if (includeNumbers) charset += NUMBERS;
  if (includeSymbols) charset += SYMBOLS;
  
  // Remove ambiguous characters if requested
  if (avoidAmbiguous) {
    charset = removeAmbiguousChars(charset);
  }
  
  // Validate at least one character set is selected
  if (charset.length === 0) {
    return { success: false, error: 'Please select at least one character type' };
  }
  
  // Generate password using crypto.getRandomValues for security
  let password = '';
  const randomValues = new Uint32Array(length);
  
  // Use crypto.getRandomValues for cryptographically secure random numbers
  crypto.getRandomValues(randomValues);
  
  for (let i = 0; i < length; i++) {
    const randomIndex = randomValues[i] % charset.length;
    password += charset[randomIndex];
  }
  
  // Ensure password meets requirements (has at least one of each selected type)
  if (!meetsRequirements(password, options)) {
    // Regenerate if requirements not met (rare case)
    return generatePassword(length, options);
  }
  
  return { success: true, password };
};

/**
 * Cryptographically secure shuffle using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  const randomValues = new Uint32Array(shuffled.length);
  crypto.getRandomValues(randomValues);
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = randomValues[i] % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

/**
 * Generate random character from charset using crypto.getRandomValues
 * @param {string} charset - Character set to choose from
 * @returns {string} Random character
 */
const getRandomChar = (charset) => {
  const randomValue = new Uint32Array(1);
  crypto.getRandomValues(randomValue);
  return charset[randomValue[0] % charset.length];
};

/**
 * Generate password with exact character counts (Advanced Mode)
 * @param {Object} counts - Exact character counts
 * @returns {Object} { success: boolean, password?: string, error?: string }
 */
export const generatePasswordWithExactCounts = (counts) => {
  const { uppercase, lowercase, numbers, symbols, avoidAmbiguous } = counts;
  
  // Validate counts are non-negative integers
  if (uppercase < 0 || lowercase < 0 || numbers < 0 || symbols < 0) {
    return { success: false, error: 'Character counts must be non-negative integers' };
  }
  
  // Calculate total length
  const totalLength = uppercase + lowercase + numbers + symbols;
  
  // Validate total length
  if (totalLength === 0) {
    return { success: false, error: 'Total password length cannot be 0. Please specify at least one character.' };
  }
  
  if (totalLength > 128) {
    return { success: false, error: 'Total password length cannot exceed 128 characters' };
  }
  
  // Build character sets
  let uppercaseChars = UPPERCASE;
  let lowercaseChars = LOWERCASE;
  let numberChars = NUMBERS;
  let symbolChars = SYMBOLS;
  
  // Remove ambiguous characters if requested
  if (avoidAmbiguous) {
    uppercaseChars = removeAmbiguousChars(uppercaseChars);
    lowercaseChars = removeAmbiguousChars(lowercaseChars);
    numberChars = removeAmbiguousChars(numberChars);
    symbolChars = removeAmbiguousChars(symbolChars);
  }
  
  // Validate character sets have enough characters
  if (uppercase > 0 && uppercaseChars.length === 0) {
    return { success: false, error: 'No uppercase characters available (all may be ambiguous)' };
  }
  if (lowercase > 0 && lowercaseChars.length === 0) {
    return { success: false, error: 'No lowercase characters available (all may be ambiguous)' };
  }
  if (numbers > 0 && numberChars.length === 0) {
    return { success: false, error: 'No number characters available (all may be ambiguous)' };
  }
  if (symbols > 0 && symbolChars.length === 0) {
    return { success: false, error: 'No symbol characters available (all may be ambiguous)' };
  }
  
  // Generate exact character counts
  const passwordChars = [];
  
  // Add uppercase characters
  for (let i = 0; i < uppercase; i++) {
    passwordChars.push(getRandomChar(uppercaseChars));
  }
  
  // Add lowercase characters
  for (let i = 0; i < lowercase; i++) {
    passwordChars.push(getRandomChar(lowercaseChars));
  }
  
  // Add number characters
  for (let i = 0; i < numbers; i++) {
    passwordChars.push(getRandomChar(numberChars));
  }
  
  // Add symbol characters
  for (let i = 0; i < symbols; i++) {
    passwordChars.push(getRandomChar(symbolChars));
  }
  
  // Cryptographically secure shuffle
  const shuffledChars = shuffleArray(passwordChars);
  const password = shuffledChars.join('');
  
  return { success: true, password };
};

/**
 * Check if password meets the selected requirements
 * @param {string} password - Generated password
 * @param {Object} options - Character set options
 * @returns {boolean} True if requirements are met
 */
const meetsRequirements = (password, options) => {
  const { includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options;
  
  if (includeUppercase && !/[A-Z]/.test(password)) return false;
  if (includeLowercase && !/[a-z]/.test(password)) return false;
  if (includeNumbers && !/[0-9]/.test(password)) return false;
  if (includeSymbols && !/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) return false;
  
  return true;
};

/**
 * Calculate password strength
 * @param {string} password - Password to analyze
 * @returns {Object} Strength information
 */
export const calculatePasswordStrength = (password) => {
  if (!password || password.length === 0) {
    return { score: 0, label: 'None', color: 'gray' };
  }
  
  let score = 0;
  
  // Length score (up to 30 points)
  score += Math.min(password.length * 2, 30);
  
  // Character diversity score (up to 40 points)
  if (/[a-z]/.test(password)) score += 10;
  if (/[A-Z]/.test(password)) score += 10;
  if (/[0-9]/.test(password)) score += 10;
  if (/[^a-zA-Z0-9]/.test(password)) score += 10;
  
  // Additional length bonus for very long passwords (up to 30 points)
  if (password.length >= 16) score += 10;
  if (password.length >= 24) score += 10;
  if (password.length >= 32) score += 10;
  
  // Determine strength label and color
  let label, color;
  if (score < 30) {
    label = 'Weak';
    color = 'red';
  } else if (score < 50) {
    label = 'Fair';
    color = 'orange';
  } else if (score < 70) {
    label = 'Good';
    color = 'yellow';
  } else if (score < 85) {
    label = 'Strong';
    color = 'green';
  } else {
    label = 'Very Strong';
    color = 'blue';
  }
  
  return { score, label, color };
};

/**
 * Get default password options
 * @returns {Object} Default options
 */
export const getDefaultOptions = () => {
  return {
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    avoidAmbiguous: true // Enabled by default for better UX
  };
};

/**
 * Get preset configurations
 * @returns {Object} Preset configurations
 */
export const getPresets = () => {
  return {
    strong: {
      name: 'Strong (Recommended)',
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      avoidAmbiguous: true,
      description: 'Balanced security for most accounts'
    },
    officeFriendly: {
      name: 'Office Friendly',
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: false,
      avoidAmbiguous: true,
      description: 'No special symbols, easier to type'
    },
    highSecurity: {
      name: 'High Security',
      length: 24,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      avoidAmbiguous: false,
      description: '24+ characters for maximum security'
    },
    pin: {
      name: 'Numeric PIN',
      length: 6,
      includeUppercase: false,
      includeLowercase: false,
      includeNumbers: true,
      includeSymbols: false,
      avoidAmbiguous: true,
      description: 'Numbers only for PIN codes'
    }
  };
};

/**
 * Estimate entropy (bits of randomness)
 * @param {number} length - Password length
 * @param {Object} options - Character set options
 * @returns {number} Entropy in bits
 */
export const calculateEntropy = (length, options) => {
  const { includeUppercase, includeLowercase, includeNumbers, includeSymbols, avoidAmbiguous } = options;
  
  let charsetSize = 0;
  if (includeUppercase) charsetSize += 26;
  if (includeLowercase) charsetSize += 26;
  if (includeNumbers) charsetSize += 10;
  if (includeSymbols) charsetSize += 28;
  
  // Adjust for ambiguous character removal
  if (avoidAmbiguous) {
    // Remove O, 0 from uppercase/numbers
    if (includeUppercase) charsetSize -= 1; // O
    if (includeLowercase) charsetSize -= 2; // l, I (actually only 'l' in lowercase)
    if (includeNumbers) charsetSize -= 2; // 0, 1
    if (includeSymbols) charsetSize -= 2; // |, `
  }
  
  if (charsetSize === 0) return 0;
  
  // Entropy = log2(charsetSize^length)
  const entropy = length * Math.log2(charsetSize);
  return Math.round(entropy);
};

/**
 * Format time to crack estimate
 * @param {number} entropy - Entropy in bits
 * @returns {string} Human-readable time estimate
 */
export const getTimeToCrack = (entropy) => {
  if (entropy === 0) return 'N/A';
  
  // Assume 1 billion guesses per second
  const guessesPerSecond = 1e9;
  const totalCombinations = Math.pow(2, entropy);
  const secondsToCrack = totalCombinations / guessesPerSecond / 2; // Average case
  
  if (secondsToCrack < 60) {
    return 'Less than a minute';
  } else if (secondsToCrack < 3600) {
    const minutes = Math.floor(secondsToCrack / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  } else if (secondsToCrack < 86400) {
    const hours = Math.floor(secondsToCrack / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  } else if (secondsToCrack < 31536000) {
    const days = Math.floor(secondsToCrack / 86400);
    return `${days} day${days !== 1 ? 's' : ''}`;
  } else if (secondsToCrack < 31536000 * 1000) {
    const years = Math.floor(secondsToCrack / 31536000);
    return `${years.toLocaleString()} year${years !== 1 ? 's' : ''}`;
  } else {
    return 'Billions of years';
  }
};

/**
 * Generate sample password (for demo)
 * @returns {string} Sample password
 */
export const generateSamplePassword = () => {
  const options = getDefaultOptions();
  const result = generatePassword(16, options);
  return result.success ? result.password : 'SamplePass123!@#';
};
