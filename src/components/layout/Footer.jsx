import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS } from '../../features/tools/registry';

/**
 * Footer Component
 * 
 * Displays site-wide footer with links, copyright, and social info.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 mt-auto border-t border-gray-800 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🛠️</span>
              <span className="text-xl font-bold text-white">
                JsonAnd<span className="text-primary-400">More</span>
              </span>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Free, fast, and privacy-focused utilities for developers and creators.
              All processing happens in your browser.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary-400 transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-primary-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* ⭐ Popular Tools — Global Internal Links */}
        <div className="border-t border-gray-800 dark:border-gray-900 mt-12 pt-8">
          {/* Section Title */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="text-lg">⭐</span>
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Popular Tools
            </p>
          </div>

          {/* Tool Links */}
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {TOOLS
              .filter(tool => tool.featured)
              .slice(0, 6)
              .map(tool => (
                <Link
                  key={tool.id}
                  to={`/${tool.slug}`}
                  title={`${tool.name} – Free Online Tool`}
                  className="
                    flex items-center gap-2
                    px-4 py-1.5 rounded-full
                    bg-gray-800/70
                    text-gray-300
                    hover:bg-primary-500/20
                    hover:text-primary-300
                    hover:-translate-y-0.5
                    hover:shadow-md
                    transition-all duration-200
                  "
                >
                  {tool.icon && <span className="text-sm">{tool.icon}</span>}
                  <span>{tool.name}</span>
                </Link>
              ))}
          </div>
        </div>
        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-sm text-center text-gray-400 dark:text-gray-500">
          © {currentYear} JsonAndMore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
