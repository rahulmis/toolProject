/**
 * Timestamp Converter - Business Logic
 * 
 * This file contains all the business logic for timestamp conversions.
 * Uses native JavaScript Date API - no external libraries.
 */

/**
 * Convert Unix timestamp to human-readable date
 * @param {number|string} timestamp - Unix timestamp (seconds or milliseconds)
 * @param {boolean} isMilliseconds - Whether timestamp is in milliseconds
 * @param {boolean} useUTC - Use UTC timezone instead of local
 * @returns {Object} { success: boolean, result?: Object, error?: string }
 */
export const timestampToDate = (timestamp, isMilliseconds = false, useUTC = false) => {
  try {
    // Validate input
    const ts = Number(timestamp);
    if (isNaN(ts)) {
      return { success: false, error: 'Invalid timestamp. Please enter a valid number.' };
    }

    // Convert to milliseconds if needed
    const msTimestamp = isMilliseconds ? ts : ts * 1000;

    // Check if timestamp is reasonable (between 1970 and 2100)
    if (msTimestamp < 0 || msTimestamp > 4102444800000) {
      return { success: false, error: 'Timestamp out of reasonable range (1970-2100).' };
    }

    const date = new Date(msTimestamp);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return { success: false, error: 'Invalid timestamp.' };
    }

    // Format date components
    const result = {
      iso: useUTC ? date.toISOString() : date.toISOString(),
      formatted: formatDate(date, useUTC),
      year: useUTC ? date.getUTCFullYear() : date.getFullYear(),
      month: useUTC ? date.getUTCMonth() + 1 : date.getMonth() + 1,
      day: useUTC ? date.getUTCDate() : date.getDate(),
      hours: useUTC ? date.getUTCHours() : date.getHours(),
      minutes: useUTC ? date.getUTCMinutes() : date.getMinutes(),
      seconds: useUTC ? date.getUTCSeconds() : date.getSeconds(),
      milliseconds: useUTC ? date.getUTCMilliseconds() : date.getMilliseconds(),
      dayOfWeek: useUTC ? getDayName(date.getUTCDay()) : getDayName(date.getDay()),
      timezone: useUTC ? 'UTC' : getLocalTimezoneName(),
      relativeTime: getRelativeTime(date),
    };

    return { success: true, result };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

/**
 * Convert date/time to Unix timestamp
 * @param {string} dateString - Date string (ISO format or parseable)
 * @param {boolean} outputMilliseconds - Output in milliseconds instead of seconds
 * @returns {Object} { success: boolean, result?: Object, error?: string }
 */
export const dateToTimestamp = (dateString, outputMilliseconds = false) => {
  try {
    if (!dateString || dateString.trim() === '') {
      return { success: false, error: 'Please enter a date/time.' };
    }

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return { success: false, error: 'Invalid date format. Try: YYYY-MM-DD HH:MM:SS or ISO format.' };
    }

    const msTimestamp = date.getTime();
    const secondsTimestamp = Math.floor(msTimestamp / 1000);

    const result = {
      seconds: secondsTimestamp,
      milliseconds: msTimestamp,
      primary: outputMilliseconds ? msTimestamp : secondsTimestamp,
      iso: date.toISOString(),
      formatted: formatDate(date, false),
    };

    return { success: true, result };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

/**
 * Get current timestamp
 * @param {boolean} inMilliseconds - Return in milliseconds
 * @returns {number} Current Unix timestamp
 */
export const getCurrentTimestamp = (inMilliseconds = false) => {
  const now = Date.now();
  return inMilliseconds ? now : Math.floor(now / 1000);
};

/**
 * Format date to human-readable string
 * @param {Date} date - Date object
 * @param {boolean} useUTC - Use UTC timezone
 * @returns {string} Formatted date string
 */
const formatDate = (date, useUTC) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: useUTC ? 'UTC' : undefined,
  };

  return date.toLocaleString('en-US', options);
};

/**
 * Get day name from day number (0-6)
 * @param {number} dayNum - Day number (0=Sunday, 6=Saturday)
 * @returns {string} Day name
 */
const getDayName = (dayNum) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayNum];
};

/**
 * Get local timezone name
 * @returns {string} Timezone name or offset
 */
const getLocalTimezoneName = () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timezone || 'Local';
  } catch (err) {
    return 'Local';
  }
};

/**
 * Get relative time description (e.g., "2 hours ago")
 * @param {Date} date - Date to compare
 * @returns {string} Relative time description
 */
const getRelativeTime = (date) => {
  const now = new Date();
  const diffMs = now - date;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (Math.abs(diffSeconds) < 60) {
    return diffSeconds >= 0 ? 'just now' : 'in a moment';
  } else if (Math.abs(diffMinutes) < 60) {
    return diffMinutes >= 0 
      ? `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`
      : `in ${Math.abs(diffMinutes)} minute${Math.abs(diffMinutes) !== 1 ? 's' : ''}`;
  } else if (Math.abs(diffHours) < 24) {
    return diffHours >= 0
      ? `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
      : `in ${Math.abs(diffHours)} hour${Math.abs(diffHours) !== 1 ? 's' : ''}`;
  } else if (Math.abs(diffDays) < 30) {
    return diffDays >= 0
      ? `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`
      : `in ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;
  } else if (Math.abs(diffMonths) < 12) {
    return diffMonths >= 0
      ? `${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`
      : `in ${Math.abs(diffMonths)} month${Math.abs(diffMonths) !== 1 ? 's' : ''}`;
  } else {
    return diffYears >= 0
      ? `${diffYears} year${diffYears !== 1 ? 's' : ''} ago`
      : `in ${Math.abs(diffYears)} year${Math.abs(diffYears) !== 1 ? 's' : ''}`;
  }
};

/**
 * Validate timestamp format
 * @param {string} value - Value to validate
 * @returns {boolean} True if valid timestamp
 */
export const isValidTimestamp = (value) => {
  if (!value || value.trim() === '') return false;
  const num = Number(value);
  return !isNaN(num) && isFinite(num);
};

/**
 * Get sample timestamps for demo
 * @returns {Object} Sample timestamps
 */
export const getSampleTimestamps = () => {
  const now = Date.now();
  return {
    currentSeconds: Math.floor(now / 1000),
    currentMilliseconds: now,
    exampleSeconds: 1609459200, // 2021-01-01 00:00:00 UTC
    exampleMilliseconds: 1609459200000,
    exampleDate: '2021-01-01 00:00:00',
  };
};
