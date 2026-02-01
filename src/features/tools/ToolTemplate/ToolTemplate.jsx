/**
 * TOOL TEMPLATE - UI Component
 * 
 * This file handles the user interface and interactions.
 * Business logic is imported from logic.js for separation of concerns.
 * 
 * STRUCTURE:
 * 1. Imports
 * 2. State management
 * 3. Event handlers
 * 4. Render (JSX)
 * 
 * GUIDELINES:
 * - Keep UI logic separate from business logic
 * - Use descriptive state variable names
 * - Handle errors gracefully with user-friendly messages
 * - Show loading states for async operations
 * - Add helpful tips and documentation
 */

import React, { useState } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import { 
  processData, 
  validateInput, 
  generateSampleData,
  calculateStats,
} from './logic';

const ToolTemplate = () => {
  // ========================================
  // STATE MANAGEMENT
  // ========================================
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState(null);
  
  // ========================================
  // EVENT HANDLERS
  // ========================================
  
  /**
   * Handle main processing action
   */
  const handleProcess = () => {
    // Clear previous errors
    setError('');
    
    // Validate input
    const validation = validateInput(input);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    
    // Process data
    const result = processData(input);
    
    if (result.success) {
      setOutput(result.result);
      setStats(calculateStats(input));
    } else {
      setError(result.error);
      setOutput('');
    }
  };
  
  /**
   * Handle async processing (example)
   */
  const handleAsyncProcess = async () => {
    setIsProcessing(true);
    setError('');
    
    try {
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const result = processData(input);
      
      if (result.success) {
        setOutput(result.result);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };
  
  /**
   * Clear all fields
   */
  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
    setStats(null);
  };
  
  /**
   * Load sample data
   */
  const handleLoadSample = () => {
    setInput(generateSampleData());
    setError('');
  };
  
  /**
   * Copy output to clipboard
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      // Show success feedback (you can add a toast notification)
      alert('Copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };
  
  // ========================================
  // RENDER
  // ========================================
  
  return (
    <ToolLayout
      toolId="tool-template"
      title="Tool Template"
      description="A template for creating new tools in the platform."
    >
      <div className="space-y-6">
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleProcess} 
            className="btn-primary"
            disabled={isProcessing}
          >
            ▶️ Process
          </button>
          
          <button 
            onClick={handleAsyncProcess} 
            className="btn-primary"
            disabled={isProcessing}
          >
            {isProcessing ? '⏳ Processing...' : '🔄 Async Process'}
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
        
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your input here..."
            className="textarea-field"
            rows={8}
          />
          {stats && (
            <p className="text-sm text-gray-500 mt-1">
              {stats.characters} characters, {stats.words} words, {stats.lines} lines
            </p>
          )}
        </div>
        
        {/* Output Section */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Output
            </label>
            {output && (
              <button
                onClick={handleCopy}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                📋 Copy to Clipboard
              </button>
            )}
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Output will appear here..."
            className="textarea-field bg-gray-50"
            rows={8}
          />
        </div>
        
        {/* Tips Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Tips:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• This is a template - replace with your tool's actual tips</li>
            <li>• Explain how to use your tool</li>
            <li>• Mention any limitations or special features</li>
            <li>• All processing happens in your browser for privacy</li>
          </ul>
        </div>
        
        {/* Additional Info (Optional) */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">ℹ️ About This Tool</h3>
          <p className="text-sm text-gray-700">
            This is a template for creating new tools. Copy the entire ToolTemplate folder,
            rename it to your tool name, and customize the metadata, logic, and UI.
          </p>
        </div>
        
      </div>
    </ToolLayout>
  );
};

export default ToolTemplate;
