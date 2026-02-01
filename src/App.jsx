/**
 * Main Application Component
 * 
 * This is the root component that sets up routing for the entire platform.
 * Routes are automatically generated from the tools registry.
 * 
 * ARCHITECTURE:
 * - Reads tools from the central registry
 * - Generates routes dynamically (no manual route configuration needed)
 * - Wraps everything in Layout for consistent UI
 * - Handles 404 pages
 * 
 * ADDING NEW TOOLS:
 * No changes needed here! Just add your tool to the registry.
 */

import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { TOOLS } from './features/tools/registry';
import { PinProvider } from './features/pins/PinContext';
import { ThemeProvider } from './features/theme/ThemeContext';

/**
 * Loading fallback component
 * Shown while lazy-loaded tool components are being fetched
 */
const LoadingFallback = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <div className="text-4xl mb-4">⏳</div>
    <p className="text-lg text-gray-600 dark:text-gray-400">Loading tool...</p>
  </div>
);

/**
 * 404 Not Found Component
 */
const NotFound = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">404 - Page Not Found</h1>
    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
      The tool you're looking for doesn't exist.
    </p>
    <a href="/" className="btn-primary inline-block">
      ← Back to Home
    </a>
  </div>
);

/**
 * Main App Component
 */
function App() {
  return (
    <ThemeProvider>
      <PinProvider>
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Homepage Route */}
            <Route path="/" element={<HomePage />} />
            
            {/* About Page Route */}
            <Route path="/about" element={<AboutPage />} />
            
            {/* 
              Dynamically generate routes for all tools from registry
              Each tool's metadata includes its slug and component
              This eliminates the need for manual route configuration
            */}
            {TOOLS.map((tool) => {
              const ToolComponent = tool.component;
              return (
                <Route
                  key={tool.id}
                  path={`/${tool.slug}`}
                  element={<ToolComponent />}
                />
              );
            })}

            {/* 404 Not Found Route - Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </Layout>
      </PinProvider>
    </ThemeProvider>
  );
}

export default App;
