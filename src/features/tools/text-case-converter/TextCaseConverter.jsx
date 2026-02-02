/**
 * Text Case Converter - UI Component
 * 
 * This component handles the UI and user interactions.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import { getAvailableConversions, generateSampleText, getTextStats } from './logic';
import metadata from './metadata';

const TextCaseConverter = () => {
  // UI State
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeCase, setActiveCase] = useState('');

  // Get all conversion options
  const conversions = getAvailableConversions();

  // Handle case conversion
  const handleConvert = (conversionId, conversionFn) => {
    if (!input.trim()) {
      setOutput('');
      setActiveCase('');
      return;
    }

    const result = conversionFn(input);
    setOutput(result);
    setActiveCase(conversionId);
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  // Clear all
  const handleClear = () => {
    setInput('');
    setOutput('');
    setCopySuccess(false);
    setActiveCase('');
  };

  // Load sample
  const handleLoadSample = () => {
    setInput(generateSampleText());
    setOutput('');
    setActiveCase('');
  };

  // Get statistics
  const inputStats = getTextStats(input);
  const outputStats = getTextStats(output);

  return (
    <ToolLayout
      toolId="text-case-converter"
      title="Text Case Converter"
      description="Convert text between uppercase, lowercase, camelCase, snake_case, kebab-case, and more. Instant conversion with copy-to-clipboard."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleClear} className="btn-secondary">
            🗑️ Clear
          </button>
          <button onClick={handleLoadSample} className="btn-secondary">
            📄 Load Sample
          </button>
        </div>

        {/* Input Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Text
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your text here..."
            className="textarea-field"
            rows={8}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Characters: {inputStats.characters} | Words: {inputStats.words} | Lines: {inputStats.lines}
          </p>
        </div>

        {/* Conversion Buttons Grid */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Convert To:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {conversions.map((conversion) => (
              <button
                key={conversion.id}
                onClick={() => handleConvert(conversion.id, conversion.fn)}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  activeCase === conversion.id
                    ? 'bg-primary-600 text-white dark:bg-primary-500 shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
                title={`Example: ${conversion.example}`}
              >
                {conversion.name}
              </button>
            ))}
          </div>
        </div>

        {/* Output Area */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
              >
                {copySuccess ? '✓ Copied!' : '📋 Copy to Clipboard'}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Converted text will appear here..."
            className="textarea-field bg-gray-50 dark:bg-gray-900"
            rows={8}
          />
          {output && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Characters: {outputStats.characters} | Words: {outputStats.words} | Lines: {outputStats.lines}
            </p>
          )}
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Tips:</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Click any case format button to instantly convert your text</li>
            <li>• <strong>camelCase</strong> and <strong>snake_case</strong> are popular for programming variable names</li>
            <li>• <strong>kebab-case</strong> is commonly used for URLs and CSS class names</li>
            <li>• <strong>Title Case</strong> is great for headings and titles</li>
            <li>• All conversions happen in your browser - your text stays private</li>
          </ul>
        </div>

        {/* Case Format Examples */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">📚 Case Format Examples:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {conversions.map((conversion) => (
              <div key={conversion.id} className="flex items-start gap-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300 min-w-[130px]">
                  {conversion.name}:
                </span>
                <span className="font-mono text-gray-600 dark:text-gray-400">
                  {conversion.example}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Common Use Cases */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">🎯 Common Use Cases:</h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <strong>JavaScript/TypeScript:</strong> camelCase for variables and functions
            </div>
            <div>
              <strong>Python/Ruby:</strong> snake_case for variables and functions
            </div>
            <div>
              <strong>Java/C#:</strong> PascalCase for classes, camelCase for variables
            </div>
            <div>
              <strong>CSS/HTML:</strong> kebab-case for class names and IDs
            </div>
            <div>
              <strong>URLs:</strong> kebab-case for SEO-friendly paths
            </div>
            <div>
              <strong>Constants:</strong> CONSTANT_CASE for constants and environment variables
            </div>
            <div>
              <strong>Database:</strong> snake_case for table and column names
            </div>
          </div>
        </div>
      </div>

      {/* 🔍 SEO CONTENT — MUST BE AFTER TOOL UI */}
      <section className="mt-20 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          What is Text Case Conversion?
        </h2>

        <p className="mb-4">
          Text case conversion is the process of transforming text from one casing format to another.
          Different programming languages, frameworks, and contexts have different conventions for
          naming variables, functions, classes, and identifiers. This tool helps you quickly convert
          between these formats.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Common Case Formats
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li><strong>camelCase</strong>: First word lowercase, subsequent words capitalized (e.g., myVariableName)</li>
          <li><strong>PascalCase</strong>: All words capitalized (e.g., MyClassName)</li>
          <li><strong>snake_case</strong>: All lowercase with underscores (e.g., my_variable_name)</li>
          <li><strong>kebab-case</strong>: All lowercase with hyphens (e.g., my-css-class)</li>
          <li><strong>CONSTANT_CASE</strong>: All uppercase with underscores (e.g., MY_CONSTANT)</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          Why Use Different Cases?
        </h3>

        <p className="mb-4">
          Different programming languages and frameworks have established conventions for naming.
          Following these conventions makes your code more readable and maintainable. For example,
          JavaScript uses camelCase for variables, Python uses snake_case, and CSS typically uses
          kebab-case for class names.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          When to Use This Tool
        </h3>

        <p className="mb-4">
          Use this tool when refactoring code between languages, converting API response keys,
          formatting database column names, creating URL slugs, or adhering to specific style
          guides. It's especially helpful when working with multiple languages or frameworks
          that have different naming conventions.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Who Should Use This Tool?
        </h3>

        <p>
          This tool is ideal for software developers, web developers, database administrators,
          content writers, technical writers, and anyone who needs to format text according to
          specific naming conventions or style guides.
        </p>
      </section>
    </ToolLayout>
  );
};

export default TextCaseConverter;
