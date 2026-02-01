/**
 * PinButton Component
 * 
 * Reusable button for pinning/unpinning tools.
 * Can be used in:
 * - Tool cards on homepage
 * - Individual tool pages
 * - Any other location
 * 
 * FEATURES:
 * - Visual feedback (pinned/unpinned state)
 * - Loading state
 * - Accessible (keyboard navigation, ARIA labels)
 * - Mobile-friendly (larger touch target)
 */

import React from 'react';
import { useToolPin } from '../../features/pins/usePins';

/**
 * PinButton Component
 * 
 * @param {Object} props
 * @param {string} props.toolId - Tool ID to pin/unpin
 * @param {string} props.size - Size: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} props.variant - Variant: 'icon', 'button' (default: 'icon')
 * @param {Function} props.onToggle - Optional callback after toggle
 */
const PinButton = ({ 
  toolId, 
  size = 'md',
  variant = 'icon',
  onToggle = null,
  className = '',
}) => {
  const { isPinned, loading, toggle } = useToolPin(toolId);

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent navigation if inside a link
    e.stopPropagation(); // Prevent card click if inside a card
    
    const newStatus = await toggle();
    
    // Call optional callback
    if (onToggle) {
      onToggle(newStatus);
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'text-base p-1',
    md: 'text-xl p-2',
    lg: 'text-2xl p-3',
  };

  // Icon based on state - outline vs filled
  const icon = isPinned ? '★' : '☆';
  const label = isPinned ? 'Unpin this tool' : 'Pin this tool';

  if (variant === 'button') {
    // Button variant with text
    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className={`
          inline-flex items-center gap-2 px-4 py-2 rounded-lg
          transition-all duration-200
          ${isPinned 
            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }
          ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          ${className}
        `}
        aria-label={label}
        title={label}
      >
        <span className="text-xl">{icon}</span>
        <span className="text-sm font-medium">
          {isPinned ? 'Pinned' : 'Pin'}
        </span>
      </button>
    );
  }

  // Icon-only variant (default)
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        ${sizeClasses[size]}
        rounded
        transition-colors duration-200
        ${isPinned 
          ? 'text-yellow-500 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-500' 
          : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400'
        }
        ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${className}
      `}
      aria-label={label}
      title={label}
    >
      {loading ? '⏳' : icon}
    </button>
  );
};

export default PinButton;
