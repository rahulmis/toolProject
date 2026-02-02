/**
 * Text Case Converter - Metadata
 * 
 * This file contains all the metadata for the Text Case Converter tool.
 * It's imported by the tools registry for routing, navigation, and SEO.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const TextCaseConverterComponent = lazy(() => import('./TextCaseConverter'));

const metadata = {
  // Core identifiers
  id: 'text-case-converter',
  slug: 'text-case-converter', // Used in URL: /text-case-converter
  
  // Display information
  name: 'Text Case Converter',
  description: 'Convert text between uppercase, lowercase, camelCase, snake_case, kebab-case, and more. Instant conversion with copy-to-clipboard.',
  longDescription: 'A free online text case converter that instantly transforms text between different casing formats including uppercase, lowercase, title case, sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, and more. Perfect for developers, writers, and anyone needing quick text formatting. All processing happens in your browser for maximum privacy.',
  
  // Organization
  category: 'Developer Tools',
  icon: '🔤',
  tags: ['text', 'case', 'converter', 'uppercase', 'lowercase', 'camelcase', 'snake case', 'kebab case', 'developer', 'formatting'],
  
  // Component (lazy loaded)
  component: TextCaseConverterComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free Text Case Converter | Convert to camelCase, snake_case, kebab-case',
    description: 'Convert text between uppercase, lowercase, title case, camelCase, snake_case, kebab-case and more online. Free text case converter with instant results and copy to clipboard.',
    keywords: ['text case converter', 'camelcase converter', 'snake case converter', 'kebab case converter', 'uppercase converter', 'lowercase converter', 'title case converter'],
    ogTitle: 'Text Case Converter - Convert Text to Any Case Format',
    ogDescription: 'Instantly convert text between different case formats with our free online tool. Privacy-focused with in-browser processing.',
    ogImage: '/og-images/text-case-converter.png',
  },

  faqs: [
    {
      question: 'What is a text case converter?',
      answer:
        'A text case converter is a tool that transforms text between different casing formats like uppercase, lowercase, camelCase, snake_case, kebab-case, and more. It\'s commonly used by developers for variable naming conventions.',
    },
    {
      question: 'What case formats are supported?',
      answer:
        'This tool supports UPPER CASE, lower case, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, path/case, and InVeRt CaSe.',
    },
    {
      question: 'Is this tool free to use?',
      answer:
        'Yes, this text case converter is completely free and can be used without any registration or limitations.',
    },
    {
      question: 'Is my text data safe?',
      answer:
        'Yes. All text conversion happens directly in your browser. Your text is never uploaded to any server or stored anywhere.',
    },
    {
      question: 'When should I use camelCase vs snake_case?',
      answer:
        'camelCase is commonly used in JavaScript, Java, and C# for variable names. snake_case is popular in Python, Ruby, and database column names. kebab-case is often used for URLs and CSS classes.',
    },
  ],
  
  // Analytics (future)
  analytics: {
    category: 'developer-tools',
    action: 'use-text-case-converter',
  },
  
  // Related tools (future feature)
  relatedTools: ['url-encode-decode', 'json-formatter', 'base64-encode-decode'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false, // Pure frontend tool
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This Text Case Converter is a free online tool designed for developers, writers, and anyone needing quick text formatting. It instantly converts text between different casing formats including uppercase, lowercase, title case, camelCase, snake_case, kebab-case, and many more. Perfect for adhering to coding conventions, formatting content, or preparing text for different contexts.',
    
    howToUse: [
      'Paste or type your text into the input field',
      'Click on any case format button to convert instantly',
      'The converted text appears in the output field',
      'Use "Copy to Clipboard" to quickly copy the result',
      'Click "Clear" to reset and start fresh',
      'Click "Load Sample" to see an example conversion'
    ],
    
    features: [
      'Instant conversion to 12 different case formats',
      'UPPER CASE - all letters uppercase',
      'lower case - all letters lowercase',
      'Title Case - first letter of each word capitalized',
      'Sentence case - first letter of first word capitalized',
      'camelCase - first word lowercase, rest capitalized, no spaces',
      'PascalCase - all words capitalized, no spaces',
      'snake_case - lowercase with underscores',
      'kebab-case - lowercase with hyphens',
      'CONSTANT_CASE - uppercase with underscores',
      'dot.case - lowercase with dots',
      'path/case - lowercase with slashes',
      'InVeRt CaSe - uppercase becomes lowercase and vice versa',
      'Copy to clipboard functionality',
      'Character, word, and line counter',
      'Sample text for testing',
      'Works offline once loaded'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All text conversion happens directly in your browser using JavaScript. Your text is never uploaded to any server, stored in any database, or transmitted over the network. You can even use this tool offline once the page has loaded.'
    }
  },
};

export default metadata;
