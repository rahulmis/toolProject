import React from 'react';
import PinButton from './PinButton';
import ToolDetails from './ToolDetails';

/**
 * ToolLayout Component
 * 
 * Platform-wide standard layout for ALL tool pages.
 * Creates a focused "tool workspace" with consistent structure and spacing.
 * 
 * DESIGN PHILOSOPHY:
 * - Focused workspace (not full-width landing page)
 * - Centered container with optimal reading width (1024px max)
 * - Clear visual hierarchy and section separation
 * - Consistent spacing across all tools
 * - Scales gracefully from mobile to desktop
 * 
 * STRUCTURE:
 * 1. Tool Header (title, description, pin button)
 * 2. Tool Workspace (main interactive area)
 * 3. Tool Details (how-to, features, privacy)
 * 
 * Props:
 * - title: Tool name
 * - description: Short description
 * - toolId: Tool ID for pin functionality (optional)
 * - toolDetails: Structured content for details section (optional)
 * - children: The actual tool UI (primary workspace)
 */
const ToolLayout = ({ title, description, toolId, toolDetails, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Focused Tool Workspace Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* SECTION 1: Tool Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
                {title}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {description}
              </p>
            </div>
            
            {/* Pin Button */}
            {toolId && (
              <div className="flex-shrink-0">
                <PinButton toolId={toolId} size="lg" variant="button" />
              </div>
            )}
          </div>
        </header>

        {/* SECTION 2: Tool Workspace (Primary Focus) */}
        <main className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            {children}
          </div>
        </main>

        {/* SECTION 3: Tool Details & Information */}
        {toolDetails && (
          <aside className="mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
              <ToolDetails toolDetails={toolDetails} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default ToolLayout;
