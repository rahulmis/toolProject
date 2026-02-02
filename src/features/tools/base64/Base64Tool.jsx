/**
 * Base64 Encode / Decode - UI Component
 * 
 * This component handles the UI and user interactions.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import { encodeToBase64, decodeFromBase64, generateSampleText, getTextStats } from './logic';
import metadata from './metadata';

const Base64Tool = () => {
  // UI State
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Encode handler
  const handleEncode = () => {
    const result = encodeToBase64(input);
    if (result.success) {
      setOutput(result.result);
      setError('');
    } else {
      setError(result.error);
      setOutput('');
    }
  };

  // Decode handler
  const handleDecode = () => {
    const result = decodeFromBase64(input);
    if (result.success) {
      setOutput(result.result);
      setError('');
    } else {
      setError(result.error);
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
    setInput(generateSampleText());
    setError('');
    setOutput('');
  };

  // Get input stats
  const inputStats = getTextStats(input);
  const outputStats = getTextStats(output);

  return (
    <ToolLayout
      toolId="base64-encode-decode"
      title="Base64 Encode / Decode"
      description="Encode text to Base64 or decode Base64 to text. UTF-8 safe with copy-to-clipboard support."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleEncode} className="btn-primary">
            🔒 Encode to Base64
          </button>
          <button onClick={handleDecode} className="btn-primary">
            🔓 Decode from Base64
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode or Base64 string to decode..."
            className="textarea-field"
            rows={10}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Characters: {inputStats.characters} | Bytes: {inputStats.bytes} | Lines: {inputStats.lines}
          </p>
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
            placeholder="Result will appear here..."
            className="textarea-field bg-gray-50 dark:bg-gray-900"
            rows={10}
          />
          {output && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Characters: {outputStats.characters} | Bytes: {outputStats.bytes} | Lines: {outputStats.lines}
            </p>
          )}
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Tips:</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Use <strong>Encode</strong> to convert plain text into Base64 format</li>
            <li>• Use <strong>Decode</strong> to convert Base64 back to readable text</li>
            <li>• The tool properly handles UTF-8 characters including emojis and special characters</li>
            <li>• All processing happens in your browser - your data is private and secure</li>
          </ul>
        </div>
      </div>

      {/* 🔍 SEO CONTENT — MUST BE AFTER TOOL UI */}
      <section className="mt-20 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          What is Base64 Encoding?
        </h2>

        <p className="mb-4">
          Base64 encoding is a method of converting binary data or text into ASCII characters.
          It uses 64 different characters (A-Z, a-z, 0-9, +, /) to represent data, making it
          safe to transmit over text-based protocols like HTTP, email, or JSON.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Why use Base64 encoding?
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li>Encode binary data for transmission over text-based protocols</li>
          <li>Embed images or files directly in HTML, CSS, or JSON</li>
          <li>Store complex data in URLs or cookies safely</li>
          <li>Encode credentials for Basic HTTP Authentication</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          Common Use Cases
        </h3>

        <p className="mb-4">
          Base64 encoding is widely used in web development for embedding images as data URIs,
          encoding API tokens, storing binary data in JSON, and more. While it's not encryption
          and doesn't provide security, it ensures data can be safely transmitted and stored
          in text-only environments.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Who should use this tool?
        </h3>

        <p>
          This tool is ideal for web developers, backend engineers, API developers,
          and anyone working with data that needs to be Base64 encoded or decoded.
          It's perfect for debugging, testing, and converting data for various applications.
        </p>
      </section>
    </ToolLayout>
  );
};

export default Base64Tool;
