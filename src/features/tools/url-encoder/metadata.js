/**
 * URL Encoder / Decoder - Metadata
 * 
 * This file contains all the metadata for the URL Encoder/Decoder tool.
 * It's imported by the tools registry for routing, navigation, and SEO.
 */

import { lazy } from 'react';

// Lazy load the component for code splitting
const UrlEncoderComponent = lazy(() => import('./UrlEncoder'));

const metadata = {
  // Core identifiers
  id: 'url-encode-decode',
  slug: 'url-encode-decode', // Used in URL: /url-encode-decode
  
  // Display information
  name: 'URL Encode / Decode',
  description: 'Encode and decode URLs and query parameters safely. Perfect for handling special characters in URLs.',
  longDescription: 'A free online URL encoder and decoder tool that helps you encode plain text to URL-safe format or decode URL-encoded strings back to readable text. Essential for working with URLs, query parameters, and API endpoints. Handles special characters, spaces, and non-ASCII characters properly. All processing happens in your browser for maximum privacy.',
  
  // Organization
  category: 'Developer Tools',
  icon: '🔗',
  tags: ['url', 'encode', 'decode', 'uri', 'query string', 'parameters', 'developer', 'web'],
  
  // Component (lazy loaded)
  component: UrlEncoderComponent,
  
  // Features
  featured: true,
  premium: false,
  
  // SEO metadata
  seo: {
    title: 'Free URL Encode / Decode | Online URL Encoder Tool',
    description: 'Encode and decode URLs and query parameters online. Free URL encoder/decoder with special character handling and copy to clipboard. All processing happens in your browser.',
    keywords: ['url encoder', 'url decoder', 'urlencode', 'urldecode', 'query string encoder', 'encode url online', 'decode url online'],
    ogTitle: 'URL Encode / Decode - Free Online Tool',
    ogDescription: 'Encode and decode URLs with our free online tool. Privacy-focused with in-browser processing.',
    ogImage: '/og-images/url-encoder.png',
  },

  faqs: [
    {
      question: 'What is URL encoding?',
      answer:
        'URL encoding (also called percent-encoding) converts characters into a format that can be safely transmitted over the internet. Special characters are replaced with % followed by two hexadecimal digits.',
    },
    {
      question: 'When should I use URL encoding?',
      answer:
        'Use URL encoding when you need to include special characters in URLs, query parameters, or form data. Common examples include spaces, ampersands, question marks, and non-ASCII characters.',
    },
    {
      question: 'Is this URL Encoder free to use?',
      answer:
        'Yes, this URL encoder/decoder is completely free and can be used without any registration or limitations.',
    },
    {
      question: 'Is my data safe?',
      answer:
        'Yes. All URL encoding and decoding happens directly in your browser. Your data is never uploaded to any server.',
    },
    {
      question: 'What\'s the difference between encodeURI and encodeURIComponent?',
      answer:
        'encodeURIComponent encodes more characters (including /, ?, =, &) and is best for query parameters. encodeURI preserves these characters and is best for full URLs. This tool uses encodeURIComponent by default.',
    },
  ],
  
  // Analytics (future)
  analytics: {
    category: 'developer-tools',
    action: 'use-url-encoder',
  },
  
  // Related tools (future feature)
  relatedTools: ['base64-encode-decode', 'json-formatter', 'timestamp-converter'],
  
  // Tool-specific settings
  settings: {
    hasBackend: false, // Pure frontend tool
    browserOnly: true,
    offlineCapable: true,
  },
  
  // Tool Details for "About This Tool" section
  toolDetails: {
    what: 'This URL Encode / Decode tool is a free online utility designed for developers and anyone working with URLs, query parameters, and web APIs. It helps you encode plain text into URL-safe format (replacing special characters with percent-encoded values) or decode URL-encoded strings back to readable text. Perfect for handling spaces, special characters, and non-ASCII characters in URLs.',
    
    howToUse: [
      'Paste or type your text or URL-encoded string into the input field',
      'Click "Encode" to convert plain text to URL-encoded format',
      'Click "Decode" to convert URL-encoded text back to readable format',
      'Use "Copy to Clipboard" to quickly copy the result',
      'Click "Clear" to reset and start fresh',
      'Click "Load Sample" to see an example with special characters'
    ],
    
    features: [
      'Instant URL encoding and decoding',
      'Handles special characters (spaces, &, ?, =, etc.)',
      'Supports non-ASCII characters (accented letters, emojis)',
      'Character, byte, and line counter',
      'Copy to clipboard functionality',
      'Sample text with special characters for testing',
      'Visual feedback for URL-encoded text detection',
      'Works offline once loaded',
      'No character limits'
    ],
    
    privacy: {
      browserBased: true,
      note: 'All URL encoding and decoding happens directly in your browser using JavaScript native functions (encodeURIComponent/decodeURIComponent). Your data is never uploaded to any server, stored in any database, or transmitted over the network. You can even use this tool offline once the page has loaded.'
    }
  },
};

export default metadata;
