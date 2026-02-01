/**
 * Theme Context - Global Theme Management
 * 
 * Provides centralized theme state management (light/dark/system).
 * Theme preference is persisted in localStorage and syncs across components.
 * 
 * FEATURES:
 * - Light, Dark, and System (auto) themes
 * - LocalStorage persistence
 * - System theme detection
 * - Automatic theme application
 * - Backend-ready (can be extended to sync with user preferences)
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

// Theme modes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// LocalStorage key
const THEME_STORAGE_KEY = 'json-and-more-theme';

/**
 * Get system theme preference
 */
const getSystemTheme = () => {
  if (typeof window === 'undefined') return THEMES.LIGHT;
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? THEMES.DARK 
    : THEMES.LIGHT;
};

/**
 * Get stored theme preference or default to system
 */
const getStoredTheme = () => {
  if (typeof window === 'undefined') return THEMES.SYSTEM;
  
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && Object.values(THEMES).includes(stored)) {
      return stored;
    }
  } catch (err) {
    console.error('Error reading theme from localStorage:', err);
  }
  
  return THEMES.SYSTEM;
};

/**
 * Store theme preference
 */
const storeTheme = (theme) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    console.error('Error storing theme to localStorage:', err);
  }
};

/**
 * Apply theme to document
 */
const applyTheme = (theme) => {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const effectiveTheme = theme === THEMES.SYSTEM ? getSystemTheme() : theme;
  
  if (effectiveTheme === THEMES.DARK) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

/**
 * Theme Provider Component
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const stored = getStoredTheme();
    // Apply theme immediately on mount
    applyTheme(stored);
    return stored;
  });
  const [systemTheme, setSystemTheme] = useState(getSystemTheme());

  // Get effective theme (resolves 'system' to actual theme)
  const effectiveTheme = theme === THEMES.SYSTEM ? systemTheme : theme;

  // Apply theme when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, systemTheme]);

  // Listen to system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      const newSystemTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
      setSystemTheme(newSystemTheme);
      
      // If user has system preference selected, apply the new system theme
      if (theme === THEMES.SYSTEM) {
        applyTheme(THEMES.SYSTEM);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme]);

  /**
   * Set theme and persist to storage
   */
  const setAndStoreTheme = (newTheme) => {
    if (!Object.values(THEMES).includes(newTheme)) {
      console.error(`Invalid theme: ${newTheme}`);
      return;
    }
    
    setTheme(newTheme);
    storeTheme(newTheme);
  };

  /**
   * Toggle between light and dark (ignores system)
   */
  const toggleTheme = () => {
    const newTheme = effectiveTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setAndStoreTheme(newTheme);
  };

  const value = {
    theme,
    effectiveTheme,
    systemTheme,
    setTheme: setAndStoreTheme,
    toggleTheme,
    isDark: effectiveTheme === THEMES.DARK,
    isLight: effectiveTheme === THEMES.LIGHT,
    isSystem: theme === THEMES.SYSTEM,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook to use theme context
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeContext;
