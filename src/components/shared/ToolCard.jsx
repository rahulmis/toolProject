/**
 * ToolCard Component
 * 
 * Compact, utility-focused card for displaying tools.
 * Designed for high-density layouts with 20-50+ tools.
 * 
 * DESIGN PRINCIPLES:
 * - Compact and scannable
 * - Clear visual hierarchy
 * - Minimal visual weight
 * - Professional utility feel
 * - Scalable for many tools
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PinButton from './PinButton';
import { usePinContext } from '../../features/pins/PinContext';

/**
 * ToolCard Component
 * @param {Object} tool - Tool metadata from registry
 */
const ToolCard = ({ tool }) => {
  const { isPinned } = usePinContext();
  const pinned = isPinned(tool.id);

  return (
    <Link 
      to={`/${tool.slug}`}
      className={`
        group relative block
        bg-white dark:bg-gray-800 
        border-2 transition-all duration-150
        rounded-lg
        hover:border-primary-400 dark:hover:border-primary-500
        ${pinned 
          ? 'border-primary-300 dark:border-primary-600' 
          : 'border-gray-200 dark:border-gray-700'
        }
      `}
    >
      {/* Pin Button - Top Right, always visible but subtle */}
      <div className="absolute top-2 right-2 z-10">
        <PinButton toolId={tool.id} size="sm" />
      </div>

      {/* Card Content */}
      <div className="p-4 pr-10">
        {/* Icon + Title Row */}
        <div className="flex items-start gap-3 mb-2">
          {/* Compact Icon */}
          <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center 
            bg-gray-100 dark:bg-gray-700/50 rounded-md">
            <span className="text-xl leading-none">{tool.icon}</span>
          </div>
          
          {/* Tool Name */}
          <h3 className="flex-1 text-base font-semibold leading-tight
            text-gray-900 dark:text-gray-100 
            group-hover:text-primary-600 dark:group-hover:text-primary-400 
            transition-colors line-clamp-2">
            {tool.name}
          </h3>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 
          line-clamp-2 mb-3 ml-12">
          {tool.description}
        </p>
        
        {/* Category Badge */}
        <div className="ml-12">
          <span className="inline-block px-2 py-0.5 
            bg-gray-100 dark:bg-gray-700 
            text-gray-600 dark:text-gray-400 
            text-xs font-medium rounded">
            {tool.category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
