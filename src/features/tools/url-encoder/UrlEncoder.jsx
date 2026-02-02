/**
 * URL Encoder / Decoder - UI Component
 * 
 * This component handles the UI and user interactions.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import { encodeURL, decodeURL, generateSampleText, getTextStats, isURLEncoded } from './logic';
import metadata from './metadata';

const UrlEncoder = () => {
  // UI State
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Encode handler
  const handleEncode = () => {
    setError('');
    setOutput('');
    
    const result = encodeURL(input);
    if (result.success) {
      setOutput(result.result);
    } else {
      setError(result.error);
    }
  };

  // Decode handler
  const handleDecode = () => {
    setError('');
    setOutput('');
    
    const result = decodeURL(input);
    if (result.success) {
      setOutput(result.result);
    } else {
      setError(result.error);
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

  // Get input and output stats
  const inputStats = getTextStats(input);
  const outputStats = getTextStats(output);

  // Check if input appears to be URL-encoded
  const inputLooksEncoded = isURLEncoded(input);

  return (
    <ToolLayout
      toolId="url-encode-decode"
      title="URL Encode / Decode"
      description="Encode and decode URLs and query parameters safely. Perfect for handling special characters in URLs."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleEncode} className="btn-primary">
            🔒 Encode
          </button>
          <button onClick={handleDecode} className="btn-primary">
            🔓 Decode
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
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* URL-Encoded Detection */}
        {inputLooksEncoded && !output && !error && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 px-4 py-3 rounded-lg">
            <strong>ℹ️ Hint:</strong> Your input appears to be URL-encoded. Try clicking "Decode" to convert it back to readable text.
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
            placeholder="Enter text to encode or URL-encoded text to decode..."
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
            <li>• <strong>Encode</strong>: Converts text to URL-safe format (e.g., space → %20)</li>
            <li>• <strong>Decode</strong>: Converts URL-encoded text back to readable format</li>
            <li>• Common encoded characters: space (%20), & (%26), = (%3D), ? (%3F)</li>
            <li>• Use encoding for URL parameters, query strings, and form data</li>
            <li>• All processing happens in your browser - your data is private and secure</li>
          </ul>
        </div>

        {/* Examples Section */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">📚 Common Examples:</h3>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Original:</span>
                <div className="font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded mt-1">
                  Hello World
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Encoded:</span>
                <div className="font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded mt-1">
                  Hello%20World
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Original:</span>
                <div className="font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded mt-1 break-all">
                  name=John & age=30
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Encoded:</span>
                <div className="font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded mt-1 break-all">
                  name%3DJohn%20%26%20age%3D30
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Original:</span>
                <div className="font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded mt-1">
                  café résumé
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Encoded:</span>
                <div className="font-mono text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded mt-1 break-all">
                  caf%C3%A9%20r%C3%A9sum%C3%A9
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔍 SEO CONTENT — MUST BE AFTER TOOL UI */}
      <section className="mt-20 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          What is URL Encoding?
        </h2>

        <p className="mb-4">
          URL encoding (also known as percent-encoding) is a mechanism for encoding information
          in a Uniform Resource Identifier (URI). It replaces unsafe ASCII characters with a "%"
          followed by two hexadecimal digits representing the character's numeric value.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Why is URL encoding necessary?
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li>URLs can only contain certain characters from the ASCII character set</li>
          <li>Special characters like spaces, &, =, ? have special meanings in URLs</li>
          <li>Non-ASCII characters (accented letters, emojis) need to be encoded</li>
          <li>Ensures data is transmitted correctly in query parameters and form data</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          Common Use Cases
        </h3>

        <p className="mb-4">
          URL encoding is essential when building query strings for APIs, creating search URLs,
          handling form submissions, and working with any data that needs to be included in a URL.
          Common examples include search queries, user input, and data parameters in REST APIs.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Characters That Need Encoding
        </h3>

        <p className="mb-4">
          Space characters are encoded as %20, ampersands (&) as %26, equals signs (=) as %3D,
          question marks (?) as %3F, and many other special characters. Non-ASCII characters
          like accented letters are encoded as multiple percent-encoded bytes using UTF-8.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Who should use this tool?
        </h3>

        <p>
          This tool is ideal for web developers, API developers, QA testers, and anyone
          working with URLs, query parameters, or web forms. It's perfect for debugging,
          testing, and preparing data for web requests.
        </p>
      </section>
    </ToolLayout>
  );
};

export default UrlEncoder;
