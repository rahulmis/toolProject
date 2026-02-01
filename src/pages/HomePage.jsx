/**
 * Homepage Component
 * 
 * Displays all available tools in an organized, searchable grid.
 * Automatically updates when new tools are added to the registry.
 * 
 * FEATURES:
 * - Search functionality
 * - Category grouping
 * - Responsive grid
 * - Hero section
 * - Feature highlights
 */

import React, { useState } from 'react';
import { 
  TOOLS, 
  searchTools, 
  getToolsGroupedByCategory 
} from '../features/tools/registry';
import { usePins } from '../features/pins/usePins';
import ToolCard from '../components/shared/ToolCard';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { pinnedTools } = usePins();

  // Search tools based on query
  const filteredTools = searchTools(searchQuery);
  
  // Separate pinned and unpinned tools
  const pinnedToolsList = filteredTools.filter(tool => 
    pinnedTools.includes(tool.id)
  );
  
  const unpinnedToolsList = filteredTools.filter(tool => 
    !pinnedTools.includes(tool.id)
  );
  
  // Group unpinned tools by category
  const groupedUnpinnedTools = {};
  unpinnedToolsList.forEach(tool => {
    if (!groupedUnpinnedTools[tool.category]) {
      groupedUnpinnedTools[tool.category] = [];
    }
    groupedUnpinnedTools[tool.category].push(tool);
  });

  const categories = Object.keys(groupedUnpinnedTools);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Organic Gradient Design (CSS Only) */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 dark:from-blue-900 dark:via-indigo-900 dark:to-gray-900">
        
        {/* Top Wave - CSS Only */}
        <div className="absolute top-0 left-0 right-0 h-16">
          <svg className="absolute top-0 w-full h-16 text-gray-50 dark:text-gray-900" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="currentColor">
            <path d="M0,0L60,5.3C120,11,240,21,360,16C480,11,600,0,720,0C840,0,960,11,1080,16C1200,21,1320,21,1380,21.3L1440,21L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>
        </div>
        
        {/* Organic Shape Layers - Pure CSS */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            background: 'radial-gradient(ellipse at 0% 0%, rgba(96, 165, 250, 0.4) 0%, transparent 50%)'
          }}></div>
          <div className="absolute top-0 right-0 w-full h-full" style={{
            background: 'radial-gradient(ellipse at 100% 0%, rgba(147, 197, 253, 0.3) 0%, transparent 50%)'
          }}></div>
          <div className="absolute bottom-0 left-1/2 w-full h-full" style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(59, 130, 246, 0.35) 0%, transparent 60%)'
          }}></div>
        </div>
        
        {/* Subtle dot pattern overlay */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}></div>
        
        {/* Content - Reduced Height */}
        <div className="relative py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Free Online Tools for Everyone
            </h1>
            
            {/* Subheading */}
            <p className="text-base sm:text-lg text-white/95 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Fast, secure, and privacy-focused utilities. All processing happens in your browser.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tools... (e.g., 'JSON', 'image', 'converter')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 pr-12 rounded-2xl 
                    text-gray-900 dark:text-gray-100 
                    bg-white dark:bg-gray-800 
                    border-0 shadow-2xl shadow-blue-900/20
                    text-base placeholder-gray-500 dark:placeholder-gray-400
                    focus:outline-none focus:ring-4 focus:ring-white/40 dark:focus:ring-blue-400/30
                    transition-all duration-200"
                />
                
                {/* Search Icon */}
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Tool Count */}
            <p className="text-sm text-white/80 font-light">
              {TOOLS.length} tools available
            </p>
          </div>
        </div>
        
        {/* Bottom Wave - CSS Only */}
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg className="absolute bottom-0 w-full h-16 text-gray-50 dark:text-gray-900" preserveAspectRatio="none" viewBox="0 0 1440 54" fill="currentColor">
            <path d="M0,32L60,37.3C120,43,240,53,360,48C480,43,600,21,720,16C840,11,960,21,1080,26.7C1200,32,1320,32,1380,32L1440,32L1440,54L1380,54C1320,54,1200,54,1080,54C960,54,840,54,720,54C600,54,480,54,360,54C240,54,120,54,60,54L0,54Z"></path>
          </svg>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredTools.length === 0 ? (
          // No results
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No tools found matching "{searchQuery}"
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 text-primary-600 dark:text-primary-400 
                hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            {/* Pinned Tools Section */}
            {pinnedToolsList.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    ⭐ Pinned Tools
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({pinnedToolsList.length})
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {pinnedToolsList.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            )}

            {/* Divider between pinned and unpinned */}
            {pinnedToolsList.length > 0 && unpinnedToolsList.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 mb-12"></div>
            )}

            {/* Unpinned Tools by Category */}
            {categories.map((category, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {groupedUnpinnedTools[category].map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-16 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Why Use Our Tools?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All processing happens in your browser. Your data never leaves your device.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No server uploads or processing delays. Get instant results.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🆓</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">100% Free</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No sign-ups, no subscriptions, no hidden costs. Just free tools.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
