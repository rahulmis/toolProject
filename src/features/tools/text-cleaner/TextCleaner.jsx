/**
 * Text Formatter / Cleaner - UI Component
 * 
 * This component handles the UI and user interactions.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import {
  removeExtraSpaces,
  removeEmptyLines,
  trimLines,
  normalizeLineBreaks,
  removeLineBreaks,
  removeAllWhitespace,
  normalizeWhitespace,
  removeDuplicateLines,
  sortLines,
  addLineNumbers,
  removeLineNumbers,
  applyAllCleanings,
  generateSampleText,
  getTextStats
} from './logic';
import metadata from './metadata';

const TextCleaner = () => {
  // UI State
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Handle cleaning operations
  const handleClean = (cleaningFn) => {
    if (!input) {
      setOutput('');
      return;
    }
    const result = cleaningFn(input);
    setOutput(result);
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
  };

  // Load sample
  const handleLoadSample = () => {
    setInput(generateSampleText());
    setOutput('');
  };

  // Get statistics
  const inputStats = getTextStats(input);
  const outputStats = getTextStats(output);

  return (
    <ToolLayout
      toolId="text-cleaner"
      title="Text Formatter / Cleaner"
      description="Clean and format text by removing extra spaces, empty lines, and normalizing whitespace instantly."
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
            placeholder="Paste your text here..."
            className="textarea-field"
            rows={12}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Characters: {inputStats.characters} | Lines: {inputStats.lines} | Empty Lines: {inputStats.emptyLines}
          </p>
        </div>

        {/* Cleaning Operations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Cleaning Operations:
          </label>
          
          {/* Primary Operations */}
          <div className="space-y-3">
            <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-primary-900 dark:text-primary-100 mb-2">
                🎯 Most Common
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleClean(applyAllCleanings)}
                  className="btn-primary"
                >
                  ✨ Clean All
                </button>
                <button
                  onClick={() => handleClean(removeExtraSpaces)}
                  className="btn-primary"
                >
                  Remove Extra Spaces
                </button>
                <button
                  onClick={() => handleClean(removeEmptyLines)}
                  className="btn-primary"
                >
                  Remove Empty Lines
                </button>
                <button
                  onClick={() => handleClean(trimLines)}
                  className="btn-primary"
                >
                  Trim Lines
                </button>
              </div>
            </div>

            {/* Advanced Operations */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🔧 Advanced
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleClean(normalizeWhitespace)}
                  className="btn-secondary"
                >
                  Normalize Whitespace
                </button>
                <button
                  onClick={() => handleClean(normalizeLineBreaks)}
                  className="btn-secondary"
                >
                  Normalize Line Breaks
                </button>
                <button
                  onClick={() => handleClean(removeLineBreaks)}
                  className="btn-secondary"
                >
                  Remove Line Breaks
                </button>
                <button
                  onClick={() => handleClean(removeAllWhitespace)}
                  className="btn-secondary"
                >
                  Remove All Whitespace
                </button>
              </div>
            </div>

            {/* Line Operations */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                📝 Line Operations
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleClean(removeDuplicateLines)}
                  className="btn-secondary"
                >
                  Remove Duplicates
                </button>
                <button
                  onClick={() => handleClean((text) => sortLines(text, true))}
                  className="btn-secondary"
                >
                  Sort A→Z
                </button>
                <button
                  onClick={() => handleClean((text) => sortLines(text, false))}
                  className="btn-secondary"
                >
                  Sort Z→A
                </button>
                <button
                  onClick={() => handleClean(addLineNumbers)}
                  className="btn-secondary"
                >
                  Add Line Numbers
                </button>
                <button
                  onClick={() => handleClean(removeLineNumbers)}
                  className="btn-secondary"
                >
                  Remove Line Numbers
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Output Area */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Output (Cleaned Text)
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
            placeholder="Cleaned text will appear here..."
            className="textarea-field bg-gray-50 dark:bg-gray-900"
            rows={12}
          />
          {output && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Characters: {outputStats.characters} | Lines: {outputStats.lines} | Empty Lines: {outputStats.emptyLines}
            </p>
          )}
        </div>

        {/* Operation Descriptions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            📖 Operation Descriptions:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <strong>Clean All:</strong> Applies all basic cleanings (trim, extra spaces, empty lines)
            </div>
            <div>
              <strong>Remove Extra Spaces:</strong> Replaces multiple spaces with single space
            </div>
            <div>
              <strong>Remove Empty Lines:</strong> Deletes blank lines from text
            </div>
            <div>
              <strong>Trim Lines:</strong> Removes leading/trailing whitespace from each line
            </div>
            <div>
              <strong>Normalize Whitespace:</strong> Comprehensive cleaning (trim + extra spaces + empty lines)
            </div>
            <div>
              <strong>Normalize Line Breaks:</strong> Converts all line breaks to Unix format (\n)
            </div>
            <div>
              <strong>Remove Line Breaks:</strong> Converts text to single line
            </div>
            <div>
              <strong>Remove All Whitespace:</strong> Strips all spaces, tabs, and line breaks
            </div>
            <div>
              <strong>Remove Duplicates:</strong> Keeps only unique lines
            </div>
            <div>
              <strong>Sort A→Z / Z→A:</strong> Sorts lines alphabetically
            </div>
            <div>
              <strong>Add Line Numbers:</strong> Prefixes each line with number
            </div>
            <div>
              <strong>Remove Line Numbers:</strong> Strips line numbers from text
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            💡 Tips:
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
            <li>• Use <strong>"Clean All"</strong> for quick comprehensive cleaning</li>
            <li>• <strong>"Normalize Whitespace"</strong> is perfect for text copied from PDFs</li>
            <li>• <strong>"Remove Line Breaks"</strong> is useful for creating single-line text</li>
            <li>• <strong>"Sort Lines"</strong> helps organize lists alphabetically</li>
            <li>• All operations preserve your input - you can try different cleanings</li>
          </ul>
        </div>
      </div>

      {/* 🔍 SEO CONTENT — MUST BE AFTER TOOL UI */}
      <section className="mt-20 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          What is a Text Formatter / Cleaner?
        </h2>

        <p className="mb-4">
          A text formatter and cleaner is a tool that removes unwanted formatting, extra spaces,
          empty lines, and other whitespace issues from text. It's especially useful when copying
          text from PDFs, websites, or documents that add extra formatting you don't want.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Common Text Cleaning Tasks
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li><strong>Remove extra spaces</strong>: Replace multiple consecutive spaces with a single space</li>
          <li><strong>Remove empty lines</strong>: Delete blank lines to make text more compact</li>
          <li><strong>Trim lines</strong>: Remove leading and trailing whitespace from each line</li>
          <li><strong>Normalize line breaks</strong>: Convert Windows/Mac line breaks to Unix format</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          When to Use This Tool
        </h3>

        <p className="mb-4">
          Use this tool when you've copied text from a PDF and it has weird spacing, when preparing
          content for publishing, when cleaning up code snippets, when organizing lists, or whenever
          you need to remove unwanted whitespace and formatting from text.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Who Should Use This Tool?
        </h3>

        <p>
          This tool is perfect for writers, editors, content creators, students, developers,
          copywriters, and anyone who works with text. It's especially useful for cleaning text
          copied from various sources before publishing or using it in your own work.
        </p>
      </section>
    </ToolLayout>
  );
};

export default TextCleaner;
