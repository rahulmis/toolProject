/**
 * Text Formatter / Cleaner - Metadata
 * 
 * This file contains all the metadata for the Text Formatter / Cleaner tool.
 * It's imported by the tools registry for routing, navigation, and SEO.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const TextCleanerComponent = lazy(() => import('./TextCleaner'));

const metadata = {
  // Core identifiers
  id: 'text-cleaner',
  slug: 'text-cleaner', // Used in URL: /text-cleaner
  
  // Display information
  name: 'Text Formatter / Cleaner',
  description: 'Clean and format text by removing extra spaces, empty lines, and normalizing whitespace instantly.',
  longDescription: 'A free online text formatter and cleaner that helps you clean up messy text by removing extra spaces, empty lines, trailing whitespace, and normalizing line breaks. Perfect for cleaning copied text, preparing content for publishing, or formatting code snippets. All processing happens in your browser for maximum privacy.',
  
  // Organization
  category: 'Text Tools',
  icon: '🧹',
  tags: ['text cleaner', 'text formatter', 'remove spaces', 'remove empty lines', 'text cleanup', 'whitespace', 'formatting'],
  
  // Component (lazy loaded)
  component: TextCleanerComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free Text Formatter & Cleaner | Remove Extra Spaces & Empty Lines',
    description: 'Clean and format text online by removing extra spaces, empty lines, and normalizing whitespace. Free text cleaner with instant results and copy to clipboard.',
    keywords: ['text cleaner', 'text formatter', 'remove extra spaces', 'remove empty lines', 'clean text online', 'whitespace remover', 'text cleanup'],
    ogTitle: 'Text Formatter & Cleaner - Clean Text Online',
    ogDescription: 'Remove extra spaces, empty lines, and clean up text with our free online tool. Privacy-focused with in-browser processing.',
    ogImage: '/og-images/text-cleaner.png',
  },

  faqs: [
    {
      question: 'What does a text cleaner do?',
      answer:
        'A text cleaner removes unwanted formatting issues like extra spaces, empty lines, and trailing whitespace. It helps make text clean and consistent, perfect for content that\'s been copied from various sources.',
    },
    {
      question: 'How do I remove extra spaces from text?',
      answer:
        'Click the "Remove Extra Spaces" button to replace multiple consecutive spaces with a single space. This cleans up text while preserving line breaks.',
    },
    {
      question: 'What is the "Clean All" option?',
      answer:
        'The "Clean All" button applies all cleaning operations at once: normalizes line breaks, trims lines, removes extra spaces, and removes empty lines. It\'s the quickest way to clean messy text.',
    },
    {
      question: 'Is my text data safe?',
      answer:
        'Yes. All text cleaning happens directly in your browser. Your text is never uploaded to any server or stored anywhere.',
    },
    {
      question: 'Can I use this to clean code?',
      answer:
        'Yes! This tool is great for cleaning up code snippets, especially when copying from PDFs or websites that add extra formatting.',
    },
  ],
  
  // Analytics (future)
  analytics: {
    category: 'text-tools',
    action: 'use-text-cleaner',
  },
  
  // Related tools (future feature)
  relatedTools: ['word-counter', 'text-case-converter', 'base64-encode-decode'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false, // Pure frontend tool
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This Text Formatter / Cleaner is a free online tool designed to clean up messy text quickly and efficiently. It removes extra spaces, empty lines, trailing whitespace, and normalizes line breaks. Perfect for cleaning text copied from PDFs, websites, or documents, preparing content for publishing, or formatting code snippets. Each cleaning operation is modular, allowing you to apply specific cleanings as needed.',
    
    howToUse: [
      'Paste or type your messy text into the input field',
      'Click any cleaning button to apply that specific operation',
      'Or click "Clean All" to apply all cleanings at once',
      'View the cleaned result in the output field',
      'Use "Copy to Clipboard" to copy the cleaned text',
      'Click "Clear" to reset and start fresh',
      'Click "Load Sample" to see an example with formatting issues'
    ],
    
    features: [
      'Remove extra spaces - replace multiple spaces with single space',
      'Remove empty lines - delete blank lines from text',
      'Trim lines - remove leading and trailing whitespace from each line',
      'Normalize line breaks - convert all line breaks to Unix format',
      'Remove line breaks - convert text to single line',
      'Remove all whitespace - strip all spaces, tabs, and line breaks',
      'Normalize whitespace - comprehensive cleaning (trim + extra spaces + empty lines)',
      'Remove duplicate lines - keep only unique lines',
      'Sort lines - alphabetically ascending or descending',
      'Add line numbers - prefix each line with number',
      'Remove line numbers - strip line numbers from text',
      'Clean All - apply all basic cleanings at once',
      'Copy to clipboard functionality',
      'Before/after statistics',
      'Sample text for testing',
      'Works offline once loaded'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All text cleaning happens directly in your browser using JavaScript. Your text is never uploaded to any server, stored in any database, or transmitted over the network. You can even use this tool offline once the page has loaded.'
    }
  },
};

export default metadata;
