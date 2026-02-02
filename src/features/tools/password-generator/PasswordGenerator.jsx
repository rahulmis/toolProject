/**
 * Password Generator - UI Component
 * 
 * This component handles the UI and user interactions.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import {
  generatePassword,
  generatePasswordWithExactCounts,
  calculatePasswordStrength,
  getDefaultOptions,
  calculateEntropy,
  getTimeToCrack,
  getPresets
} from './logic';
import metadata from './metadata';

const PasswordGenerator = () => {
  // Get default options and presets
  const defaultOptions = getDefaultOptions();
  const presets = getPresets();
  
  // UI State
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(defaultOptions.length);
  const [includeUppercase, setIncludeUppercase] = useState(defaultOptions.includeUppercase);
  const [includeLowercase, setIncludeLowercase] = useState(defaultOptions.includeLowercase);
  const [includeNumbers, setIncludeNumbers] = useState(defaultOptions.includeNumbers);
  const [includeSymbols, setIncludeSymbols] = useState(defaultOptions.includeSymbols);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(defaultOptions.avoidAmbiguous);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  
  // Advanced Mode State
  const [advancedMode, setAdvancedMode] = useState(false);
  const [uppercaseCount, setUppercaseCount] = useState(4);
  const [lowercaseCount, setLowercaseCount] = useState(4);
  const [numbersCount, setNumbersCount] = useState(4);
  const [symbolsCount, setSymbolsCount] = useState(4);

  // Calculate total length for advanced mode
  const advancedTotalLength = uppercaseCount + lowercaseCount + numbersCount + symbolsCount;

  // Generate new password
  const handleGenerate = () => {
    setError('');
    
    if (advancedMode) {
      // Advanced mode: use exact counts
      const counts = {
        uppercase: uppercaseCount,
        lowercase: lowercaseCount,
        numbers: numbersCount,
        symbols: symbolsCount,
        avoidAmbiguous
      };
      
      const result = generatePasswordWithExactCounts(counts);
      
      if (result.success) {
        setPassword(result.password);
      } else {
        setError(result.error);
        setPassword('');
      }
    } else {
      // Simple mode: use standard generation
      const options = {
        includeUppercase,
        includeLowercase,
        includeNumbers,
        includeSymbols,
        avoidAmbiguous
      };
      
      const result = generatePassword(length, options);
      
      if (result.success) {
        setPassword(result.password);
      } else {
        setError(result.error);
        setPassword('');
      }
    }
  };

  // Apply preset configuration
  const applyPreset = (presetKey) => {
    const preset = presets[presetKey];
    setLength(preset.length);
    setIncludeUppercase(preset.includeUppercase);
    setIncludeLowercase(preset.includeLowercase);
    setIncludeNumbers(preset.includeNumbers);
    setIncludeSymbols(preset.includeSymbols);
    setAvoidAmbiguous(preset.avoidAmbiguous);
    setError('');
    // Disable advanced mode when applying preset
    setAdvancedMode(false);
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (!password) return;
    
    try {
      await navigator.clipboard.writeText(password);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  // Calculate strength and entropy
  const strength = calculatePasswordStrength(password);
  const currentLength = advancedMode ? advancedTotalLength : length;
  const entropy = calculateEntropy(currentLength, {
    includeUppercase: advancedMode ? uppercaseCount > 0 : includeUppercase,
    includeLowercase: advancedMode ? lowercaseCount > 0 : includeLowercase,
    includeNumbers: advancedMode ? numbersCount > 0 : includeNumbers,
    includeSymbols: advancedMode ? symbolsCount > 0 : includeSymbols,
    avoidAmbiguous
  });
  const timeToCrack = getTimeToCrack(entropy);

  // Strength color mapping
  const strengthColorClasses = {
    gray: 'bg-gray-200 dark:bg-gray-700',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500'
  };

  return (
    <ToolLayout
      toolId="password-generator"
      title="Password Generator"
      description="Generate strong, secure passwords instantly in your browser. Customizable length and character types with copy-to-clipboard."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Preset Modes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Quick Presets:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => applyPreset('strong')}
              className="px-4 py-3 border-2 border-green-500 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors text-left"
            >
              <div className="font-semibold text-sm">🛡️ Strong</div>
              <div className="text-xs mt-1 opacity-75">Recommended</div>
            </button>
            <button
              onClick={() => applyPreset('officeFriendly')}
              className="px-4 py-3 border-2 border-blue-500 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left"
            >
              <div className="font-semibold text-sm">💼 Office</div>
              <div className="text-xs mt-1 opacity-75">No symbols</div>
            </button>
            <button
              onClick={() => applyPreset('highSecurity')}
              className="px-4 py-3 border-2 border-purple-500 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors text-left"
            >
              <div className="font-semibold text-sm">🔐 High Security</div>
              <div className="text-xs mt-1 opacity-75">24 chars</div>
            </button>
            <button
              onClick={() => applyPreset('pin')}
              className="px-4 py-3 border-2 border-gray-500 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
            >
              <div className="font-semibold text-sm">🔢 PIN</div>
              <div className="text-xs mt-1 opacity-75">Numbers only</div>
            </button>
          </div>
        </div>

        {/* Generated Password Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Generated Password
          </label>
          <div className="relative">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Click 'Generate Password' to create a secure password"
              className="input-field font-mono text-lg pr-24"
            />
            {password && (
              <button
                onClick={handleCopy}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium px-3 py-1 rounded bg-primary-50 dark:bg-primary-900/20"
              >
                {copySuccess ? '✓ Copied!' : '📋 Copy'}
              </button>
            )}
          </div>
          {password && (
            <div className="mt-3 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Strength: <span className={`font-semibold text-${strength.color}-600`}>{strength.label}</span>
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {strength.score}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${strengthColorClasses[strength.color]}`}
                    style={{ width: `${strength.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            🔒 Generated locally in your browser using cryptographically secure randomness
          </p>
        </div>

        {/* Password Length */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password Length: <span className="font-bold text-primary-600 dark:text-primary-400">{advancedMode ? advancedTotalLength : length}</span> characters
            {advancedMode && <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">(Auto-calculated from character counts)</span>}
          </label>
          {!advancedMode && (
            <>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="6"
                  max="64"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <input
                  type="number"
                  min="6"
                  max="64"
                  value={length}
                  onChange={(e) => setLength(Math.min(64, Math.max(6, Number(e.target.value) || 6)))}
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>6 (minimum)</span>
                <span>64 (maximum)</span>
              </div>
            </>
          )}
          {advancedMode && (
            <div className="text-sm text-gray-500 dark:text-gray-400 italic">
              Length slider is disabled in Advanced Mode. Total length is calculated from character counts below.
            </div>
          )}
        </div>

        {/* Advanced Mode Toggle & Controls */}
        <div className="border-2 border-purple-200 dark:border-purple-800 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/10">
          <button
            onClick={() => setAdvancedMode(!advancedMode)}
            className="w-full flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                ⚙️ Advanced Rules (Optional)
              </span>
              <span className="text-xs bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                Enterprise Mode
              </span>
            </div>
            <span className="text-2xl text-purple-600 dark:text-purple-400 transition-transform" style={{ transform: advancedMode ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ▼
            </span>
          </button>
          
          {advancedMode && (
            <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
              <p className="text-sm text-purple-800 dark:text-purple-200 mb-4">
                Specify exact character counts for each type. The password will contain precisely the number of characters you specify.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Uppercase Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Uppercase (A-Z)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="64"
                    value={uppercaseCount}
                    onChange={(e) => setUppercaseCount(Math.max(0, Math.min(64, Number(e.target.value) || 0)))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg font-semibold"
                  />
                </div>

                {/* Lowercase Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Lowercase (a-z)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="64"
                    value={lowercaseCount}
                    onChange={(e) => setLowercaseCount(Math.max(0, Math.min(64, Number(e.target.value) || 0)))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg font-semibold"
                  />
                </div>

                {/* Numbers Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Numbers (0-9)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="64"
                    value={numbersCount}
                    onChange={(e) => setNumbersCount(Math.max(0, Math.min(64, Number(e.target.value) || 0)))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg font-semibold"
                  />
                </div>

                {/* Symbols Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Symbols (!@#$...)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="64"
                    value={symbolsCount}
                    onChange={(e) => setSymbolsCount(Math.max(0, Math.min(64, Number(e.target.value) || 0)))}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg font-semibold"
                  />
                </div>
              </div>

              <div className="mt-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg border border-purple-300 dark:border-purple-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    Total Password Length:
                  </span>
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {advancedTotalLength}
                  </span>
                </div>
                <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                  {uppercaseCount} uppercase + {lowercaseCount} lowercase + {numbersCount} numbers + {symbolsCount} symbols
                </div>
              </div>

              {advancedTotalLength === 0 && (
                <div className="mt-3 text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded px-3 py-2">
                  ⚠️ Total length is 0. Please specify at least one character count.
                </div>
              )}

              {advancedTotalLength > 64 && (
                <div className="mt-3 text-sm text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/20 border border-orange-300 dark:border-orange-700 rounded px-3 py-2">
                  ℹ️ Total length exceeds 64 characters. Longer passwords are more secure but may be harder to manage.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Character Options */}
        {!advancedMode && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Include Characters:
            </label>
            <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-gray-100">Uppercase Letters (A-Z)</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-gray-100">Lowercase Letters (a-z)</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">abcdefghijklmnopqrstuvwxyz</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-gray-100">Numbers (0-9)</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">0123456789</div>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-gray-100">Special Symbols</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">!@#$%^&*()_+-=[]{}|;:,.</div>
              </div>
            </label>
          </div>
        </div>
        )}

        {/* Avoid Ambiguous Characters - Always Available */}
        <div>
          <label className="flex items-center gap-3 p-3 border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/10 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/20 cursor-pointer">
            <input
              type="checkbox"
              checked={avoidAmbiguous}
              onChange={(e) => setAvoidAmbiguous(e.target.checked)}
              className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <div className="flex-1">
              <div className="font-medium text-gray-900 dark:text-gray-100">
                Avoid Ambiguous Characters
                <span className="ml-2 text-xs font-normal text-amber-700 dark:text-amber-300">(Recommended)</span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Excludes: O, 0, l, I, 1, |, `</div>
            </div>
          </label>
        </div>

        {/* Generate Button */}
        <div className="flex gap-3">
          <button
            onClick={handleGenerate}
            className="btn-primary flex-1 text-lg py-4"
          >
            🔐 Generate Password
          </button>
          {password && (
            <button
              onClick={handleGenerate}
              className="px-6 py-4 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors font-medium"
              title="Generate a new password"
            >
              🔄
            </button>
          )}
        </div>

        {/* Entropy Information */}
        {password && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              🔬 Password Analysis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-blue-800 dark:text-blue-200">
              <div>
                <strong>Entropy:</strong> {entropy} bits
              </div>
              <div>
                <strong>Time to crack:</strong> {timeToCrack}
              </div>
              <div className="sm:col-span-2 text-xs text-blue-700 dark:text-blue-300 mt-1">
                * Time estimate assumes 1 billion guesses per second
              </div>
            </div>
          </div>
        )}

        {/* Security Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            🛡️ Password Security Tips:
          </h3>
          <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
            <li>• Use at least <strong>16 characters</strong> for strong security</li>
            <li>• Enable <strong>all character types</strong> for maximum strength</li>
            <li>• Use a <strong>unique password</strong> for each account</li>
            <li>• Consider using a <strong>password manager</strong> to store passwords</li>
            <li>• Enable <strong>two-factor authentication (2FA)</strong> when available</li>
            <li>• Never share or reuse passwords across multiple services</li>
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
            📋 Recommended Settings by Use Case:
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <div>
              <strong>Standard Accounts:</strong> 16 characters, all types enabled
            </div>
            <div>
              <strong>Banking/Email:</strong> 20+ characters, all types enabled
            </div>
            <div>
              <strong>WiFi Password:</strong> 20+ characters, avoid symbols if device compatibility issues
            </div>
            <div>
              <strong>Numeric PIN:</strong> 6-8 characters, numbers only
            </div>
          </div>
        </div>
      </div>

      {/* 🔍 SEO CONTENT — MUST BE AFTER TOOL UI */}
      <section className="mt-20 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          Why Use a Password Generator?
        </h2>

        <p className="mb-4">
          Creating strong, unique passwords for every account is essential for online security,
          but it's difficult to create truly random passwords manually. A password generator
          creates cryptographically secure random passwords that are much stronger than
          human-created passwords.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          What Makes a Password Strong?
        </h3>

        <ul className="list-disc pl-6 mb-4">
          <li><strong>Length</strong>: At least 12-16 characters (longer is better)</li>
          <li><strong>Complexity</strong>: Mix of uppercase, lowercase, numbers, and symbols</li>
          <li><strong>Randomness</strong>: Not based on dictionary words or personal information</li>
          <li><strong>Uniqueness</strong>: Different password for each account</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          How Secure is This Generator?
        </h3>

        <p className="mb-4">
          This password generator uses the browser's crypto.getRandomValues() API, which provides
          cryptographically secure random numbers. This is the same technology used by professional
          security applications. All generation happens in your browser - passwords are never sent
          to any server or stored anywhere.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Who Should Use This Tool?
        </h3>

        <p>
          Everyone who uses online accounts should use strong, unique passwords. This tool is perfect
          for individuals creating new accounts, IT professionals managing multiple systems, security
          teams, or anyone who wants to improve their online security.
        </p>
      </section>
    </ToolLayout>
  );
};

export default PasswordGenerator;
