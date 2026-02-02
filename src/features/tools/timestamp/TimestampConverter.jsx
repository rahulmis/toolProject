/**
 * Timestamp Converter - UI Component
 * 
 * This component handles the UI and user interactions.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState, useEffect } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import { 
  timestampToDate, 
  dateToTimestamp, 
  getCurrentTimestamp,
  getSampleTimestamps 
} from './logic';
import metadata from './metadata';

const TimestampConverter = () => {
  // UI State
  const [timestampInput, setTimestampInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [timestampResult, setTimestampResult] = useState(null);
  const [dateResult, setDateResult] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  
  // Settings State
  const [useMilliseconds, setUseMilliseconds] = useState(false);
  const [useUTC, setUseUTC] = useState(false);

  // Update current time every second for "now" display
  const [currentTime, setCurrentTime] = useState(getCurrentTimestamp(false));
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimestamp(false));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert timestamp to date
  const handleTimestampToDate = () => {
    setError('');
    setDateResult(null);
    
    const result = timestampToDate(timestampInput, useMilliseconds, useUTC);
    if (result.success) {
      setDateResult(result.result);
    } else {
      setError(result.error);
    }
  };

  // Convert date to timestamp
  const handleDateToTimestamp = () => {
    setError('');
    setTimestampResult(null);
    
    const result = dateToTimestamp(dateInput, useMilliseconds);
    if (result.success) {
      setTimestampResult(result.result);
    } else {
      setError(result.error);
    }
  };

  // Load current timestamp
  const handleUseCurrentTime = () => {
    const current = getCurrentTimestamp(useMilliseconds);
    setTimestampInput(current.toString());
    setError('');
    setDateResult(null);
  };

  // Load sample timestamp
  const handleLoadSample = () => {
    const samples = getSampleTimestamps();
    setTimestampInput(useMilliseconds ? samples.exampleMilliseconds.toString() : samples.exampleSeconds.toString());
    setDateInput(samples.exampleDate);
    setError('');
  };

  // Clear all
  const handleClear = () => {
    setTimestampInput('');
    setDateInput('');
    setTimestampResult(null);
    setDateResult(null);
    setError('');
    setCopySuccess('');
  };

  // Copy to clipboard
  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(label);
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <ToolLayout
      toolId="timestamp-converter"
      title="Timestamp Converter"
      description="Convert Unix timestamps to dates and dates to timestamps. Supports seconds, milliseconds, UTC, and local timezones."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-8">
        {/* Settings Section */}
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Settings</h3>
          <div className="flex flex-wrap gap-4">
            {/* Unit Toggle */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Unit:</label>
              <button
                onClick={() => setUseMilliseconds(false)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  !useMilliseconds
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                Seconds
              </button>
              <button
                onClick={() => setUseMilliseconds(true)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  useMilliseconds
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                Milliseconds
              </button>
            </div>

            {/* Timezone Toggle */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-gray-400">Timezone:</label>
              <button
                onClick={() => setUseUTC(false)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  !useUTC
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                Local
              </button>
              <button
                onClick={() => setUseUTC(true)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  useUTC
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                UTC
              </button>
            </div>

            {/* Current Time Display */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Now: <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">{currentTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleUseCurrentTime} className="btn-secondary">
            🕐 Use Current Time
          </button>
          <button onClick={handleLoadSample} className="btn-secondary">
            📄 Load Sample
          </button>
          <button onClick={handleClear} className="btn-secondary">
            🗑️ Clear All
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Timestamp to Date Section */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Timestamp → Date
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Unix Timestamp ({useMilliseconds ? 'milliseconds' : 'seconds'})
              </label>
              <input
                type="text"
                value={timestampInput}
                onChange={(e) => setTimestampInput(e.target.value)}
                placeholder={useMilliseconds ? '1609459200000' : '1609459200'}
                className="input-field font-mono"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Enter a Unix timestamp ({useMilliseconds ? '13 digits for milliseconds' : '10 digits for seconds'})
              </p>
            </div>

            <button onClick={handleTimestampToDate} className="btn-primary">
              🔄 Convert to Date
            </button>

            {/* Date Result */}
            {dateResult && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-green-900 dark:text-green-100">Result:</h4>
                  <button
                    onClick={() => handleCopy(dateResult.formatted, 'date')}
                    className="text-sm text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200"
                  >
                    {copySuccess === 'date' ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <span className="font-semibold text-green-800 dark:text-green-200">Formatted:</span>
                      <div className="font-mono text-green-900 dark:text-green-100 mt-1">{dateResult.formatted}</div>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-green-800 dark:text-green-200">ISO 8601:</span>
                      <div className="font-mono text-green-900 dark:text-green-100 mt-1">{dateResult.iso}</div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                      <div>
                        <span className="font-semibold text-green-800 dark:text-green-200">Year:</span>
                        <div className="font-mono text-green-900 dark:text-green-100">{dateResult.year}</div>
                      </div>
                      <div>
                        <span className="font-semibold text-green-800 dark:text-green-200">Month:</span>
                        <div className="font-mono text-green-900 dark:text-green-100">{dateResult.month}</div>
                      </div>
                      <div>
                        <span className="font-semibold text-green-800 dark:text-green-200">Day:</span>
                        <div className="font-mono text-green-900 dark:text-green-100">{dateResult.day}</div>
                      </div>
                      <div>
                        <span className="font-semibold text-green-800 dark:text-green-200">Weekday:</span>
                        <div className="font-mono text-green-900 dark:text-green-100">{dateResult.dayOfWeek}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <span className="font-semibold text-green-800 dark:text-green-200">Hour:</span>
                        <div className="font-mono text-green-900 dark:text-green-100">{String(dateResult.hours).padStart(2, '0')}</div>
                      </div>
                      <div>
                        <span className="font-semibold text-green-800 dark:text-green-200">Minute:</span>
                        <div className="font-mono text-green-900 dark:text-green-100">{String(dateResult.minutes).padStart(2, '0')}</div>
                      </div>
                      <div>
                        <span className="font-semibold text-green-800 dark:text-green-200">Second:</span>
                        <div className="font-mono text-green-900 dark:text-green-100">{String(dateResult.seconds).padStart(2, '0')}</div>
                      </div>
                      <div>
                        <span className="font-semibold text-green-800 dark:text-green-200">Timezone:</span>
                        <div className="font-mono text-green-900 dark:text-green-100">{dateResult.timezone}</div>
                      </div>
                    </div>

                    <div>
                      <span className="font-semibold text-green-800 dark:text-green-200">Relative:</span>
                      <div className="font-mono text-green-900 dark:text-green-100 mt-1">{dateResult.relativeTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Date to Timestamp Section */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Date → Timestamp
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date/Time
              </label>
              <input
                type="text"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                placeholder="2024-01-01 12:00:00 or 2024-01-01T12:00:00Z"
                className="input-field font-mono"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Formats: YYYY-MM-DD HH:MM:SS, ISO 8601, or any format JavaScript Date can parse
              </p>
            </div>

            <button onClick={handleDateToTimestamp} className="btn-primary">
              🔄 Convert to Timestamp
            </button>

            {/* Timestamp Result */}
            {timestampResult && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100">Result:</h4>
                  <button
                    onClick={() => handleCopy(timestampResult.primary.toString(), 'timestamp')}
                    className="text-sm text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200"
                  >
                    {copySuccess === 'timestamp' ? '✓ Copied!' : '📋 Copy'}
                  </button>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-blue-800 dark:text-blue-200">
                      {useMilliseconds ? 'Milliseconds' : 'Seconds'}:
                    </span>
                    <div className="font-mono text-xl text-blue-900 dark:text-blue-100 mt-1">
                      {timestampResult.primary}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-blue-200 dark:border-blue-700">
                    <div>
                      <span className="font-semibold text-blue-800 dark:text-blue-200">Seconds:</span>
                      <div className="font-mono text-blue-900 dark:text-blue-100">{timestampResult.seconds}</div>
                    </div>
                    <div>
                      <span className="font-semibold text-blue-800 dark:text-blue-200">Milliseconds:</span>
                      <div className="font-mono text-blue-900 dark:text-blue-100">{timestampResult.milliseconds}</div>
                    </div>
                  </div>

                  <div>
                    <span className="font-semibold text-blue-800 dark:text-blue-200">ISO 8601:</span>
                    <div className="font-mono text-blue-900 dark:text-blue-100 mt-1">{timestampResult.iso}</div>
                  </div>

                  <div>
                    <span className="font-semibold text-blue-800 dark:text-blue-200">Formatted:</span>
                    <div className="font-mono text-blue-900 dark:text-blue-100 mt-1">{timestampResult.formatted}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Tips:</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• <strong>Seconds</strong> format: 10 digits (e.g., 1609459200)</li>
            <li>• <strong>Milliseconds</strong> format: 13 digits (e.g., 1609459200000)</li>
            <li>• Use <strong>UTC</strong> for consistent timestamps across timezones</li>
            <li>• Use <strong>Local</strong> to see times in your browser's timezone</li>
            <li>• All processing happens in your browser - your data is private and secure</li>
          </ul>
        </div>
      </div>

      {/* 🔍 SEO CONTENT — MUST BE AFTER TOOL UI */}
      <section className="mt-20 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          What is a Unix Timestamp?
        </h2>

        <p className="mb-4">
          A Unix timestamp (also known as Epoch time or POSIX time) is a system for tracking time
          as a running count of seconds or milliseconds since January 1, 1970, 00:00:00 UTC (the Unix Epoch).
          It's widely used in programming and databases because it provides a simple, timezone-independent
          way to represent dates and times.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Why use Unix timestamps?
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li>Timezone-independent representation of time</li>
          <li>Easy to store and compare dates</li>
          <li>Standard format across all programming languages</li>
          <li>Efficient for date calculations and sorting</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          Common Use Cases
        </h3>

        <p className="mb-4">
          Unix timestamps are commonly used in APIs, databases, log files, and anywhere you need
          to store or transmit date/time information in a universal format. They're particularly
          useful for scheduling, event tracking, and when working with data across multiple timezones.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Who should use this tool?
        </h3>

        <p>
          This tool is ideal for software developers, database administrators, API developers,
          DevOps engineers, and anyone working with Unix timestamps in their daily work.
          It's perfect for debugging, testing, and converting timestamps for various applications.
        </p>
      </section>
    </ToolLayout>
  );
};

export default TimestampConverter;
