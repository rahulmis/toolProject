/**
 * JSON Formatter & Validator - Metadata
 * 
 * This file contains all the metadata for the JSON Formatter tool.
 * It's imported by the tools registry for routing, navigation, and SEO.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const JsonFormatterComponent = lazy(() => import('./JsonFormatter'));

const metadata = {
  // Core identifiers
  id: 'json-formatter',
  slug: 'json-formatter', // Used in URL: /json-formatter
  
  // Display information
  name: 'JSON Formatter & Validator',
  description: 'Format, beautify, minify and validate JSON with syntax highlighting and error detection.',
  longDescription: 'A powerful JSON formatting and validation tool that helps developers beautify minified JSON, validate JSON syntax, and minify large JSON files. All processing happens in your browser for maximum privacy and security.',
  
  // Organization
  category: 'Developer Tools',
  icon: '{ }',
  tags: ['json', 'format', 'validate', 'beautify', 'minify', 'developer', 'javascript'],
  
  // Component (lazy loaded)
  component: JsonFormatterComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free JSON Formatter & Validator | Online JSON Tool',
    metaDescription: 'Format, beautify, minify and validate JSON online. Free JSON formatter with syntax highlighting, error detection, and copy to clipboard. All processing happens in your browser.',
    keywords: ['json formatter', 'json validator', 'json beautifier', 'json minifier', 'json online', 'format json', 'validate json'],
    ogTitle: 'JSON Formatter & Validator - Free Online Tool',
    ogDescription: 'Format, beautify, and validate JSON online with our free tool. Privacy-focused with in-browser processing.',
    ogImage: '/og-images/json-formatter.png', // Future: add OG images
  },
  
  // Analytics (future)
  analytics: {
    category: 'developer-tools',
    action: 'use-json-formatter',
  },
  
  // Related tools (future feature)
  relatedTools: ['base64-encoder', 'url-encoder', 'xml-formatter'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false, // Pure frontend tool
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This JSON Formatter & Validator is a free online tool designed for developers and anyone working with JSON data. It helps you beautify messy or minified JSON code, validate JSON syntax for errors, and minify large JSON files to reduce size. Perfect for debugging API responses, cleaning up configuration files, or preparing JSON data for production.',
    
    howToUse: [
      'Paste or type your JSON code into the input field',
      'Click "Format / Beautify" to format and indent the JSON with proper spacing',
      'Click "Minify" to compress the JSON into a single line (reduces file size)',
      'Click "Validate" to check for syntax errors in your JSON',
      'Use "Copy to Clipboard" to quickly copy the formatted result',
      'Click "Clear" to reset and start with a new JSON document'
    ],
    
    features: [
      'Instant JSON formatting with customizable indentation',
      'Real-time syntax validation with error highlighting',
      'One-click minification for compact JSON',
      'Character and line counter',
      'Copy to clipboard functionality',
      'Sample JSON data for testing',
      'Works offline once loaded',
      'No file size limits'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All JSON processing happens directly in your browser using JavaScript. Your data is never uploaded to any server, stored in any database, or transmitted over the network. You can even use this tool offline once the page has loaded.'
    }
  },
};

export default metadata;
