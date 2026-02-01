/**
 * ThemeToggle Component
 * 
 * A button component for toggling between light, dark, and system themes.
 * Displays current theme with icon and provides a dropdown menu.
 * 
 * FEATURES:
 * - Visual feedback for current theme
 * - Dropdown menu with all theme options
 * - Keyboard accessible
 * - Mobile-friendly
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTheme, THEMES } from '../../features/theme/ThemeContext';

const ThemeToggle = () => {
  const { theme, effectiveTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Theme icons and labels
  const themeInfo = {
    [THEMES.LIGHT]: { icon: '☀️', label: 'Light' },
    [THEMES.DARK]: { icon: '🌙', label: 'Dark' },
    [THEMES.SYSTEM]: { icon: '💻', label: 'System' },
  };

  const currentThemeInfo = themeInfo[theme];
  const effectiveThemeInfo = themeInfo[effectiveTheme];

  const handleThemeSelect = (newTheme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg
          bg-gray-100 dark:bg-gray-800 
          hover:bg-gray-200 dark:hover:bg-gray-700
          text-gray-700 dark:text-gray-200
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentThemeInfo.icon}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {currentThemeInfo.label}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg 
          bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700
          py-1 z-50">
          {Object.entries(THEMES).map(([key, value]) => {
            const info = themeInfo[value];
            const isActive = theme === value;
            const isCurrent = effectiveTheme === value && theme === THEMES.SYSTEM;

            return (
              <button
                key={value}
                onClick={() => handleThemeSelect(value)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-left
                  transition-colors duration-150
                  ${isActive 
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{info.icon}</span>
                  <span className="text-sm font-medium">
                    {info.label}
                    {isCurrent && value === THEMES.SYSTEM && (
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        ({effectiveThemeInfo.label})
                      </span>
                    )}
                  </span>
                </span>
                {isActive && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
