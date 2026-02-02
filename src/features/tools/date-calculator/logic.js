/**
 * Date Calculator - Business Logic
 * 
 * This file contains all date calculation logic using native JavaScript Date APIs.
 * All functions are pure and handle edge cases gracefully.
 */

/**
 * Calculate the number of days between two dates
 * @param {string|Date} startDate - The start date
 * @param {string|Date} endDate - The end date
 * @param {boolean} includeEndDate - Whether to include the end date in the count
 * @returns {number} Number of days between dates (can be negative if end is before start)
 */
export const calculateDaysBetween = (startDate, endDate, includeEndDate = false) => {
  if (!startDate || !endDate) return 0;
  
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Check for invalid dates
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 0;
    }
    
    // Reset time to midnight for accurate day calculation
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    const diffTime = end.getTime() - start.getTime();
    let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    // Include end date if requested
    if (includeEndDate && diffDays > 0) {
      diffDays += 1;
    } else if (includeEndDate && diffDays < 0) {
      diffDays -= 1;
    }
    
    return diffDays;
  } catch (error) {
    return 0;
  }
};

/**
 * Add days to a date
 * @param {string|Date} date - The base date
 * @param {number} days - Number of days to add (can be negative to subtract)
 * @returns {Date|null} The resulting date or null if invalid
 */
export const addDaysToDate = (date, days) => {
  if (!date) return null;
  
  try {
    const baseDate = new Date(date);
    
    // Check for invalid date
    if (isNaN(baseDate.getTime())) {
      return null;
    }
    
    const daysToAdd = parseInt(days) || 0;
    const result = new Date(baseDate);
    result.setDate(result.getDate() + daysToAdd);
    
    return result;
  } catch (error) {
    return null;
  }
};

/**
 * Subtract days from a date
 * @param {string|Date} date - The base date
 * @param {number} days - Number of days to subtract
 * @returns {Date|null} The resulting date or null if invalid
 */
export const subtractDaysFromDate = (date, days) => {
  return addDaysToDate(date, -Math.abs(parseInt(days) || 0));
};

/**
 * Format a date as YYYY-MM-DD (for date input)
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDateForInput = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return '';
  }
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Format a date for display (e.g., "January 15, 2024")
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDateLong = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format a date for display (e.g., "Mon, Jan 15, 2024")
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string with day of week
 */
export const formatDateWithDay = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Get today's date at midnight
 * @returns {Date} Today's date
 */
export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

/**
 * Calculate weeks, months, and years from days
 * @param {number} days - Number of days
 * @returns {Object} Breakdown of time periods
 */
export const breakdownDays = (days) => {
  const absDays = Math.abs(days);
  
  const years = Math.floor(absDays / 365);
  const months = Math.floor((absDays % 365) / 30);
  const remainingDays = absDays % 30;
  const weeks = Math.floor(absDays / 7);
  
  return {
    days: absDays,
    weeks,
    months: Math.floor(absDays / 30),
    years,
    breakdown: {
      years,
      months,
      days: remainingDays
    }
  };
};

/**
 * Check if a year is a leap year
 * @param {number} year - The year to check
 * @returns {boolean} True if leap year
 */
export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

/**
 * Get the number of days in a month
 * @param {number} month - Month (1-12)
 * @param {number} year - Year
 * @returns {number} Number of days in the month
 */
export const getDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

/**
 * Format duration in a human-readable way
 * @param {number} days - Number of days
 * @returns {string} Human-readable duration
 */
export const formatDuration = (days) => {
  const absDays = Math.abs(days);
  
  if (absDays === 0) return '0 days';
  if (absDays === 1) return '1 day';
  
  const breakdown = breakdownDays(absDays);
  const parts = [];
  
  if (breakdown.breakdown.years > 0) {
    parts.push(`${breakdown.breakdown.years} year${breakdown.breakdown.years !== 1 ? 's' : ''}`);
  }
  if (breakdown.breakdown.months > 0) {
    parts.push(`${breakdown.breakdown.months} month${breakdown.breakdown.months !== 1 ? 's' : ''}`);
  }
  if (breakdown.breakdown.days > 0) {
    parts.push(`${breakdown.breakdown.days} day${breakdown.breakdown.days !== 1 ? 's' : ''}`);
  }
  
  return parts.join(', ') || `${absDays} days`;
};

/**
 * Count weekdays and weekends between two dates
 * @param {string|Date} startDate - The start date
 * @param {string|Date} endDate - The end date
 * @param {boolean} includeEndDate - Whether to include the end date
 * @returns {Object} Counts of weekdays and weekends
 */
export const countWeekdaysAndWeekends = (startDate, endDate, includeEndDate = false) => {
  if (!startDate || !endDate) {
    return { weekdays: 0, weekends: 0, total: 0 };
  }
  
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { weekdays: 0, weekends: 0, total: 0 };
    }
    
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    let weekdays = 0;
    let weekends = 0;
    
    const current = new Date(start);
    const endTime = end.getTime();
    
    while (current.getTime() <= endTime) {
      const dayOfWeek = current.getDay();
      
      // 0 = Sunday, 6 = Saturday
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekends++;
      } else {
        weekdays++;
      }
      
      current.setDate(current.getDate() + 1);
    }
    
    // Adjust if not including end date
    if (!includeEndDate && weekdays + weekends > 0) {
      const endDayOfWeek = end.getDay();
      if (endDayOfWeek === 0 || endDayOfWeek === 6) {
        weekends--;
      } else {
        weekdays--;
      }
    }
    
    return {
      weekdays,
      weekends,
      total: weekdays + weekends
    };
  } catch (error) {
    return { weekdays: 0, weekends: 0, total: 0 };
  }
};

/**
 * Calculate precise date difference in years, months, and days
 * @param {string|Date} startDate - The start date
 * @param {string|Date} endDate - The end date
 * @returns {Object} Precise breakdown
 */
export const calculatePreciseDateDifference = (startDate, endDate) => {
  if (!startDate || !endDate) {
    return { years: 0, months: 0, days: 0 };
  }
  
  try {
    let start = new Date(startDate);
    let end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return { years: 0, months: 0, days: 0 };
    }
    
    // Ensure start is before end
    let isNegative = false;
    if (start > end) {
      [start, end] = [end, start];
      isNegative = true;
    }
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    
    // Adjust for negative days
    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    
    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Apply negative sign if needed
    if (isNegative) {
      years = -years;
      months = -months;
      days = -days;
    }
    
    return { years, months, days };
  } catch (error) {
    return { years: 0, months: 0, days: 0 };
  }
};

/**
 * Calculate business days (weekdays) between two dates
 * @param {string|Date} startDate - The start date
 * @param {string|Date} endDate - The end date
 * @param {boolean} includeEndDate - Whether to include the end date
 * @returns {number} Number of business days
 */
export const calculateBusinessDays = (startDate, endDate, includeEndDate = false) => {
  const counts = countWeekdaysAndWeekends(startDate, endDate, includeEndDate);
  return counts.weekdays;
};
