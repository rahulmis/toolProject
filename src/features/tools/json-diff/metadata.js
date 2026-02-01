/**
 * JSON Diff Checker - Metadata
 * 
 * This file contains all the metadata for the JSON Diff Checker tool.
 * It's imported by the tools registry for routing, navigation, and SEO.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const JsonDiffCheckerComponent = lazy(() => import('./JsonDiffChecker'));

const metadata = {
  // Core identifiers
  id: 'json-diff-checker',
  slug: 'json-diff-checker', // Used in URL: /json-diff-checker
  
  // Display information
  name: 'JSON Diff Checker',
  description: 'Compare two JSON objects and find differences with detailed highlighting and analysis.',
  longDescription: 'A powerful JSON comparison tool that helps developers identify differences between two JSON objects. Visualize added, removed, and modified properties with color-coded output. Perfect for API development, configuration management, and code reviews.',
  
  // Organization
  category: 'Developer Tools',
  icon: '🔍',
  tags: ['json', 'diff', 'compare', 'difference', 'json compare', 'json diff', 'developer', 'api'],
  
  // Component (lazy loaded)
  component: JsonDiffCheckerComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free JSON Diff Checker | Compare JSON Online',
    description: 'Compare two JSON objects and find differences instantly. Free JSON diff tool with color-coded output, detailed statistics, and in-browser processing for maximum privacy.',
    keywords: ['json diff', 'json compare', 'json difference', 'json comparison tool', 'compare json online', 'json diff checker', 'json diff tool'],
    ogTitle: 'JSON Diff Checker - Compare JSON Objects Online',
    ogDescription: 'Free online tool to compare and find differences between two JSON objects. Secure, private, and works entirely in your browser.',
    ogImage: '/og-images/json-diff-checker.png',
  },

  faqs: [
    {
      question: 'What is a JSON Diff Checker?',
      answer: 'A JSON Diff Checker is a tool that compares two JSON objects and highlights their differences, showing what was added, removed, or modified between them.'
    },
    {
      question: 'Is this JSON Diff Checker free to use?',
      answer: 'Yes, this JSON diff tool is completely free and can be used without any registration or limitations.'
    },
    {
      question: 'Is my JSON data safe?',
      answer: 'Absolutely. All JSON processing happens directly in your browser. Your data is never uploaded to any server, ensuring complete privacy and security.'
    },
    {
      question: 'What types of differences can it detect?',
      answer: 'The tool detects added properties, removed properties, modified values, and type changes. It works with nested objects and arrays as well.'
    },
    {
      question: 'Can I compare large JSON files?',
      answer: 'Yes, but performance may vary based on your browser and the complexity of the JSON. For extremely large files, consider splitting them into smaller chunks.'
    },
    {
      question: 'What view modes are available?',
      answer: 'The tool offers both unified view (all differences in one panel) and split view (original vs modified side by side).'
    }
  ],
  
  // Analytics
  analytics: {
    category: 'developer-tools',
    action: 'use-json-diff-checker',
  },
  
  // Related tools
  relatedTools: ['json-formatter', 'json-to-yaml', 'json-validator'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false,
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This JSON Diff Checker is a powerful online tool designed to compare two JSON objects and identify all differences between them. It provides clear visual feedback on what changed, including added properties, removed properties, modified values, and structural changes. The tool is essential for developers working with APIs, configuration files, or any JSON-based data.',
    
    howToUse: [
      'Paste your original JSON in the first input field',
      'Paste the modified JSON in the second input field',
      'Click "Compare JSON" to analyze the differences',
      'Choose between "Unified View" (single panel) or "Split View" (side-by-side)',
      'Review the color-coded differences in the output panel',
      'Use the statistics panel to see counts of added, removed, and modified properties',
      'Click "Swap JSONs" to reverse the comparison direction',
      'Use "Copy Diff" to copy the comparison results to clipboard'
    ],
    
    features: [
      'Deep comparison of nested JSON structures',
      'Color-coded output for easy readability',
      'Detailed statistics on differences',
      'Support for both unified and split view modes',
      'Built-in JSON validation',
      'Real-time character counting',
      'Sample data for quick testing',
      'Swap functionality for bidirectional comparison',
      'Works with arrays and complex nested objects',
      'No file size limits (browser-dependent)'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All JSON processing happens directly in your browser using JavaScript. Your JSON data is never transmitted over the network, stored on servers, or logged in any way. This ensures complete data privacy and security.'
    }
  },
};

export default metadata;