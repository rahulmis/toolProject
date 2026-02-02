/**
 * JWT Decoder - UI Component
 * 
 * This component handles the UI and user interactions.
 * Business logic is imported from logic.js for separation of concerns.
 */

import React, { useState, useEffect } from 'react';
import ToolLayout from '../../../components/shared/ToolLayout';
import { 
  decodeJWT, 
  generateSampleJWT, 
  prettyPrintJSON, 
  checkExpiration,
  getAlgorithmInfo 
} from './logic';
import metadata from './metadata';

const JwtDecoder = () => {
  // UI State
  const [input, setInput] = useState('');
  const [decodedData, setDecodedData] = useState(null);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  // Auto-decode when input changes
  useEffect(() => {
    if (input.trim()) {
      handleDecode();
    } else {
      setDecodedData(null);
      setError('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  // Decode JWT
  const handleDecode = () => {
    setError('');
    setDecodedData(null);
    setCopySuccess('');

    const result = decodeJWT(input);
    if (result.success) {
      setDecodedData(result.result);
    } else {
      setError(result.error);
    }
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

  // Clear all
  const handleClear = () => {
    setInput('');
    setDecodedData(null);
    setError('');
    setCopySuccess('');
  };

  // Load sample
  const handleLoadSample = () => {
    setInput(generateSampleJWT());
  };

  // Get expiration info
  const expirationInfo = decodedData?.payload ? checkExpiration(decodedData.payload) : null;
  const algorithmInfo = decodedData?.header?.alg ? getAlgorithmInfo(decodedData.header.alg) : null;

  return (
    <ToolLayout
      toolId="jwt-decoder"
      title="JWT Decoder"
      description="Decode JWT tokens to view header and payload without verifying the signature. Perfect for debugging and inspecting JWTs."
      toolDetails={metadata.toolDetails}
    >
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleClear} className="btn-secondary">
            🗑️ Clear
          </button>
          <button onClick={handleLoadSample} className="btn-secondary">
            📄 Load Sample JWT
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Input Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            JWT Token
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
            className="textarea-field font-mono text-sm"
            rows={6}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            JWT tokens have three parts separated by dots: header.payload.signature
          </p>
        </div>

        {/* Decoded Output */}
        {decodedData && (
          <div className="space-y-6">
            {/* Algorithm & Expiration Info Bar */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex flex-wrap gap-4 text-sm">
                {algorithmInfo && (
                  <div>
                    <span className="font-semibold text-blue-900 dark:text-blue-100">Algorithm:</span>{' '}
                    <span className="text-blue-800 dark:text-blue-200">
                      {decodedData.header.alg} ({algorithmInfo.name} - {algorithmInfo.type})
                    </span>
                  </div>
                )}
                {expirationInfo && (
                  <div className={expirationInfo.expired ? 'text-red-800 dark:text-red-200' : 'text-green-800 dark:text-green-200'}>
                    <span className="font-semibold">
                      {expirationInfo.expired ? '⚠️ Expired:' : '✓ Valid:'}
                    </span>{' '}
                    {expirationInfo.message}
                  </div>
                )}
              </div>
            </div>

            {/* Header Section */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  📋 Header
                </h3>
                <button
                  onClick={() => handleCopy(prettyPrintJSON(decodedData.header), 'header')}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  {copySuccess === 'header' ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200">
                {prettyPrintJSON(decodedData.header)}
              </pre>
            </div>

            {/* Payload Section */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  📦 Payload
                </h3>
                <button
                  onClick={() => handleCopy(prettyPrintJSON(decodedData.payload), 'payload')}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  {copySuccess === 'payload' ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-200">
                {prettyPrintJSON(decodedData.payload)}
              </pre>
            </div>

            {/* Signature Section */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  🔐 Signature
                </h3>
                <button
                  onClick={() => handleCopy(decodedData.signature, 'signature')}
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                >
                  {copySuccess === 'signature' ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <p className="text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
                  {decodedData.signature}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  ⚠️ Signature verification is not performed. This is the raw signature string.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Tips:</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• JWT tokens consist of three Base64URL-encoded parts: <strong>header.payload.signature</strong></li>
            <li>• The <strong>header</strong> contains the algorithm and token type</li>
            <li>• The <strong>payload</strong> contains claims (user data, expiration, etc.)</li>
            <li>• This tool decodes but does <strong>not verify</strong> the signature</li>
            <li>• All decoding happens in your browser - tokens are never sent to a server</li>
          </ul>
        </div>

        {/* JWT Structure Explanation */}
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">📚 JWT Structure:</h3>
          <div className="space-y-2 text-sm">
            <div className="font-mono text-gray-800 dark:text-gray-200">
              <span className="text-red-600 dark:text-red-400">eyJhbGci...</span>
              <span className="text-gray-500">.</span>
              <span className="text-purple-600 dark:text-purple-400">eyJzdWIi...</span>
              <span className="text-gray-500">.</span>
              <span className="text-blue-600 dark:text-blue-400">SflKxwRJ...</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                <div className="font-semibold text-red-800 dark:text-red-200">Header</div>
                <div className="text-xs text-red-700 dark:text-red-300 mt-1">
                  Algorithm & token type
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-200 dark:border-purple-800">
                <div className="font-semibold text-purple-800 dark:text-purple-200">Payload</div>
                <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                  Claims & user data
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                <div className="font-semibold text-blue-800 dark:text-blue-200">Signature</div>
                <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Verification hash
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Claims Reference */}
        {decodedData && (
          <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">🔍 Common JWT Claims:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">iss</span>
                <span className="text-gray-600 dark:text-gray-400"> - Issuer</span>
              </div>
              <div>
                <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">sub</span>
                <span className="text-gray-600 dark:text-gray-400"> - Subject (user ID)</span>
              </div>
              <div>
                <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">aud</span>
                <span className="text-gray-600 dark:text-gray-400"> - Audience</span>
              </div>
              <div>
                <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">exp</span>
                <span className="text-gray-600 dark:text-gray-400"> - Expiration time</span>
              </div>
              <div>
                <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">nbf</span>
                <span className="text-gray-600 dark:text-gray-400"> - Not before time</span>
              </div>
              <div>
                <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">iat</span>
                <span className="text-gray-600 dark:text-gray-400"> - Issued at time</span>
              </div>
              <div>
                <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">jti</span>
                <span className="text-gray-600 dark:text-gray-400"> - JWT ID</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 🔍 SEO CONTENT — MUST BE AFTER TOOL UI */}
      <section className="mt-20 max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl font-bold mb-4">
          What is a JWT (JSON Web Token)?
        </h2>

        <p className="mb-4">
          JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained
          way for securely transmitting information between parties as a JSON object. JWTs are commonly
          used for authentication and authorization in web applications and APIs.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          JWT Structure
        </h3>

        <p className="mb-4">
          A JWT consists of three parts separated by dots (header.payload.signature):
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li><strong>Header</strong>: Contains metadata about the token, including the algorithm used for signing</li>
          <li><strong>Payload</strong>: Contains the claims (statements about the user and additional data)</li>
          <li><strong>Signature</strong>: Used to verify that the sender of the JWT is who it says it is</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          Why Decode JWTs?
        </h3>

        <p className="mb-4">
          Developers often need to decode JWTs to inspect the token contents during development,
          debugging, or troubleshooting. This tool allows you to view the header and payload
          without verifying the signature, making it perfect for understanding what data is stored
          in your tokens.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Is It Safe to Use This Tool?
        </h3>

        <p className="mb-4">
          Yes! All JWT decoding happens entirely in your browser. Your tokens are never sent to
          any server or stored anywhere. This tool simply decodes the Base64URL-encoded parts
          of the JWT to show you the JSON data inside.
        </p>

        <h3 className="text-xl font-semibold mb-2">
          Who Should Use This Tool?
        </h3>

        <p>
          This tool is ideal for backend developers, frontend engineers, API developers, DevOps
          engineers, security professionals, and anyone working with JWT-based authentication
          systems. It's perfect for debugging authentication issues, inspecting token claims,
          and understanding JWT structure.
        </p>
      </section>
    </ToolLayout>
  );
};

export default JwtDecoder;
