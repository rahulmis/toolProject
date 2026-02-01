/**
 * JSON Formatter & Validator - UI Component
 * 
 * This component handles the UI and user interactions.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import { formatJSON, minifyJSON, validateJSON, generateSampleJSON } from './logic';
import metadata from './metadata';

const JsonFormatter = () => {
  // UI State
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Format handler
  const handleFormat = () => {
    const result = formatJSON(input);
    if (result.success) {
      setOutput(result.result);
      setError('');
    } else {
      setError(`Invalid JSON: ${result.error}`);
      setOutput('');
    }
  };

  // Minify handler
  const handleMinify = () => {
    const result = minifyJSON(input);
    if (result.success) {
      setOutput(result.result);
      setError('');
    } else {
      setError(`Invalid JSON: ${result.error}`);
      setOutput('');
    }
  };

  // Validate handler
  const handleValidate = () => {
    const result = validateJSON(input);
    if (result.valid) {
      setError('');
      setOutput('✅ Valid JSON!');
    } else {
      setError(`❌ Invalid JSON: ${result.error}`);
      setOutput('');
    }
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
    setError('');
    setCopySuccess(false);
  };

  // Load sample
  const handleLoadSample = () => {
    setInput(generateSampleJSON());
    setError('');
  };

  return (
    <ToolLayout
      toolId="json-formatter"
      title="JSON Formatter & Validator"
      description="Format, beautify, minify and validate JSON with syntax highlighting and error detection."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleFormat} className="btn-primary">
            ✨ Format / Beautify
          </button>
          <button onClick={handleMinify} className="btn-primary">
            📦 Minify
          </button>
          <button onClick={handleValidate} className="btn-primary">
            ✓ Validate Only
          </button>
          <button onClick={handleClear} className="btn-secondary">
            🗑️ Clear
          </button>
          <button onClick={handleLoadSample} className="btn-secondary">
            📄 Load Sample
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Input Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here... e.g., {"name": "John", "age": 30}'
            className="textarea-field"
            rows={12}
          />
          <p className="text-sm text-gray-500 mt-1">
            Characters: {input.length}
          </p>
        </div>

        {/* Output Area */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Output
            </label>
            {output && output !== '✅ Valid JSON!' && (
              <button
                onClick={handleCopy}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {copySuccess ? '✓ Copied!' : '📋 Copy to Clipboard'}
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="textarea-field bg-gray-50"
            rows={12}
          />
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tips:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Use <strong>Format</strong> to beautify minified JSON with proper indentation</li>
            <li>• Use <strong>Minify</strong> to compress JSON to a single line</li>
            <li>• Use <strong>Validate</strong> to check if your JSON is valid without reformatting</li>
            <li>• All processing happens in your browser - your data is private and secure</li>
          </ul>
        </div>
      </div>
      {/* 🔍 SEO CONTENT — MUST BE AFTER TOOL UI */}
      <section className="mt-20 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          What is a JSON Formatter & Validator?
        </h2>

        <p className="mb-4">
          A JSON formatter is an online tool that helps developers format,
          beautify, validate, and minify JSON data. It improves readability
          and detects syntax errors instantly.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Why use this JSON Formatter?
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li>Instant JSON formatting and validation</li>
          <li>Automatic syntax error detection</li>
          <li>Runs fully in your browser</li>
          <li>No data is sent to any server</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          Who should use this tool?
        </h3>

        <p>
          This tool is ideal for backend developers, frontend engineers,
          API developers, and anyone working with JSON-based data.
        </p>
      </section>
    </ToolLayout>
  );
};

export default JsonFormatter;
