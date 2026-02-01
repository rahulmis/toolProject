/**
 * ToolCard Component
 *
 * Clean, premium, scalable card for tools grid
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PinButton from './PinButton';
import { usePinContext } from '../../features/pins/PinContext';

const ToolCard = ({ tool }) => {
  const { isPinned } = usePinContext();
  const pinned = isPinned(tool.id);

  return (
    <Link
      to={`/${tool.slug}`}
      className={`
        group relative block rounded-xl
        bg-white dark:bg-gray-800
        border transition-all duration-200
        ${pinned
          ? 'border-primary-300 dark:border-primary-600'
          : 'border-gray-200 dark:border-gray-700'
        }
        hover:border-primary-400 dark:hover:border-primary-500
        hover:shadow-md hover:-translate-y-0.5
        active:translate-y-0
        overflow-hidden
      `}
    >
      {/* Pinned indicator */}
      {pinned && (
        <span className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-primary-500" />
      )}

      {/* Pin Button */}
      <div className="absolute top-3 right-3 z-10 opacity-70 group-hover:opacity-100 transition">
        <PinButton toolId={tool.id} size="sm" />
      </div>

      {/* Content */}
      <div className="p-4 pr-10">
        {/* Icon + Title */}
        <div className="flex gap-3 items-start mb-2">
          <div
            className="
              w-10 h-10 rounded-lg flex items-center justify-center
              bg-gray-100 dark:bg-gray-700
              text-xl
              transition-transform
              group-hover:scale-105
            "
          >
            {tool.icon}
          </div>

          <h3
            className="
              text-base font-semibold leading-snug
              text-gray-900 dark:text-gray-100
              group-hover:text-primary-600 dark:group-hover:text-primary-400
              line-clamp-2
            "
          >
            {tool.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 ml-12 mb-3">
          {tool.description}
        </p>

        {/* Category */}
        <span
          className="
            inline-flex items-center gap-1
            ml-12 px-2.5 py-1
            text-xs font-medium
            rounded-md
            bg-gray-100 dark:bg-gray-700
            text-gray-600 dark:text-gray-300
          "
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
          {tool.category}
        </span>
      </div>

      {/* Hover CTA */}
      <div
        className="
          absolute inset-x-0 bottom-0
          px-4 py-3
          bg-gradient-to-t from-white via-white/90 to-transparent
          dark:from-gray-800 dark:via-gray-800/90
          opacity-0 translate-y-2
          group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-200
        "
      >
        <div className="flex items-center justify-between text-sm font-medium text-primary-600 dark:text-primary-400">
          <span>Open Tool</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      </div>
    </Link>
  );
};

export default ToolCard;
