/**
 * JSON Diff Checker - UI Component
 * 
 * This component handles the UI and user interactions.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import { diffJSON, validateJSON, generateSampleJSONs, exportDiffAsText, searchInDiff } from './logic';
import metadata from './metadata';
import './JsonDiffChecker.css';

const JsonDiffChecker = () => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [diffResult, setDiffResult] = useState(null);
  const [error, setError] = useState('');
  const [viewMode, setViewMode] = useState('side-by-side');
  const [showWhitespace, setShowWhitespace] = useState(true);
  const [diffStats, setDiffStats] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showMissingProperties, setShowMissingProperties] = useState(true);
  const [showUnequalValues, setShowUnequalValues] = useState(true);
  
  // New feature states
  const [indentSize, setIndentSize] = useState(2);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [currentChangeIndex, setCurrentChangeIndex] = useState(0);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  
  const diffContainerRef = useRef(null);
  const lineRefs = useRef({});

  // Diff handler
  const handleDiff = () => {
    // Validate both JSONs first
    const valid1 = validateJSON(input1);
    const valid2 = validateJSON(input2);
    
    if (!valid1.valid) {
      setError(`❌ First JSON is invalid: ${valid1.error}`);
      return;
    }
    if (!valid2.valid) {
      setError(`❌ Second JSON is invalid: ${valid2.error}`);
      return;
    }

    const result = diffJSON(input1, input2, viewMode, { indentSize, ignoreWhitespace });
    if (result.success) {
      setDiffResult(result);
      setError('');
      setDiffStats(result.stats);
      setCurrentChangeIndex(0);
      setSearchTerm('');
      setSearchResults([]);
    } else {
      setError(`Error: ${result.error}`);
      setDiffResult(null);
      setDiffStats(null);
    }
  };

  // Clear all
  const handleClear = () => {
    setInput1('');
    setInput2('');
    setDiffResult(null);
    setError('');
    setDiffStats(null);
    setSearchTerm('');
    setSearchResults([]);
    setCurrentChangeIndex(0);
  };

  // Load sample
  const handleLoadSample = () => {
    const samples = generateSampleJSONs();
    setInput1(samples.original);
    setInput2(samples.modified);
    setError('');
  };

  // Swap inputs
  const handleSwap = () => {
    setInput1(input2);
    setInput2(input1);
    setDiffResult(null);
    setError('');
  };

  // Copy diff as text to clipboard
  const handleCopyDiff = useCallback(async () => {
    if (!diffResult) return;
    const text = exportDiffAsText(diffResult, viewMode);
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  }, [diffResult, viewMode]);

  // Download diff as file
  const handleDownloadDiff = useCallback(() => {
    if (!diffResult) return;
    const text = exportDiffAsText(diffResult, viewMode);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `json-diff-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [diffResult, viewMode]);

  // Navigate to next change
  const handleNextChange = useCallback(() => {
    if (!diffResult?.changeIndices?.length) return;
    const nextIndex = (currentChangeIndex + 1) % diffResult.changeIndices.length;
    setCurrentChangeIndex(nextIndex);
    scrollToLine(diffResult.changeIndices[nextIndex]);
  }, [diffResult, currentChangeIndex]);

  // Navigate to previous change
  const handlePrevChange = useCallback(() => {
    if (!diffResult?.changeIndices?.length) return;
    const prevIndex = currentChangeIndex === 0 
      ? diffResult.changeIndices.length - 1 
      : currentChangeIndex - 1;
    setCurrentChangeIndex(prevIndex);
    scrollToLine(diffResult.changeIndices[prevIndex]);
  }, [diffResult, currentChangeIndex]);

  // Search handler
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    if (!term || !diffResult) {
      setSearchResults([]);
      return;
    }
    const results = searchInDiff(diffResult, term, viewMode);
    setSearchResults(results);
    setCurrentSearchIndex(0);
    if (results.length > 0) {
      scrollToLine(results[0].index);
    }
  }, [diffResult, viewMode]);

  // Navigate search results
  const handleNextSearchResult = useCallback(() => {
    if (searchResults.length === 0) return;
    const nextIndex = (currentSearchIndex + 1) % searchResults.length;
    setCurrentSearchIndex(nextIndex);
    scrollToLine(searchResults[nextIndex].index);
  }, [searchResults, currentSearchIndex]);

  const handlePrevSearchResult = useCallback(() => {
    if (searchResults.length === 0) return;
    const prevIndex = currentSearchIndex === 0 
      ? searchResults.length - 1 
      : currentSearchIndex - 1;
    setCurrentSearchIndex(prevIndex);
    scrollToLine(searchResults[prevIndex].index);
  }, [searchResults, currentSearchIndex]);

  // Scroll to specific line
  const scrollToLine = (lineIndex) => {
    const lineElement = lineRefs.current[lineIndex];
    if (lineElement && diffContainerRef.current) {
      lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + F for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'f' && diffResult) {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
      // Ctrl/Cmd + Enter to compare
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && input1 && input2 && !diffResult) {
        e.preventDefault();
        handleDiff();
      }
      // N for next change
      if (e.key === 'n' && !e.ctrlKey && !e.metaKey && diffResult) {
        e.preventDefault();
        handleNextChange();
      }
      // P for previous change
      if (e.key === 'p' && !e.ctrlKey && !e.metaKey && diffResult) {
        e.preventDefault();
        handlePrevChange();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input1, input2, diffResult, handleDiff, handleNextChange, handlePrevChange]);

  const displayContent = (content) =>
    showWhitespace ? content : (content || '').replace(/\s+$/gm, '');

  const renderLineNumbers = (text) => {
    const lines = text.split('\n');
    return lines.map((_, index) => (
      <div key={index} className="line-number">{index + 1}</div>
    ));
  };

  // Render a single diff line with proper styling
  const renderDiffLine = (line, showAsHighlighted, highlightType, index) => {
    const baseClasses = 'diff-line';
    let typeClass = '';
    
    // Check if this line is in search results
    const isSearchResult = searchResults.some(r => r.index === index);
    const isCurrentSearchResult = searchResults[currentSearchIndex]?.index === index;
    
    if (showAsHighlighted) {
      if (highlightType === 'added') typeClass = 'diff-line-added';
      else if (highlightType === 'removed') typeClass = 'diff-line-removed';
      else if (highlightType === 'modified') typeClass = 'diff-line-modified';
    } else if (line.type === 'unchanged') {
      typeClass = 'diff-line-unchanged';
    } else if (line.type === 'empty') {
      typeClass = 'diff-line-empty';
    }
    
    // Add search highlighting classes
    if (isCurrentSearchResult) {
      typeClass += ' search-highlight-current';
    } else if (isSearchResult) {
      typeClass += ' search-highlight';
    }
    
    return (
      <div 
        ref={el => lineRefs.current[index] = el}
        className={`${baseClasses} ${typeClass}`}
      >
        {displayContent(line.content)}
      </div>
    );
  };

  return (
    <ToolLayout
      toolId="json-diff-checker"
      title="JSON Diff Checker"
      description="Compare two JSON objects and find differences with detailed highlighting and analysis."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 items-center">
          <button
            onClick={handleDiff}
            className="px-4 py-2 rounded-lg font-medium bg-primary-600 hover:bg-primary-700 text-white transition-colors dark:bg-primary-500 dark:hover:bg-primary-600"
            title="Compare JSON (Ctrl+Enter)"
          >
            🔍 Compare JSON
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
              className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500"
            >
              <option value="side-by-side">Side-by-Side</option>
              <option value="unified">Unified View</option>
            </select>
          </div>
          <button
            onClick={handleSwap}
            className="px-4 py-2 rounded-lg font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            title="Swap JSONs"
          >
            🔄 Swap
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 rounded-lg font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            🗑️ Clear
          </button>
          <button
            onClick={handleLoadSample}
            className="px-4 py-2 rounded-lg font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            📄 Sample
          </button>
          {diffResult && (
            <>
              <button
                onClick={handleCopyDiff}
                className="px-4 py-2 rounded-lg font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                title="Copy diff to clipboard"
              >
                {copySuccess ? '✓ Copied!' : '📋 Copy'}
              </button>
              <button
                onClick={handleDownloadDiff}
                className="px-4 py-2 rounded-lg font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                title="Download diff as text file"
              >
                💾 Download
              </button>
            </>
          )}
          <button
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className="px-4 py-2 rounded-lg font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            ⚙️ {showAdvancedOptions ? 'Hide' : 'Options'}
          </button>
        </div>

        {/* Advanced Options */}
        {showAdvancedOptions && (
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Advanced Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Indentation Size
                </label>
                <select
                  value={indentSize}
                  onChange={(e) => setIndentSize(Number(e.target.value))}
                  className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500"
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                  <option value={0}>Compact</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showWhitespace}
                    onChange={(e) => setShowWhitespace(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  Show whitespace
                </label>
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ignoreWhitespace}
                    onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  Ignore whitespace differences
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Diff Statistics */}
        {diffStats && (
          <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800 dark:text-gray-100">{diffStats.totalChanges}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Changes</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{diffStats.added}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Added</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-600 dark:text-red-400">{diffStats.removed}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Removed</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-amber-600 dark:text-amber-400">{diffStats.modified}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Modified</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{diffStats.unchanged}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Unchanged</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-600/50" aria-hidden />
                Added
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-red-200 dark:bg-red-600/50" aria-hidden />
                Removed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-amber-200 dark:bg-amber-600/50" aria-hidden />
                Modified
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-500" aria-hidden />
                Unchanged
              </span>
            </div>
          </div>
        )}

        {/* Input Areas or Diff View */}
        {!diffResult ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
              <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Original JSON</label>
              </div>
              <div className="relative flex">
                <div className="w-16 flex-shrink-0 bg-gray-50 dark:bg-gray-700/50 border-r border-gray-200 dark:border-gray-600 overflow-hidden">
                  <div className="line-numbers">{renderLineNumbers(input1)}</div>
                </div>
                <textarea
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  placeholder="Paste first JSON here..."
                  className="textarea-field flex-1 px-4 py-2 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-0 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  rows={16}
                  aria-label="Original JSON"
                  style={{ lineHeight: '1.75rem' }}
                />
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 border-t border-gray-200 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400">
                Characters: {input1.length} • Lines: {input1.split('\n').length}
              </div>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
              <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Modified JSON</label>
              </div>
              <div className="relative flex">
                <div className="w-16 flex-shrink-0 bg-gray-50 dark:bg-gray-700/50 border-r border-gray-200 dark:border-gray-600 overflow-hidden">
                  <div className="line-numbers">{renderLineNumbers(input2)}</div>
                </div>
                <textarea
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  placeholder="Paste second JSON here..."
                  className="textarea-field flex-1 px-4 py-2 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-0 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  rows={16}
                  aria-label="Modified JSON"
                  style={{ lineHeight: '1.75rem' }}
                />
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-2 border-t border-gray-200 dark:border-gray-600 text-sm text-gray-500 dark:text-gray-400">
                Characters: {input2.length} • Lines: {input2.split('\n').length}
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
            <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex flex-wrap justify-between items-center gap-3">
              <div className="flex flex-wrap items-center gap-4">
                <span className="font-medium text-gray-700 dark:text-gray-300">Comparison Result</span>
                
                {/* Search Bar */}
                <div className="flex items-center gap-2">
                  <input
                    id="search-input"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search in diff... (Ctrl+F)"
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 w-48"
                  />
                  {searchResults.length > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {currentSearchIndex + 1}/{searchResults.length}
                      </span>
                      <button
                        onClick={handlePrevSearchResult}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                        title="Previous result"
                      >
                        ↑
                      </button>
                      <button
                        onClick={handleNextSearchResult}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                        title="Next result"
                      >
                        ↓
                      </button>
                    </div>
                  )}
                </div>

                {/* Change Navigation */}
                {diffResult?.changeIndices?.length > 0 && (
                  <div className="flex items-center gap-2 border-l border-gray-300 dark:border-gray-600 pl-4">
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      Change {currentChangeIndex + 1}/{diffResult.changeIndices.length}
                    </span>
                    <button
                      onClick={handlePrevChange}
                      className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                      title="Previous change (P)"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={handleNextChange}
                      className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
                      title="Next change (N)"
                    >
                      Next →
                    </button>
                  </div>
                )}

                {diffStats && (diffStats.removed > 0 || diffStats.modified > 0) && (
                  <div className="flex flex-wrap items-center gap-4 text-sm border-l border-gray-300 dark:border-gray-600 pl-4">
                    {diffStats.removed > 0 && (
                      <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400">
                        <input
                          type="checkbox"
                          checked={showMissingProperties}
                          onChange={(e) => setShowMissingProperties(e.target.checked)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span>{diffStats.removed} missing</span>
                      </label>
                    )}
                    {diffStats.modified > 0 && (
                      <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400">
                        <input
                          type="checkbox"
                          checked={showUnequalValues}
                          onChange={(e) => setShowUnequalValues(e.target.checked)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span>{diffStats.modified} modified</span>
                      </label>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => { setDiffResult(null); setError(''); setSearchTerm(''); setSearchResults([]); }}
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
              >
                ← Back to Edit
              </button>
            </div>
            <div ref={diffContainerRef} className="diff-container max-h-[70vh] overflow-auto">
              {viewMode === 'side-by-side' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left Panel - Original JSON */}
                  <div className="flex border-r border-gray-200 dark:border-gray-700">
                    <div className="w-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 overflow-hidden">
                      <div className="diff-panel-header text-center text-xs">Line</div>
                      <div className="line-numbers">
                        {diffResult.leftLines?.map((line, index) => (
                          <div 
                            key={index} 
                            className={`line-number ${
                              line.type === 'removed' ? 'diff-num-removed' : 
                              line.type === 'modified' ? 'diff-num-modified' : 
                              ''
                            }`}
                          >
                            {line.lineNumber ?? ''}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 overflow-x-auto">
                      <div className="diff-panel-header">Original JSON</div>
                      <div>
                        {diffResult.leftLines?.map((line, index) => {
                          const showAsRemoved = line.type === 'removed' && showMissingProperties;
                          const showAsModified = line.type === 'modified' && showUnequalValues;
                          return (
                            <div key={index}>
                              {renderDiffLine(
                                line,
                                showAsRemoved || showAsModified,
                                showAsRemoved ? 'removed' : 'modified',
                                index
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Panel - Modified JSON */}
                  <div className="flex">
                    <div className="w-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 overflow-hidden">
                      <div className="diff-panel-header text-center text-xs">Line</div>
                      <div className="line-numbers">
                        {diffResult.rightLines?.map((line, index) => (
                          <div 
                            key={index} 
                            className={`line-number ${
                              line.type === 'added' ? 'diff-num-added' : 
                              line.type === 'modified' ? 'diff-num-modified' : 
                              ''
                            }`}
                          >
                            {line.lineNumber ?? ''}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 overflow-x-auto">
                      <div className="diff-panel-header">Modified JSON</div>
                      <div>
                        {diffResult.rightLines?.map((line, index) => {
                          const showAsAdded = line.type === 'added' && showMissingProperties;
                          const showAsModified = line.type === 'modified' && showUnequalValues;
                          return (
                            <div key={index}>
                              {renderDiffLine(
                                line,
                                showAsAdded || showAsModified,
                                showAsAdded ? 'added' : 'modified',
                                index
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex">
                  <div className="w-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 border-r border-gray-300 dark:border-gray-600 overflow-hidden">
                    <div className="diff-panel-header text-center text-xs">Line</div>
                    <div className="line-numbers">
                      {diffResult.unifiedLines?.map((line, index) => (
                        <div key={index} className={`line-number ${
                          line.type === 'added' ? 'diff-num-added' : 
                          line.type === 'removed' ? 'diff-num-removed' : 
                          ''
                        }`}>
                          {line.lineNumber ?? ''}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 overflow-x-auto">
                    <div className="diff-panel-header">Unified Diff View</div>
                    <div>
                      {diffResult.unifiedLines?.map((line, index) => (
                        <div key={index}>
                          {renderDiffLine(
                            line,
                            line.type !== 'unchanged' && line.type !== 'empty',
                            line.type,
                            index
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Features & Tips</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1.5">
            <li><strong>🔍 Search:</strong> Press <kbd className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-800 rounded">Ctrl+F</kbd> to search within the diff results</li>
            <li><strong>⌨️ Navigation:</strong> Use <kbd className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-800 rounded">N</kbd> (next) and <kbd className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-800 rounded">P</kbd> (previous) to jump between changes</li>
            <li><strong>📊 Format options:</strong> Choose between 2-space, 4-space, or compact indentation</li>
            <li><strong>💾 Export:</strong> Download diff results or copy to clipboard for documentation</li>
            <li><strong>🎨 Color coding:</strong> <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 mx-1">Green</span> = added, <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 mx-1">Red</span> = removed, <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 mx-1">Yellow</span> = modified</li>
            <li><strong>🔒 Privacy:</strong> All processing happens locally in your browser - your data never leaves your device</li>
          </ul>
        </div>
      </div>

      {/* 🔍 SEO CONTENT — MUST BE AFTER TOOL UI */}
      <section className="mt-20 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          Professional JSON Diff Checker Tool
        </h2>

        <p className="mb-4">
          Our JSON Diff Checker is a professional-grade tool that visually compares two JSON documents 
          and highlights differences with precision. With perfectly aligned line numbers in side-by-side views, 
          improved color-coded highlighting, and detailed change statistics, it provides the most comprehensive 
          and user-friendly JSON comparison experience available online.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Advanced Features for Professional Developers
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li><strong>Perfectly aligned line numbers</strong> for precise difference identification in both panels</li>
          <li><strong>Side-by-side and unified views</strong> with consistent formatting to suit your workflow</li>
          <li><strong>Real-time character and line counting</strong> for both inputs</li>
          <li><strong>Improved visual color coding</strong> (green = added, red = removed, yellow = modified)</li>
          <li><strong>Fixed line height alignment</strong> ensures diff lines match perfectly across panels</li>
          <li><strong>Detailed change statistics</strong> including added, removed, and modified counts</li>
          <li><strong>Built-in JSON validation</strong> with error highlighting and line-specific error messages</li>
          <li><strong>Sticky headers and line numbers</strong> for easy navigation in large diffs</li>
          <li><strong>Zero data transmission</strong> - all processing happens locally</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          Perfect for These Scenarios
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">API Development</h4>
            <p className="text-sm text-gray-600">
              Compare API responses before and after changes. Ensure backward compatibility by 
              identifying exactly what changed between versions.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Configuration Management</h4>
            <p className="text-sm text-gray-600">
              Track changes in JSON configuration files across different environments. 
              Quickly spot differences between development, staging, and production configs.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Code Reviews</h4>
            <p className="text-sm text-gray-600">
              During pull requests, quickly identify what changed in JSON data structures. 
              The visual diff makes reviewing JSON changes much faster and more accurate.
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Data Migration</h4>
            <p className="text-sm text-gray-600">
              Verify that data transformations preserve all necessary information. 
              Compare source and target JSON structures during migration projects.
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mb-2">
          Privacy and Security Guaranteed
        </h3>

        <p>
          Unlike many online diff tools, our JSON Diff Checker processes everything locally in your browser. 
          Your JSON data never leaves your computer - it's not uploaded to any server, stored in any database, 
          or transmitted over the network. This makes it ideal for comparing sensitive or confidential JSON data.
        </p>
      </section>
    </ToolLayout>
  );
};

export default JsonDiffChecker;