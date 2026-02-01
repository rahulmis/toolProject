/**
 * ToolDetails Component
 * 
 * Displays structured information about a tool including:
 * - What it does
 * - How to use it
 * - Key features
 * - Privacy notice
 * - Ad placeholder
 * 
 * Content is provided via toolDetails prop (from metadata).
 * SEO-friendly with proper heading hierarchy.
 */

import React from 'react';

/**
 * ToolDetails Component
 * 
 * @param {Object} toolDetails - Tool details object from metadata
 * @param {string} toolDetails.what - What the tool does
 * @param {Array<string>} toolDetails.howToUse - Step-by-step usage instructions
 * @param {Array<string>} toolDetails.features - Key features list
 * @param {Object} toolDetails.privacy - Privacy information
 * @param {boolean} toolDetails.privacy.browserBased - Whether tool runs in browser
 * @param {string} toolDetails.privacy.note - Custom privacy note
 */
const ToolDetails = ({ toolDetails }) => {
  if (!toolDetails) {
    return null; // Don't render if no details provided
  }

  const { what, howToUse, features, privacy } = toolDetails;

  return (
    <div className="space-y-8">
      {/* What This Tool Does */}
      {what && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What is this tool?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {what}
          </p>
        </section>
      )}

      {/* How to Use */}
      {howToUse && howToUse.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            How to use this tool
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {howToUse.map((step, index) => (
              <li key={index} className="leading-relaxed">
                {step}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Key Features */}
      {features && features.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Key Features
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-primary-600 dark:text-primary-400 font-bold mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Privacy & Security */}
      {privacy && (
        <section className="bg-primary-50 dark:bg-primary-900/10 rounded-lg p-6 border-l-4 border-primary-500 dark:border-primary-600">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🔒</span>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                Privacy & Security
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {privacy.browserBased && (
                  <span className="font-semibold text-primary-700 dark:text-primary-400">
                    100% Browser-Based Processing.
                  </span>
                )}{' '}
                {privacy.note || 
                  'All data processing happens locally in your browser. Your files and data never leave your device, are not uploaded to any server, and are not stored anywhere. This ensures complete privacy and security.'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Ad Placeholder - Future */}
      <section className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Advertisement Space (Future)
        </p>
      </section>
    </div>
  );
};

export default ToolDetails;
