import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../shared/ThemeToggle';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 shrink-0 whitespace-nowrap"
          >
            <span className="text-2xl">🛠️</span>
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              JsonAnd
              <span className="text-primary-600 dark:text-primary-400">
                More
              </span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-4 md:space-x-6 shrink-0">
            <Link
              to="/"
              className="whitespace-nowrap text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm md:text-base"
            >
              All Tools
            </Link>

            <Link
              to="/about"
              className="whitespace-nowrap text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium text-sm md:text-base"
            >
              About
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
