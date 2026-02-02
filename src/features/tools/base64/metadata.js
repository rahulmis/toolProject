/**
 * Base64 Encode / Decode - Metadata
 * 
 * This file contains all the metadata for the Base64 tool.
 * It's imported by the tools registry for routing, navigation, and SEO.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const Base64ToolComponent = lazy(() => import('./Base64Tool'));

const metadata = {
  // Core identifiers
  id: 'base64-encode-decode',
  slug: 'base64-encode-decode', // Used in URL: /base64-encode-decode
  
  // Display information
  name: 'Base64 Encode / Decode',
  description: 'Encode text to Base64 or decode Base64 to text. UTF-8 safe with copy-to-clipboard support.',
  longDescription: 'A free online Base64 encoder and decoder tool that helps you encode text to Base64 or decode Base64 strings back to text. Handles UTF-8 characters properly and includes error detection. All processing happens in your browser for maximum privacy and security.',
  
  // Organization
  category: 'Developer Tools',
  icon: '🔐',
  tags: ['base64', 'encode', 'decode', 'converter', 'developer', 'encryption', 'utf-8'],
  
  // Component (lazy loaded)
  component: Base64ToolComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free Base64 Encode / Decode | Online Base64 Tool',
    description: 'Encode text to Base64 or decode Base64 to text online. Free Base64 converter with UTF-8 support, error detection, and copy to clipboard. All processing happens in your browser.',
    keywords: ['base64 encoder', 'base64 decoder', 'base64 converter', 'base64 online', 'encode base64', 'decode base64', 'base64 tool'],
    ogTitle: 'Base64 Encode / Decode - Free Online Tool',
    ogDescription: 'Encode and decode Base64 strings online with our free tool. Privacy-focused with in-browser processing.',
    ogImage: '/og-images/base64-tool.png',
  },

  faqs: [
    {
      question: 'What is Base64 encoding?',
      answer:
        'Base64 encoding is a way to convert binary data or text into ASCII characters. It\'s commonly used to encode data in URLs, emails, and web APIs.',
    },
    {
      question: 'Is this Base64 tool free to use?',
      answer:
        'Yes, this Base64 encoder/decoder is completely free and can be used without any registration or limitations.',
    },
    {
      question: 'Is my data safe?',
      answer:
        'Yes. All Base64 encoding and decoding happens directly in your browser. Your data is never uploaded to any server.',
    },
    {
      question: 'Does this tool support UTF-8 characters?',
      answer:
        'Yes, the tool properly handles UTF-8 characters including emojis, accented letters, and non-Latin scripts.',
    },
    {
      question: 'What happens if I try to decode invalid Base64?',
      answer:
        'The tool will show a user-friendly error message if the Base64 string is invalid or cannot be decoded.',
    },
  ],
  
  // Analytics (future)
  analytics: {
    category: 'developer-tools',
    action: 'use-base64-tool',
  },
  
  // Related tools (future feature)
  relatedTools: ['json-formatter', 'url-encoder', 'hash-generator'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false, // Pure frontend tool
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This Base64 Encode / Decode tool is a free online utility designed for developers and anyone who needs to convert text to Base64 or decode Base64 strings back to readable text. Perfect for encoding data for URLs, APIs, or web applications, and for debugging Base64-encoded content.',
    
    howToUse: [
      'Paste or type your text or Base64 string into the input field',
      'Click "Encode to Base64" to convert plain text into Base64 format',
      'Click "Decode from Base64" to convert Base64 back to readable text',
      'Use "Copy to Clipboard" to quickly copy the result',
      'Click "Clear" to reset and start fresh',
      'Click "Load Sample" to see an example with UTF-8 characters'
    ],
    
    features: [
      'Instant Base64 encoding and decoding',
      'Proper UTF-8 character handling (emojis, accented letters, etc.)',
      'Real-time error detection for invalid Base64',
      'Character, byte, and line counter',
      'Copy to clipboard functionality',
      'Sample text with UTF-8 characters for testing',
      'Works offline once loaded',
      'No character limits'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All Base64 encoding and decoding happens directly in your browser using JavaScript. Your data is never uploaded to any server, stored in any database, or transmitted over the network. You can even use this tool offline once the page has loaded.'
    }
  },
};

export default metadata;
