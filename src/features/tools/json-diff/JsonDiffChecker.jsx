/**
 * JSON Diff Checker - UI Component
 * 
 * This component handles the UI and user interactions.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState, useCallback } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import { diffJSON, validateJSON, generateSampleJSONs } from './logic';
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

    const result = diffJSON(input1, input2, viewMode);
    if (result.success) {
      setDiffResult(result);
      setError('');
      setDiffStats(result.stats);
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
    const lines = [];
    if (viewMode === 'unified' && diffResult.unifiedLines) {
      diffResult.unifiedLines.forEach((l) => lines.push(l.content));
    } else if (diffResult.leftLines && diffResult.rightLines) {
      const max = Math.max(diffResult.leftLines.length, diffResult.rightLines.length);
      for (let i = 0; i < max; i++) {
        const left = diffResult.leftLines[i];
        const right = diffResult.rightLines[i];
        const l = left ? (left.type === 'removed' ? `- ${left.content}` : left.content ? `  ${left.content}` : '') : '';
        const r = right ? (right.type === 'added' ? `+ ${right.content}` : right.content ? `  ${right.content}` : '') : '';
        if (l || r) lines.push(`${l || '  '}\t|\t${r || '  '}`);
      }
    }
    const text = lines.join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      setError('Failed to copy to clipboard');
    }
  }, [diffResult, viewMode]);

  const displayContent = (content) =>
    showWhitespace ? content : (content || '').replace(/\s+$/gm, '');

  const renderLineNumbers = (text) => {
    const lines = text.split('\n');
    return lines.map((_, index) => (
      <div key={index} className="line-number">{index + 1}</div>
    ));
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
            <button
              onClick={handleCopyDiff}
              className="px-4 py-2 rounded-lg font-medium border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              {copySuccess ? '✓ Copied!' : '📋 Copy diff'}
            </button>
          )}
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
                <span className="w-3 h-3 rounded-sm bg-green-200 dark:bg-green-600" aria-hidden />
                Added
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-red-200 dark:bg-red-600" aria-hidden />
                Missing
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-gray-300 dark:bg-gray-500" aria-hidden />
                Unequal values
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-sky-200 dark:bg-sky-600" aria-hidden />
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
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-14 min-w-[3.5rem] bg-gray-50 dark:bg-gray-700/50 border-r border-gray-200 dark:border-gray-600 overflow-hidden shrink-0">
                  <div className="line-numbers">{renderLineNumbers(input1)}</div>
                </div>
                <textarea
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  placeholder="Paste first JSON here..."
                  className="textarea-field pl-16 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-0 focus:ring-2 focus:ring-primary-500"
                  rows={16}
                  aria-label="Original JSON"
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
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-14 min-w-[3.5rem] bg-gray-50 dark:bg-gray-700/50 border-r border-gray-200 dark:border-gray-600 overflow-hidden shrink-0">
                  <div className="line-numbers">{renderLineNumbers(input2)}</div>
                </div>
                <textarea
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  placeholder="Paste second JSON here..."
                  className="textarea-field pl-16 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-0 focus:ring-2 focus:ring-primary-500"
                  rows={16}
                  aria-label="Modified JSON"
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
                {diffStats && (diffStats.removed > 0 || diffStats.modified > 0) && (
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    {diffStats.removed > 0 && (
                      <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400">
                        <input
                          type="checkbox"
                          checked={showMissingProperties}
                          onChange={(e) => setShowMissingProperties(e.target.checked)}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span>{diffStats.removed} missing {diffStats.removed === 1 ? 'property' : 'properties'}</span>
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
                        <span>{diffStats.modified} unequal {diffStats.modified === 1 ? 'value' : 'values'}</span>
                      </label>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() => { setDiffResult(null); setError(''); }}
                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
              >
                ← Back to Edit
              </button>
            </div>
            <div className="diff-container max-h-[70vh] overflow-auto">
              {viewMode === 'side-by-side' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-x divide-gray-200 dark:divide-gray-600">
                  <div className="relative min-w-0">
                    <div className="absolute left-0 top-0 bottom-0 w-14 min-w-[3.5rem] bg-gray-50 dark:bg-gray-700/50 border-r border-gray-200 dark:border-gray-600 shrink-0">
                      <div className="line-numbers">
                        {diffResult.leftLines?.map((line, index) => (
                          <div key={index} className={`line-number ${line.type === 'removed' ? 'diff-num-removed' : line.type === 'modified' ? 'diff-num-modified' : ''}`}>
                            {line.lineNumber ?? '−'}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="ml-16">
                      {diffResult.leftLines?.map((line, index) => {
                        const showAsRemoved = line.type === 'removed' && showMissingProperties;
                        const showAsModified = line.type === 'modified' && showUnequalValues;
                        const isContext = line.type === 'unchanged' || line.type === 'empty' || (!showAsRemoved && line.type === 'removed') || (!showAsModified && line.type === 'modified');
                        const bg = showAsRemoved ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200' : showAsModified ? 'bg-gray-100 dark:bg-gray-600/40 text-gray-800 dark:text-gray-200' : isContext && line.type === 'unchanged' ? 'bg-sky-50/80 dark:bg-sky-900/20 text-gray-800 dark:text-gray-200' : 'text-gray-800 dark:text-gray-200';
                        return (
                          <div key={index} className={`px-2 py-0.5 font-mono text-sm min-h-[1.25rem] ${bg}`}>
                            <span className="whitespace-pre">{displayContent(line.content)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="relative min-w-0">
                    <div className="absolute left-0 top-0 bottom-0 w-14 min-w-[3.5rem] bg-gray-50 dark:bg-gray-700/50 border-r border-gray-200 dark:border-gray-600 shrink-0">
                      <div className="line-numbers">
                        {diffResult.rightLines?.map((line, index) => (
                          <div key={index} className={`line-number ${line.type === 'added' ? 'diff-num-added' : line.type === 'modified' ? 'diff-num-modified' : ''}`}>
                            {line.lineNumber ?? '−'}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="ml-16">
                      {diffResult.rightLines?.map((line, index) => {
                        const showAsAdded = line.type === 'added' && showMissingProperties;
                        const showAsModified = line.type === 'modified' && showUnequalValues;
                        const isContext = line.type === 'unchanged' || line.type === 'empty' || (!showAsAdded && line.type === 'added') || (!showAsModified && line.type === 'modified');
                        const bg = showAsAdded ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200' : showAsModified ? 'bg-gray-100 dark:bg-gray-600/40 text-gray-800 dark:text-gray-200' : isContext && line.type === 'unchanged' ? 'bg-sky-50/80 dark:bg-sky-900/20 text-gray-800 dark:text-gray-200' : 'text-gray-800 dark:text-gray-200';
                        return (
                          <div key={index} className={`px-2 py-0.5 font-mono text-sm min-h-[1.25rem] ${bg}`}>
                            <span className="whitespace-pre">{displayContent(line.content)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-14 min-w-[3.5rem] bg-gray-50 dark:bg-gray-700/50 border-r border-gray-200 dark:border-gray-600 shrink-0">
                    <div className="line-numbers">
                      {diffResult.unifiedLines?.map((line, index) => (
                        <div key={index} className="line-number">{line.lineNumber ?? '−'}</div>
                      ))}
                    </div>
                  </div>
                  <div className="ml-16">
                    {diffResult.unifiedLines?.map((line, index) => (
                      <div
                        key={index}
                        className={`px-2 py-0.5 font-mono text-sm min-h-[1.25rem] ${
                          line.type === 'added'
                            ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                            : line.type === 'removed'
                            ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                            : line.type === 'unchanged'
                            ? 'bg-sky-50/80 dark:bg-sky-900/20 text-gray-800 dark:text-gray-200'
                            : 'text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        <span className="whitespace-pre">{displayContent(line.content)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 How to Use</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1.5">
            <li><strong>Side-by-Side:</strong> Original (left) vs modified (right) with inline color coding</li>
            <li><span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 mr-1">Green</span> added · <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 mr-1">Red</span> missing · <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 mr-1">Grey</span> unequal values · <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-sky-100 dark:bg-sky-900/40 text-sky-800 dark:text-sky-200">Blue</span> unchanged</li>
            <li>Use the checkboxes above the result to show/hide <strong>missing properties</strong> and <strong>unequal values</strong></li>
            <li>All processing is local — 100% private</li>
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
          and highlights differences with precision. With line-numbered side-by-side views, color-coded 
          highlighting, and detailed change statistics, it provides the most comprehensive JSON comparison 
          experience available online.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Advanced Features for Professional Developers
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li><strong>Line-numbered comparison</strong> for precise difference identification</li>
          <li><strong>Side-by-side and unified views</strong> to suit your workflow</li>
          <li><strong>Real-time character and line counting</strong> for both inputs</li>
          <li><strong>Visual color coding</strong> (green = added, red = removed, yellow = modified)</li>
          <li><strong>Detailed change statistics</strong> including added, removed, and modified counts</li>
          <li><strong>Built-in JSON validation</strong> with error highlighting</li>
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